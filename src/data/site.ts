// Site-brede constanten. Bron: project-docs/CLAUDE.md.
//
// Dit is de persoonlijke site van Chris Nederhorst. Anders dan op de
// kennissites (koudschuim.info, matras.info) hoort Royal Health Foam hier
// gewoon in de zichtbare tekst: het is zijn bedrijf en een wezenlijk deel van
// zijn verhaal.

import { LOOPBAAN } from './loopbaan';

export const SITE = {
  name: 'Chris Nederhorst',
  domain: 'chrisnederhorst.nl',
  url: 'https://www.chrisnederhorst.nl',
  title: 'Chris Nederhorst',
  titleSuffix: ' | Chris Nederhorst',
  // TODO: definitieve tekst. Nu de strekking van de live site.
  description: `Chris Nederhorst, matrasontwikkelaar en -expert. Sinds ${LOOPBAAN.startBeddenvak} actief in het beddenvak en oprichter van Royal Health Foam.`,
  lang: 'nl',
  // TODO: bevestigen sinds wanneer chrisnederhorst.nl online is (voor © en JSON-LD).
  since: 2015,
  // TODO: bevestigen welk adres hier hoort.
  email: 'info@chrisnederhorst.nl',
  // Sites van Chris en zijn bedrijf, zoals de live site ze linkt. Bedoeld voor
  // footer en over-mij. Bewust níet in `Person.sameAs` in de JSON-LD: dat
  // betekent "dezelfde entiteit", en een website of bedrijf is niet de persoon.
  zustersites: [
    'https://www.koudschuim.info',
    'https://www.matras.info',
    'https://www.traagschuim.info',
    'https://www.healthfoam.com',
  ] as readonly string[],
  // Onderwerpsautoriteit: waar deze site en de persoon over gaan.
  knowsAbout: [
    'Matrassen',
    'Matrasontwikkeling',
    'Koudschuim',
    'Traagschuim',
    'Slaapergonomie',
    'Drukverlaging',
    'Decubituspreventie',
  ],
  author: {
    name: 'Chris Nederhorst',
    role: 'Matrasontwikkelaar en -expert',
    jobTitle: 'Matrasontwikkelaar',
    company: 'Royal Health Foam',
    companyUrl: 'https://www.healthfoam.com',
    // TODO: pad van de over-mij-pagina zodra die er is. Byline en JSON-LD
    // linken hiernaartoe; zolang de pagina niet bestaat, is dat een dode link.
    path: '/over-mij',
    // Auteursregel onder elk artikel (src/components/content/Byline.astro), in
    // twee delen: de homepage toont alleen `ervaring`, omdat `role` daar al als
    // aparte regel boven het portret staat.
    byline: {
      vak: 'Matrasontwikkelaar en oprichter van Royal Health Foam.',
      // De getallen komen uit loopbaan.ts en tellen zichzelf door.
      ervaring: `${LOOPBAAN.jarenBeddenvak} jaar ervaring in het beddenvak, waarvan ${LOOPBAAN.jarenProducent} jaar als matrasproducent.`,
    },
    // Gaat als `Person.description` de JSON-LD in (src/lib/schema.ts).
    description: `Houdt zich sinds ${LOOPBAAN.startBeddenvak} bezig met matrassen, slaapcomfort, ergonomie en drukverlaging. Ontwikkelde het eerste ventilerende traagschuimmatras van Nederland en richtte in ${LOOPBAAN.startProducent} Royal Health Foam op.`,
    // Profielen elders. LinkedIn komt uit de JSON-LD van de live site.
    sameAs: ['https://www.linkedin.com/in/chris-nederhorst-4171038/'] as readonly string[],
  },
} as const;

// Footerkolommen. TODO: vullen zodra de pagina's er zijn.
export const FOOTER_COLUMNS = [
  {
    title: 'Over',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Disclaimer', href: '/disclaimer' },
      { label: 'Sitemap', href: '/sitemap-overzicht' },
    ],
  },
] as const;
