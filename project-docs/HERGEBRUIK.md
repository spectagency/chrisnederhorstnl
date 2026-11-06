# HERGEBRUIK.md — deze opmaak gebruiken voor een andere site

> **Let op:** dit document is geschreven voor koudschuim.info, waar deze code
> vandaan komt. Het beschrijft de opzet nog steeds correct, maar noemt hier en daar
> onderdelen die in chrisnederhorst.nl zijn weggehaald: de uil (`owl.png`,
> `Owl.astro`, `--logo-bg`; hier vervangen door `Mark.astro`), de FAQ en de
> encyclopedie. Zie [`CLAUDE.md`](CLAUDE.md).

Dit project is opgezet om te kopiëren. Opmaak en inhoud raken elkaar nergens: de
volledige vormgeving zit in één stylesheet, alle sitespecifieke tekst in `src/data/`
en `src/content/`. Een nieuwe site opzetten is daarom vooral *weggooien en opnieuw
vullen*, niet *uitpluizen wat waar zit*.

---

## Waar de opmaak zit

| Wat | Waar |
|---|---|
| **Alle CSS** — tokens, componenten, paginaspecifieke regels, responsief gedrag | `src/styles/global.css` |
| Paginaskelet, `<head>`, schema.org | `src/layouts/` |
| Header, footer, mobiele lade, inhoudsopgave, kruimelpad | `src/components/layout/` |
| Herbruikbare blokken (knop, badge, hero, stappen, verwante artikelen) | `src/components/` |

Er staat **geen** CSS in `<style>`-blokken van componenten of pagina's, en geen
`style=`-attributen in de markup. `tailwind.config.mjs` bevat geen eigen waarden —
die verwijst met `var(--…)` naar het `:root`-blok in `global.css`.

Dat is bewust: één plek om te lezen, en één plek om te wijzigen. Zodra een kleur op
twee plekken staat, lopen ze een keer uit elkaar, en dat merk je pas als de helft van
de site al verkeerd is.

---

## Een nieuwe site opzetten

```bash
git clone <deze-repo> nieuwe-site && cd nieuwe-site
rm -rf .git .vercel dist .astro && git init
npm install
```

### 1. Huisstijl — alleen blok 1 van `global.css`

Bovenin `src/styles/global.css` staat één `:root`-blok met álles wat per site
verschilt: lettertypen, kleuren, het logoverloop, het voettekstpalet, containerbreedtes
en rondingen. Pas dat blok aan en de hele site volgt.

Twee dingen die *bij* dat blok horen maar er technisch buiten vallen:

- De `@import`-regel voor Google Fonts, direct erboven. Wijzig die samen met `--disp`
  en `--sans`, anders laadt de site een lettertype dat hij niet gebruikt.
- De vier breekpunten (1200 / 1000 / 920 / 520 px). Media queries kunnen geen custom
  property lezen, dus die getallen staan als losse waarden in blok 14. Ze staan in een
  tabel bovenaan het bestand genoemd.

### 2. Merk en inhoud

