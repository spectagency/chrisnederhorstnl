import { defineCollection, z } from 'astro:content';
import { NAV_GROUP_TITLES } from '../data/nav-groups';
import { loopbaan } from '../data/loopbaan';

/**
 * Een frontmatterveld met leesbare tekst, in plaats van een kale z.string(): vult
 * de loopbaan-plaatshouders in, zoals `{{jarenBeddenvak}}` in een `description`.
 * De body gaat via de remark-plugin in astro.config.mjs; waarom frontmatter hier
 * apart moet, staat bij `frontmatter` in src/lib/loopbaan.ts.
 */
const tekst = (veld: string) => z.string().transform(loopbaan.frontmatter(veld));

const artikelen = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: tekst('title'),
      // Kortere variant voor de <title> in de browsertab en de zoekresultaten.
      // De volledige `title` blijft de <h1>, de kruimel en de `headline` in de
      // JSON-LD; dit is puur de titeltag. Zonder `shortTitle` valt de pagina
      // terug op `title`. Zie de lengtewaarschuwing in src/lib/content.ts.
      shortTitle: tekst('shortTitle').optional(),
      description: tekst('description'),
      lead: tekst('lead').optional(), // intro-paragraaf in de pagehead (anders valt het terug op description)
      // Deelbeeld: `Article.image` in de JSON-LD en `og:image` bij delen. Wordt
      // niet in de pagina zelf getoond — het artikel bepaalt zijn eigen beeld in
      // de body. Pad relatief aan dit .md-bestand; de image()-helper valideert
      // dat het bestaat en levert breedte/hoogte aan het schema.
      // Google wil voor Article-rich-results minimaal 1200px breed.
      image: image().optional(),
      related: z.array(z.string()).optional(), // slugs van gerelateerde artikelen (max 3)
      // Inhoudsopgave in de linkerkolom. Standaard aan, en ArticleLayout zet hem
      // sowieso pas neer vanaf twee H2-koppen. Op `false` blijft de linkerkolom
      // leeg en valt de pagina terug op de enkelkoloms leeskolom van 780px.
      // Bedoeld voor pagina's die je van voor naar achter leest in plaats van
      // erin springt, zoals een over-mij-pagina.
      toc: z.boolean().default(true),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      // Plek in de sitenavigatie. Laat `nav` weg en het artikel blijft buiten de
      // navigatie: het is dan alleen bereikbaar via links, zoek en de sitemap.
      nav: z
        .object({
          group: z.enum(NAV_GROUP_TITLES), // kopje in de topnav (zie src/data/nav-groups.ts)
          label: tekst('nav.label'), // korte linktekst — de titel is meestal te lang
          sub: tekst('nav.sub'), // contextregel onder het label in de dropdown
          // Volgorde binnen de groep. Stappen van 10, zodat je er later een artikel
          // tussen kunt schuiven zonder de rest te hernummeren. Zonder `order`
          // sluit het artikel alfabetisch achteraan aan.
          order: z.number().optional(),
        })
        .optional(),
    }),
});

// Secties van de homepage. De homepage is (nog) een one-pager zoals de oude
// chrisnederhorst.nl: elke sectie is één markdownbestand, in de volgorde van
// `order`. De bestandsnaam is het anker (#koudschuim-informatie). Wat geen lopende
// tekst is (het ontwerpenraster, de merken, het contactblok) hangt index.astro
// er per sectie als component onder of boven; zie SECTIE_EXTRA daar.
//
// Bewust een losse collectie en geen artikelen: zo wordt een sectie geen eigen
// URL. Moet een sectie later een eigen pagina worden, dan verhuist het bestand
// naar artikelen/ en krijgt het daar een `nav`-blok.
const secties = defineCollection({
  type: 'content',
  // Beelden staan gewoon in de markdown-body, op de plek waar ze op de live
  // site staan.
  schema: z.object({
    title: tekst('title'), // de <h2> boven de sectie
    navLabel: tekst('navLabel'), // korte linktekst in de zijbalk, zoals op de live site
    order: z.number(),
  }),
});

export const collections = { artikelen, secties };
