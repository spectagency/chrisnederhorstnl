import { SITE } from '../data/site';

// Gedeelde content-helpers.

/**
 * Of er artikelen zijn (bestanden met een _ ervoor, zoals _template.md, tellen
 * niet mee). Zolang de collectie leeg is, waarschuwt Astro bij élke
 * getCollection('artikelen') — en het menu vraagt die op elke pagina op. Die
 * ruis zou echte waarschuwingen, zoals het vangnet voor ervaringsjaren,
 * onzichtbaar maken. Deze controle kan weg zodra er artikelen zijn.
 */
export const HEEFT_ARTIKELEN =
  Object.keys(import.meta.glob('/src/content/artikelen/[!_]*.md')).length > 0;

/**
 * Waarschuwt tijdens de build over titels en beschrijvingen die in de
 * zoekresultaten worden afgekapt.
 *
 * De grenzen zijn de praktische: Google toont ongeveer 600 pixels titel — bij
 * deze letters zo'n 60 tekens, inclusief SITE.titleSuffix — en rond de 155 tekens beschrijving. Wat eroverheen gaat, ziet de bezoeker
 * niet.
 *
 * Bewust een waarschuwing en geen fout: een titel van 61 tekens hoort een deploy
 * niet tegen te houden. De melding is er om te voorkomen dat het ongemerkt
 * terugsluipt zodra iemand een nieuwe pagina toevoegt.
 */
export const TITEL_MAX = 60;
export const DESCRIPTION_MAX = 155;
const TITEL_SUFFIX = SITE.titleSuffix.length;

export const warnMetaLengths = (
  soort: string,
  items: readonly { id: string; titel: string; description: string }[],
): void => {
  const teLang = items.filter((i) => i.titel.length + TITEL_SUFFIX > TITEL_MAX);
  const teBreed = items.filter((i) => i.description.length > DESCRIPTION_MAX);
  if (teLang.length === 0 && teBreed.length === 0) return;

  const regels = [
    ...teLang.map((i) => `  titel ${i.titel.length + TITEL_SUFFIX}/${TITEL_MAX}  ${i.id}`),
    ...teBreed.map((i) => `  descr ${i.description.length}/${DESCRIPTION_MAX}  ${i.id}`),
  ];
  console.warn(
    `\n${soort}: ${regels.length} keer over de lengtegrens voor zoekresultaten:\n` +
      regels.slice(0, 15).join('\n') +
      (regels.length > 15 ? `\n  … en nog ${regels.length - 15}` : '') +
      '\n',
  );
};