| Vervangen | Bestand |
|---|---|
| Naam, domein, auteur, e-mail, zustersites | `src/data/site.ts` |
| Footerkolommen | `src/data/site.ts` (`FOOTER_COLUMNS`) |
| Hoofdnavigatie (topnav + mobiele lade) | `src/data/navigation.ts`, `src/data/nav-groups.ts` |
| FAQ-categorieën | `src/data/faq-categories.ts` |
| Logo | `src/assets/brand/owl.png` + `--logo-bg` in `global.css` |
| Favicons | `public/` |
| Deelbeeld voor sociale media | `public/og-default.jpg` (1200×630) |
| Artikelen, FAQ's, encyclopedie | `src/content/` (leegmaken) |
| Beeld | `src/assets/` (leegmaken) |
| Redirects en headers | `vercel.json` (leegmaken — dit zijn de oude PHP-URL's) |
| Ervaringsjaren van de auteur ("sinds 1988", "38 jaar") | `src/data/loopbaan.ts` — zie [Ervaringsjaren](#ervaringsjaren) |

De wordmark "Koudschuim<span>.info</span>" staat als tekst in `Header.astro`,
`MobileNav.astro` en `Footer.astro`. Drie plekken, bewust: het is markup, geen data.

**Over `public/og-default.jpg`.** Dat is het beeld dat WhatsApp, LinkedIn en Facebook
tonen bij een gedeelde link. `BaseLayout.astro` zet het op élke pagina als `og:image`,
behalve waar een pagina zelf een `image`-prop meegeeft. Zonder dat bestand valt de
sociale kaart terug op een kale tekstregel, dus vervang het — laat het niet weg.

Twee dingen om aan te houden. Het moet **1200×630** zijn: dat is de verhouding waar de
platforms op uitsnijden, en een afwijkende maat leveren ze willekeurig bijgesneden af.
En het staat in `public/` in plaats van in `src/assets/`, zodat de URL tussen builds
gelijk blijft — een gehashte `/_astro/`-naam verandert zodra het bestand verandert, en
dan staat er bij elk eerder gedeeld bericht een dood beeld.

Bijsnijden uit een bestaand beeld gaat met `sharp`, dat al als Astro-afhankelijkheid
meekomt:

```bash
node -e "require('sharp')('src/assets/pad/naar/bron.jpg')
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og-default.jpg')"
```

Doe dit niet via `getImage()` in de layout: Astro 4 kent geen `fit`-optie en behoudt
de beeldverhouding, dus je krijgt stil een andere hoogte terug dan je vroeg.

### 3. Ongemoeid laten

`src/layouts/`, `src/components/`, `src/lib/`, `astro.config.mjs`. Die zijn
sitegeneriek. In `astro.config.mjs` zitten twee rehype-plugins die je wilt houden: één
wikkelt brede tabellen in een eigen scrollcontainer, één zet de letterkoppen in de
encyclopedie. Daarnaast één remark-plugin die de ervaringsjaren invult; die leest
zijn gegevens uit `src/data/loopbaan.ts` en hoeft zelf niet aangepast. `src/lib/schema.ts` bouwt de schema.org-graph op basis van `site.ts` en
loopt dus vanzelf mee.

---

## Ervaringsjaren

De site noemt de auteur op meerdere plekken met een startjaar en een aantal jaren
ervaring: in de byline onder elk artikel, op de homepage, in de JSON-LD, in
artikelteksten en meta-descriptions. Die getallen staan nergens met de hand. Ze
worden bij elke build uitgerekend uit een paar ankerdata, en in de teksten staat een
plaatshouder.

### Hoe het werkt

| Wat | Waar |
|---|---|
| **Ankers** — wanneer iets begon (jaar + maand). Het enige sitespecifieke deel. | `src/data/loopbaan.ts` |
| Rekenwerk, plaatshouders, remark-plugin, vangnet | `src/lib/loopbaan.ts` |
| Invullen in de markdown-body | `astro.config.mjs` → `remarkPlugins` |
| Invullen in frontmatter (`description`, `lead`, `nav.sub`, …) | `src/content/config.ts` → `tekst()` |
| Gebruik in code | `LOOPBAAN.jarenBeddenvak` in bijv. `src/data/site.ts` |
| Jaarlijkse rebuild zodat het getal ook zonder push doortelt | `.github/workflows/jaarlijkse-rebuild.yml` |

Elk anker levert twee plaatshouders. Een anker met de naam `beddenvak` geeft:

| In markdown/frontmatter | In TypeScript | Waarde |
|---|---|---|
| `{{startBeddenvak}}` | `LOOPBAAN.startBeddenvak` | het jaartal, bijv. 1988 |
| `{{jarenBeddenvak}}` | `LOOPBAAN.jarenBeddenvak` | volle jaren sindsdien, bijv. 38 |

"Volle jaren" betekent: het getal telt pas door in de maand van het anker. Begon iets
in april 1988, dan staat er in maart 2027 nog 38 en vanaf 1 april 39. Er wordt nooit
een jaar geclaimd dat nog niet vol is. Gerekend wordt in UTC, net als Vercel.

Drie dingen bewaken dit tijdens de build:

- **Typefout in een plaatshouder** (`{{jarenBedenvak}}`) → de build stopt, met een
  lijst van geldige namen. Anders zou de plaatshouder letterlijk op de pagina staan.
- **Typefout in code** (`LOOPBAAN.jarenBedenvak`) → TypeScript-fout.
- **Handgeschreven getal** → waarschuwing. Staat er ergens letterlijk "38 jaar" of
  "sinds 1988" terwijl dat precies een berekende waarde is, dan meldt de build het
  bestand en de plaatshouder die er had moeten staan. Een jaartal in een verhaal
  ("in april 1988 nam ik de zaak over") wordt met rust gelaten; alleen "sinds" en
  "vanaf" gelden als claim.

### Op een site die uit deze repo gekloond is

Alles komt al mee. Wat je doet:

1. **Ankers invullen** in `src/data/loopbaan.ts`. Namen alleen letters, beginnend met
   een kleine letter. Maak zoveel ankers als de teksten nodig hebben — voor een site
   die ook "20 jaar traagschuim" noemt bijvoorbeeld:

   ```ts
   export const loopbaan = maakLoopbaan({
     beddenvak: { jaar: 1988, maand: 4 },
     producent: { jaar: 1998, maand: 4 },
     traagschuim: { jaar: 2003, maand: 9 }, // → {{jarenTraagschuim}}, {{startTraagschuim}}
   });
   ```

   Heeft de site geen ervaringsjaren nodig, laat dan `maakLoopbaan({})` staan in plaats
   van de koppelingen weg te halen.

2. **Teksten omzetten.** Draai `npm run build`: het vangnet noemt elk bestand waar nog
   een handgeschreven getal staat. Vervang dat door de plaatshouder. Let op dat het
   vangnet alleen getallen kent die *vandaag* uitkomen — een oude, al verouderde "35
   jaar" herkent hij niet. Zoek daar eenmalig zelf op:

   ```bash
   grep -rnE "\b[0-9]{2} jaar\b|(sinds|vanaf) (19|20)[0-9]{2}" src/
   ```

3. **`src/data/site.ts` nalopen.** `byline.ervaring` en `author.description` gebruiken
   `LOOPBAAN.…`. Heet een anker anders dan `beddenvak`/`producent`, dan wijst
   TypeScript precies aan waar het niet meer klopt.

4. **Rebuild instellen.** Zet de maand in de cron van
   `.github/workflows/jaarlijkse-rebuild.yml` gelijk aan die van de ankers. Maak
   daarna eenmalig een Deploy Hook in Vercel (Settings → Git → Deploy Hooks, branch
   `main`) en zet die URL als GitHub-secret `VERCEL_DEPLOY_HOOK`. Test met *Run
   workflow* in het Actions-tabblad.

### Op een bestaande Astro-site die niet uit deze repo komt

Nodig: Astro met content collections, TypeScript 5 of hoger. `src/lib/loopbaan.ts`
heeft geen afhankelijkheden.

1. Kopieer `src/lib/loopbaan.ts` en `src/data/loopbaan.ts` (vul de ankers in) en
   `.github/workflows/jaarlijkse-rebuild.yml`.
2. `astro.config.mjs`:

   ```js
   import { loopbaan } from './src/data/loopbaan.ts';
   // …
   markdown: { remarkPlugins: [loopbaan.remarkPlugin] },
   ```

   Staan er al `remarkPlugins`, voeg hem dan aan die lijst toe.
3. `src/content/config.ts`: vervang `z.string()` door `tekst('veldnaam')` bij elk
   frontmatterveld met leesbare tekst:

   ```ts
   import { loopbaan } from '../data/loopbaan';
   const tekst = (veld: string) => z.string().transform(loopbaan.frontmatter(veld));
   // …
   description: tekst('description'),
   ```

   Een veld dat je overslaat, krijgt zijn plaatshouder niet ingevuld en toont die
   letterlijk. Neem ze dus allemaal mee, ook `title` en navigatielabels.
4. Tekst die in `.astro`-bestanden of `.ts`-data staat, gaat niet door markdown of het
   schema. Gebruik daar `LOOPBAAN.jarenBeddenvak` rechtstreeks.
5. Verder als hierboven: stap 2 t/m 4.

---

## Als de nieuwe site geen Astro wordt

Neem dan alleen `src/styles/global.css` mee. Het bestand is framework-onafhankelijk op
de drie `@tailwind`-regels na. De klassenamen zijn semantisch (`.shell`, `.wrap`,
`.side`, `.prose`, `.pagehead`), dus je bouwt de markup na in je eigen stack en de
opmaak klopt.

Eén afhankelijkheid om te kennen: de stylesheet rekent op **Tailwind's preflight** als
reset. Zonder die reset ziet lopende tekst er anders uit — het duidelijkst bij lijsten
(preflight zet `list-style: none`, blok 10 zet het weer aan) en bij formulierelementen
(preflight geeft die `font-family: inherit`, waar de knoppen in de navigatie op leunen).
Laat je Tailwind weg, neem dan een andere moderne reset en controleer die twee punten.

De ervaringsjaren zijn ook mee te nemen: `src/lib/loopbaan.ts` is gewoon TypeScript.
`maakLoopbaan()` en `vulJaren()` werken overal. `remarkPlugin` werkt in elke
remark-pijplijn, bijvoorbeeld Next.js met MDX. Gebruikt de stack geen remark (zoals
Eleventy met markdown-it), haal de tekst dan zelf door `loopbaan.vulJaren()` voordat
hij gerenderd wordt.

---

## Onderhoudsregels

Waarom dit zo strak staat, zodat het niet ongemerkt weer uitwaaiert:

1. **Geen `<style>`-blok in een component of pagina.** Ook niet "heel even" — dat is
   precies hoe de vorige verspreiding ontstond. Nieuwe regels gaan in de sectie van
   `global.css` waar ze horen; paginaspecifieke uitzonderingen in blok 13.
2. **Geen kleur of lettertype buiten het `:root`-blok.** Staat er een waarde niet
   tussen? Voeg dan eerst een token toe.
3. **Geen waarden in `tailwind.config.mjs`.** Alleen `var(--…)`-verwijzingen.
4. **Blok 13 blijft achteraan.** Die regels winnen van de generieke regels dankzij hun
   plek in het bestand; naar voren halen breekt ze stil.
5. **Sticky-offsets rekenen met `--topbar`.** Verandert de balkhoogte, dan schuiven de
   ankers mee. Zet er geen los getal neer.
