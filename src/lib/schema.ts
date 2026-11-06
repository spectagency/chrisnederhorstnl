// Centrale opbouw van de JSON-LD. Alle pagina's zenden één `@graph` uit in
// plaats van losse blokken: zo bestaat elke entiteit (site, auteur)
// precies één keer en verwijzen de pagina-nodes ernaar met een `@id`. Zoekmachines
// en taalmodellen zien daardoor één samenhangende entiteit in plaats van tientallen
// losse, identiek genaamde kopieën.
//
// De `@id`-waarden hieronder zijn stabiele, permanente sleutels. Wijzig ze niet
// zonder reden: een gewijzigde `@id` leest als een nieuwe, andere entiteit.

import type { ImageMetadata } from 'astro';
import { SITE } from '../data/site';

export type LdNode = Record<string, unknown>;

/**
 * Pad → absolute URL, zónder sluitende slash.
 *
 * De site hanteert één canonieke URL-vorm: zonder sluitende slash. Elke interne
 * link, de canonical, de sitemap en de `@id`'s hieronder gebruiken die vorm, en
 * `vercel.json` stuurt de variant mét slash er met een 308 naartoe.
 *
 * Normaliseren is hier geen detail. Astro bouwt `directory`-URL's
 * (`/pagina/index.html`), dus `Astro.url.pathname` eindigt op een
 * slash terwijl een handmatig opgebouwd pad (`/${slug}`) dat niet doet. Zonder
 * normalisatie leveren die twee verschillende `@id`'s op voor dezelfde pagina en
 * wijst `mainEntityOfPage` naar een node die niet bestaat — een stille breuk die
 * nergens een foutmelding geeft.
 */
export const abs = (path: string): string => {
  const url = new URL(path, SITE.url);
  // De homepage houdt zijn enkele slash; al het andere verliest de sluitende slash.
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.replace(/\/+$/, '');
  }
  return url.href;
};

/** De site-brede entiteiten. Fragment-`@id`'s op de homepage-URL. */
export const ID = {
  website: `${SITE.url}/#website`,
  author: `${SITE.url}/#chris-nederhorst`,
} as const;

/** Per-pagina `@id`'s, afgeleid van de canonieke URL van die pagina. */
export const pageId = (path: string): string => `${abs(path)}#webpage`;
export const breadcrumbId = (path: string): string => `${abs(path)}#breadcrumb`;
export const articleId = (path: string): string => `${abs(path)}#article`;

/** Verwijzing naar een bestaande node, i.p.v. hem te herhalen. */
export const ref = (id: string): LdNode => ({ '@id': id });

/**
 * ImageObject uit een Astro-asset. `width`/`height` komen uit de
 * beeldpipeline, dus ze kloppen altijd met het daadwerkelijke bestand.
 */
export const imageNode = (img: ImageMetadata, caption?: string): LdNode => ({
  '@type': 'ImageObject',
  url: abs(img.src),
  contentUrl: abs(img.src),
  width: img.width,
  height: img.height,
  ...(caption ? { caption } : {}),
});

/** Minuten → ISO-8601-duur, de vorm die schema.org voor `timeRequired` wil. */
export const isoDuration = (minutes: number): string => `PT${Math.max(1, Math.round(minutes))}M`;

// ─── Site-brede entiteiten ────────────────────────────────────────────────────

const websiteNode: LdNode = {
  '@type': 'WebSite',
  '@id': ID.website,
  url: `${SITE.url}/`,
  name: SITE.name,
  alternateName: SITE.domain,
  description: SITE.description,
  inLanguage: SITE.lang,
  // Persoonlijke site: de uitgever is Chris zelf, geen aparte organisatie.
  publisher: ref(ID.author),
  copyrightHolder: ref(ID.author),
};

/**
 * De auteur als volledige Person-node.
 *
 * Geëxporteerd omdat de auteurspagina hem niet met een `@id`-verwijzing kan
 * afdoen: die pagina is een ProfilePage, en Google eist dat `mainEntity` daar een
 * uitgeschreven Person of Organization mét `name` is. Een kale `{"@id": …}` levert
 * er de fout "Invalid object type for field '<parent_node>'" op — de reden dat
 * de auteurspagina van koudschuim.info die melding in Search Console gaf.
 *
 * Dat de node dan twee keer in de graph staat (hier én als `mainEntity`) is geen
 * dubbeling: beide dragen hetzelfde `@id`, dus ze worden tot één entiteit
 * samengevoegd.
 */
export const authorNode: LdNode = {
  '@type': 'Person',
  '@id': ID.author,
  name: SITE.author.name,
  jobTitle: SITE.author.jobTitle,
  description: SITE.author.description,
  url: abs(SITE.author.path),
  knowsAbout: SITE.knowsAbout,
  worksFor: {
    '@type': 'Organization',
    name: SITE.author.company,
    url: SITE.author.companyUrl,
  },
  // Alleen profielen van Chris zelf. De sites en het bedrijf horen hier niet:
  // `sameAs` betekent "dezelfde entiteit", en een website is niet de persoon.
  ...(SITE.author.sameAs.length > 0 ? { sameAs: SITE.author.sameAs } : {}),
};

/** De entiteiten die op élke pagina in de graph horen. */
export const SITE_NODES: LdNode[] = [websiteNode, authorNode];

// ─── Pagina-nodes ─────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * BreadcrumbList. De laatste crumb (de huidige pagina) krijgt geen `item`; dat is
 * toegestaan en eerlijker dan naar een niet-bestaande route wijzen. Elke crumb
 * daarvóór móet een `href` hebben — zie de controle hieronder.
 */
export const breadcrumbNode = (path: string, items: BreadcrumbItem[]): LdNode => {
  // Alleen de láátste kruimel mag zonder `item`; daar valt Google terug op de URL
  // van de pagina zelf. Een tussenkruimel zonder `item` levert de fout
  // "Missing field 'item' (in 'itemListElement')" op — een fout die pas weken
  // later in Search Console zichtbaar wordt en nergens in de build opvalt.
  // Vandaar hier een harde build-fout in plaats van stil verkeerde markup.
  const dangling = items.slice(0, -1).find((c) => !c.href);
  if (dangling) {
    throw new Error(
      `Kruimelpad van ${path}: de kruimel "${dangling.label}" heeft geen href. ` +
        'Alleen de laatste kruimel mag er een missen — geef hem een href of laat hem weg.',
    );
  }

  return {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId(path),
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: abs(c.href) } : {}),
    })),
  };
};

/** Sluit de graph af met de `@context`. Falsy nodes vallen weg. */
export const graph = (nodes: (LdNode | null | undefined | false)[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes.filter(Boolean),
});
