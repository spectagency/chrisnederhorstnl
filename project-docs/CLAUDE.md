# CLAUDE.md: chrisnederhorst.nl

Hoofdinstructie voor de nieuwe chrisnederhorst.nl. Lees dit voordat je begint.

## Project

De persoonlijke website van Chris Nederhorst, matrasontwikkelaar en -expert en
oprichter van Royal Health Foam. Nederlandstalig, statisch, SEO-gevoelig.

De site vervangt de oude one-pager op www.chrisnederhorst.nl. De tekst van die
oude site staat in [`BRON-LIVE-SITE.md`](BRON-LIVE-SITE.md): bronmateriaal om de
nieuwe pagina's uit te schrijven, geen content om letterlijk over te nemen.

- **Domein:** www.chrisnederhorst.nl (het kale domein stuurt door naar www)
- **Taal:** Nederlands, u-vorm
- **Persoon:** Chris Nederhorst, in het beddenvak sinds 1988, oprichter van Royal
  Health Foam (1998, Scheveningen)
- **Royal Health Foam mag hier gewoon genoemd worden.** Dit is een persoonlijke
  site, geen onafhankelijke kennissite. Dat is het grootste verschil met
  koudschuim.info, waar de merknaam juist bewust buiten de zichtbare tekst blijft.
  Neem de "geen merknaam"- en "geen advies-CTA"-regels van koudschuim.info hier
  dus niet over.

## Herkomst

De code komt uit koudschuim.info (repo `spectagency/koudschuiminfo`) en is op
6 november 2026 opgeschoond tot dit startpunt. Opmaak en techniek zijn bewust
gelijk gehouden: zie [`HERGEBRUIK.md`](HERGEBRUIK.md) voor hoe de opzet werkt.
Weggehaald, want niet nodig voor een persoonlijke site: alle koudschuimcontent, de
FAQ-collectie, de encyclopedie, de oude redirects en de uil als logo. Moet een
van die onderdelen terugkomen, haal hem dan uit die repo.

## Stack

| Onderdeel | Keuze |
|---|---|
| Framework | Astro 4.x, static output |
| Content | Markdown in `src/content/artikelen/` (één bestand = één pagina op `/<slug>`) |
| Styling | Alles in `src/styles/global.css`; huisstijl alleen in blok 1 (`:root`) |
| Hosting | Vercel (nog aan te maken, zie Openstaand) |
| Taal | TypeScript |

## Huisstijl

Afgeleid van de oude chrisnederhorst.nl, in de opzet van koudschuim.info:

- Accent blauw `#4077af` (oude site: `#4077AF` / `#75A0CC`)
- Donkere voettekst `#25232a → #1a1a1d` (oude zijbalk)
- Lettertype Source Sans 3 (opvolger van het Source Sans Pro van de oude site)
- Merkteken: het ronde portret (`src/components/layout/Mark.astro`), zoals bovenin
  de oude zijbalk. Geen los logo.

## Regels die blijven gelden

- Geen `<style>`-blokken of `style=`-attributen; alle CSS in `global.css`.
- Geen kleur of lettertype buiten het `:root`-blok.
- Ervaringsjaren nooit met de hand: gebruik `{{jarenBeddenvak}}`,
  `{{startBeddenvak}}`, `{{jarenProducent}}` en `{{startProducent}}` in markdown
  en `LOOPBAAN.…` in code (zie `src/data/loopbaan.ts`).
- Canonieke URL's zonder sluitende slash.

## Openstaand

Gemarkeerd met `TODO` in de code (`grep -rn TODO src`). De belangrijkste:

- [ ] Informatiearchitectuur: welke pagina's, en de navigatiegroepen in
      `src/data/nav-groups.ts` (nu een voorzet op basis van de oude secties)
- [ ] Homepage (`src/pages/index.astro`) en `over-mij.md` uitschrijven
- [ ] E-mailadres en "online sinds"-jaar bevestigen in `src/data/site.ts`
- [ ] Beter portret: het huidige is 120 px, te klein voor groter gebruik
- [ ] Favicons en `public/og-default.jpg` zijn tijdelijk (initialen/naam op blauw)
- [ ] Nieuwe GitHub-repo, Vercel-project en domeinkoppeling
- [ ] Redirects van de oude URL's (de oude site is een one-pager met #-ankers;
      controleer of er losse pagina's of afbeeldingen zijn die gelinkt worden)
- [ ] Plausible: site aanmaken en script-URL invullen in `Analytics.astro`
- [ ] Deploy Hook + secret `VERCEL_DEPLOY_HOOK` voor de jaarlijkse rebuild
