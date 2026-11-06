// Sitenavigatie — opgebouwd uit de content zelf.
//
// Een artikel bepaalt zijn eigen plek met een `nav`-blok in de frontmatter:
//
//   nav:
//     group: "Kennis"        # kopje in de topnav (zie src/data/nav-groups.ts)
//     label: "Wat is traagschuim?"
//     sub: "Het materiaal en zijn eigenschappen."
//     order: 10              # volgorde binnen de groep, stappen van 10
//
// Geen `nav`-blok = niet in de navigatie. De groepen en hun volgorde staan in
// src/data/nav-groups.ts; pagina's die geen artikel zijn (eigen .astro-routes)
// staan in STATIC_ITEMS hieronder.

import { getCollection } from 'astro:content';
import { NAV_GROUP_TITLES, type NavGroupTitle } from './nav-groups';
import { HEEFT_ARTIKELEN } from '../lib/content';

export interface NavItem {
  label: string;
  href: string;
  /** Korte contextregel onder het label in de topnav-dropdown (mega-menu). */
  sub?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

/**
 * Pagina's buiten de artikelencollectie (eigen .astro-routes) die wél in de nav
 * horen. Artikelen regelen hun plek zelf via het `nav`-blok in de frontmatter.
 */
const STATIC_ITEMS: Array<NavItem & { group: NavGroupTitle; order: number }> = [];

/**
 * Bouwt de navigatiegroepen uit de artikelen + STATIC_ITEMS.
 * Astro cachet getCollection, dus dit is goedkoop genoeg om per pagina te doen.
 */
export async function getNavGroups(): Promise<NavGroup[]> {
  const artikelen = HEEFT_ARTIKELEN
    ? await getCollection('artikelen', ({ data }) => !data.draft && !!data.nav)
    : [];

  const entries = [
    ...artikelen.map((entry) => ({
      group: entry.data.nav!.group,
      // Zonder `order` sluit een artikel alfabetisch achteraan aan.
      order: entry.data.nav!.order ?? Number.MAX_SAFE_INTEGER,
      label: entry.data.nav!.label,
      href: `/${entry.slug}`,
      sub: entry.data.nav!.sub,
    })),
    ...STATIC_ITEMS,
  ];

  return NAV_GROUP_TITLES.map((title) => ({
    title,
    items: entries
      .filter((e) => e.group === title)
      .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label, 'nl'))
      .map(({ label, href, sub }) => ({ label, href, sub })),
  })).filter((group) => group.items.length > 0);
}

/**
 * Vind de navigatiegroep + item voor een gegeven pad (voor breadcrumbs en active-state).
 *
 * Matcht ook onderliggende pagina's: /projecten/iets markeert het item
 * /projecten als actief. De vergelijking gaat op `href + '/'`, zodat /projecten
 * niet toevallig ook /projecten-iets-anders opeist.
 */
export async function findNavLocation(
  pathname: string,
): Promise<{ group: NavGroup; item: NavItem } | null> {
  const path = pathname.replace(/\/$/, '') || '/';
  for (const group of await getNavGroups()) {
    const item = group.items.find((i) => i.href === path || path.startsWith(`${i.href}/`));
    if (item) return { group, item };
  }
  return null;
}
