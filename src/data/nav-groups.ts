// De navigatiegroepen (kopjes in de topnav). Los bestand, want zowel de
// contentcollectie (src/content/config.ts, voor validatie van `nav.group`) als
// de navigatie zelf (src/data/navigation.ts) leunt erop — via één gedeeld
// bestand blijven die twee uit elkaars import-cirkel.
//
// De volgorde hieronder is de volgorde van de kopjes in de topnav.
// Een artikel kiest zijn kopje met `nav.group` in de frontmatter; een waarde
// die hier niet in staat, laat de build falen.

// TODO: definitieve indeling. Nu afgeleid van de secties op de live site
// (ontwikkelen van matrassen, koudschuim, traagschuim, kennis van zaken, over mij).
// Een groep zonder pagina's verschijnt niet in het menu.
export const NAV_GROUP_TITLES = [
  'Over mij',
  'Ontwerpen',
  'Kennis',
  'Projecten',
] as const;

export type NavGroupTitle = (typeof NAV_GROUP_TITLES)[number];
