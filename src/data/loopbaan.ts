// De ankers achter de ervaringsjaren op deze site. Het rekenwerk staat in
// src/lib/loopbaan.ts; dit is het enige deel dat per site verschilt.
//
// Elk anker levert twee plaatshouders voor in de content en twee waarden voor in
// code:
//
//   beddenvak → {{startBeddenvak}} = 1988   {{jarenBeddenvak}} = volle jaren sindsdien
//   producent → {{startProducent}} = 1998   {{jarenProducent}} = volle jaren sindsdien
//
// In markdown en frontmatter schrijf je de plaatshouder; in TypeScript gebruik je
// `LOOPBAAN.jarenBeddenvak`. De maand bepaalt wanneer het getal doortelt — hier
// allebei april, dus rolt de site elk jaar op 1 april over. Staat de rebuild in
// .github/workflows/ op een andere maand, zet hem dan gelijk met deze.

import { maakLoopbaan } from '../lib/loopbaan';

export const loopbaan = maakLoopbaan({
  // 1988: begonnen in het beddenvak, in een beddenwinkel.
  beddenvak: { jaar: 1988, maand: 4 },
  // April 1998: Royal Health Foam opgericht (als Winwinwin B.V.), fabriek in Scheveningen.
  producent: { jaar: 1998, maand: 4 },
});

export const LOOPBAAN = loopbaan.waarden;
