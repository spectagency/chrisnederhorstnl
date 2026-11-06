// Ervaringsjaren die zichzelf doortellen — het generieke deel.
//
// Een site noemt de auteur graag met "38 jaar ervaring". Zo'n handgeschreven
// getal veroudert ongemerkt, en staat na een paar jaar op vijf plekken verschillend.
// Dit bestand maakt van een paar ankerdata ("begonnen in april 1988") de getallen
// die in de teksten horen, en vult ze in waar een plaatshouder staat.
//
// Hier staat niets sitespecifieks. De ankers zelf staan in src/data/loopbaan.ts;
// dat is het enige bestand dat je voor een andere site aanpast. Zie
// project-docs/HERGEBRUIK.md.
//
// Wat een anker oplevert: een anker `beddenvak` geeft de plaatshouders
// `{{startBeddenvak}}` (het jaartal) en `{{jarenBeddenvak}}` (de volle jaren
// sindsdien). Die namen worden afgeleid, niet los opgesomd, zodat een nieuw anker
// er nooit maar half in zit.

export interface Anker {
  jaar: number;
  /** Kalendermaand 1–12. Zie volleJaren(). */
  maand: number;
}

/** `beddenvak` → `Beddenvak`, voor de namen van de plaatshouders. */
type Namen<A> = keyof A & string;

/**
 * De ingevulde waarden, getypeerd op de ankers. `LOOPBAAN.jarenBeddenvak` is
 * daardoor een bekende sleutel in plaats van een willekeurige string: een
 * typefout in site.ts vangt de compiler, niet de bezoeker.
 */
export type LoopbaanWaarden<A> = {
  readonly [K in Namen<A> as `start${Capitalize<K>}`]: number;
} & {
  readonly [K in Namen<A> as `jaren${Capitalize<K>}`]: number;
};

/**
 * Volle jaren sinds een anker — dus pas optellen ná de verjaarmaand.
 *
 * Wie in april 1988 begon, heeft in januari 2027 nog geen 39 volle jaren; er
 * staat dan 38, en vanaf april 39. Een site die op nauwkeurigheid leunt, hoort
 * geen jaar te claimen dat nog loopt. Dat het getal daarmee een paar maanden per
 * jaar een jaar "achterloopt" op de simpele aftreksom is de bedoeling.
 *
 * De berekening gebeurt op buildtijd. De site is statisch, dus het getal in de
 * HTML is het getal van de laatste build — zie
 * .github/workflows/jaarlijkse-rebuild.yml.
 *
 * In UTC, niet in lokale tijd. Vercel bouwt in UTC; een build op een laptop in
 * Nederland zou anders in de nacht van 31 maart al een jaar verder zijn dan de
 * build die live gaat.
 */
export function volleJaren({ jaar, maand }: Anker, nu: Date = new Date()): number {
  const verjaard = nu.getUTCMonth() + 1 >= maand;
  return nu.getUTCFullYear() - jaar - (verjaard ? 0 : 1);
}

const PLAATSHOUDER = /\{\{\s*([A-Za-z]+)\s*\}\}/g;
const ANKERNAAM = /^[a-z][A-Za-z]*$/;

/** Het minimum van een mdast-knoop dat de remark-plugin nodig heeft. */
interface Knoop {
  type: string;
  value?: unknown;
  children?: Knoop[];
}

/**
 * Bouwt de loopbaan voor één site. Roep dit één keer aan, in src/data/loopbaan.ts,
 * en importeer het resultaat overal waar het nodig is.
 *
 * `nu` bestaat alleen om de berekening te kunnen testen op een andere datum.
 */
export function maakLoopbaan<const A extends Record<string, Anker>>(
  ankers: A,
  nu: Date = new Date(),
) {
  // Een fout anker is een fout in de configuratie, niet in de content. Die hoort
  // de build meteen te stoppen, met een melding die zegt wát er mis is.
  for (const [naam, { jaar, maand }] of Object.entries(ankers)) {
    if (!ANKERNAAM.test(naam)) {
      throw new Error(
        `Loopbaan: ankernaam "${naam}" mag alleen letters bevatten en begint met een kleine letter.`,
      );
    }
    if (!Number.isInteger(maand) || maand < 1 || maand > 12) {
      throw new Error(`Loopbaan: anker "${naam}" heeft maand ${maand}; dat moet 1 t/m 12 zijn.`);
    }
    if (!Number.isInteger(jaar) || jaar > nu.getUTCFullYear()) {
      throw new Error(`Loopbaan: anker "${naam}" heeft jaar ${jaar}; dat ligt in de toekomst.`);
    }
  }

  const waarden: Record<string, number> = {};
  // Vangnet. Wat hier berekend wordt, hoort nergens met de hand geschreven te
  // staan — anders staat er over een jaar weer een getal dat niemand meer bijwerkt.
  //
  // De patronen komen uit de berekende waarden zelf, dus ze verouderen mee: is
  // `jarenProducent` 28, dan is een letterlijke "28 jaar" in een tekst vrijwel
  // zeker een gemiste plaatshouder. Andere getallen met "jaar" erachter ("10 jaar
  // garantie") botsen hier niet mee, zolang ze niet toevallig gelijk zijn aan een
  // van de ervaringsjaren.
  //
  // Bij jaartallen wordt alleen op "sinds"/"vanaf" gelet. Dat is het verschil
  // tussen een claim en een verhaal: "sinds 1988" hoort een plaatshouder te zijn,
  // "in april 1988 nam ik de zaak over" is gewoon een zin over het verleden.
  const verdacht: { regexp: RegExp; hint: string }[] = [];

  for (const [naam, anker] of Object.entries(ankers)) {
    const Naam = naam[0].toUpperCase() + naam.slice(1);
    const jaren = volleJaren(anker, nu);
    waarden[`start${Naam}`] = anker.jaar;
    waarden[`jaren${Naam}`] = jaren;
    verdacht.push(
      { regexp: new RegExp(`\\b${jaren} jaar\\b`), hint: `{{jaren${Naam}}} jaar` },
      {
        regexp: new RegExp(`\\b(?:sinds|vanaf)\\s+${anker.jaar}\\b`, 'i'),
        hint: `sinds {{start${Naam}}}`,
      },
    );
  }

  /**
   * Vervangt `{{jarenBeddenvak}}` en de andere plaatshouders door hun waarde.
   *
   * Een onbekende naam is een harde fout en geen stille doorlaat: een typefout als
   * `{{jarenBedenvak}}` zou anders letterlijk op de pagina belanden, en dat merk je
   * pas als iemand het ziet staan.
   */
  function vulJaren(tekst: string): string {
    return tekst.replace(PLAATSHOUDER, (_, naam: string) => {
      if (!(naam in waarden)) {
        throw new Error(
          `Onbekende plaatshouder {{${naam}}} in de content. Beschikbaar: ` +
            Object.keys(waarden)
              .map((k) => `{{${k}}}`)
              .join(', '),
        );
      }
      return String(waarden[naam]);
    });
  }

  /**
   * Waarschuwt tijdens de build over een getal dat een plaatshouder had moeten
   * zijn. Bewust een waarschuwing en geen fout: een vergeten plaatshouder levert
   * vandaag nog de juiste tekst op en hoort een deploy niet tegen te houden — hij
   * verrot alleen stilletjes.
   *
   * Er wordt gekeken naar de tekst zoals hij geschreven is, met de plaatshouders
   * eruit geknipt. Anders zou de uitkomst van vulJaren() zichzelf aangeven.
   */
  function meldHandgeschrevenJaren(tekst: string, bron: string): void {
    const geschreven = tekst.replace(PLAATSHOUDER, '');
    for (const { regexp, hint } of verdacht) {
      const treffer = geschreven.match(regexp);
      if (treffer) {
        console.warn(
          `\nLoopbaan: "${treffer[0]}" staat met de hand geschreven in ${bron}.\n` +
            `  Schrijf "${hint}", dan telt het vanzelf door. Zie src/data/loopbaan.ts.\n`,
        );
      }
    }
  }

  /**
   * Voor een frontmatterveld in src/content/config.ts:
   * `z.string().transform(loopbaan.frontmatter('description'))`.
   *
   * De body van een .md komt langs de remark-plugin hieronder, maar frontmatter
   * niet — die heeft Astro er dan al uitgehaald. Daarom gebeurt het voor
   * frontmatter op schemaniveau: daar passeert elk veld precies één keer, wie het
   * daarna ook leest (layouts, JSON-LD, navigatie). Een lengtecontrole op
   * `description` meet zo de ingevulde tekst, en dat is ook de tekst die in de
   * zoekresultaten staat.
   *
   * `veld` staat alleen in de waarschuwing. Zod geeft een transform geen
   * bestandsnaam mee, dus er gaat een stukje van de tekst zelf mee om hem in de
   * content terug te kunnen vinden.
   */
  const frontmatter =
    (veld: string) =>
    (waarde: string): string => {
      meldHandgeschrevenJaren(waarde, `frontmatter ${veld}: "${waarde.slice(0, 60)}…"`);
      return vulJaren(waarde);
    };

  /**
   * Remark-plugin voor de body van elk markdownbestand. In astro.config.mjs:
   * `markdown: { remarkPlugins: [loopbaan.remarkPlugin] }`.
   *
   * Remark en geen rehype: op dit niveau bestaat de tekst nog als
   * mdast-tekstknopen, gescheiden van `code` en `inlineCode`. Een plaatshouder in
   * een codevoorbeeld blijft daardoor vanzelf staan zoals hij geschreven is.
   */
  const remarkPlugin =
    () =>
    (tree: Knoop, file: { path?: string; history?: string[] }): void => {
      const bron = (file.history?.[0] ?? file.path ?? 'onbekend bestand').replace(/\\/g, '/');
      const geschreven: string[] = [];

      const walk = (knoop: Knoop): void => {
        if (knoop.type === 'text' && typeof knoop.value === 'string') {
          geschreven.push(knoop.value);
          knoop.value = vulJaren(knoop.value);
          return;
        }
        for (const kind of knoop.children ?? []) walk(kind);
      };
      walk(tree);

      // In één keer over de hele body, niet per tekstknoop: dat scheelt dezelfde
      // waarschuwing vier keer voor één bestand.
      meldHandgeschrevenJaren(geschreven.join(' '), bron);
    };

  return {
    waarden: waarden as LoopbaanWaarden<A>,
    vulJaren,
    meldHandgeschrevenJaren,
    frontmatter,
    remarkPlugin,
  };
}
