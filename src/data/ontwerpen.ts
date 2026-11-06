// Matrasontwerpen en mijlpalen, zoals in het raster onder "Ontwikkelen van
// matrassen" op de oude chrisnederhorst.nl. Tekst letterlijk overgenomen.
//
// Drie kolommen, in de volgorde van de live site: die loopt per kolom van boven
// naar beneden, niet per rij. Bewust zo gelaten tot er een keuze is gemaakt
// over de opbouw; één chronologische lijst ligt dan voor de hand.
//
// Let op: pic14.jpg staat er twee keer in (2019 Erasmus én 2013 Comfort Premium
// Air), ook zo op de live site.
import type { ImageMetadata } from 'astro';

import imgBlissMobil1200X633 from '../assets/live/bliss-mobil-1200x633.png';
import imgMaatwerkSamenwerkingPhilipsRhf from '../assets/live/maatwerk-samenwerking-philips-rhf.jpg';
import imgOverlandCampers from '../assets/live/overland-campers.jpg';
import imgPicDji from '../assets/live/pic-dji.png';
import imgPicNen from '../assets/live/pic-nen.webp';
import imgPicPrimaDonnaDeluxe from '../assets/live/pic-prima-donna-deluxe.jpg';
import imgPicRadar from '../assets/live/pic-radar.jpg';
import imgPicTheWorld from '../assets/live/pic-the-world.jpg';
import imgPic02 from '../assets/live/pic02.jpg';
import imgPic03 from '../assets/live/pic03.jpg';
import imgPic04 from '../assets/live/pic04.jpg';
import imgPic05 from '../assets/live/pic05.jpg';
import imgPic06 from '../assets/live/pic06.jpg';
import imgPic07 from '../assets/live/pic07.jpg';
import imgPic09 from '../assets/live/pic09.jpg';
import imgPic10 from '../assets/live/pic10.jpg';
import imgPic11 from '../assets/live/pic11.jpg';
import imgPic12 from '../assets/live/pic12.jpg';
import imgPic13 from '../assets/live/pic13.jpg';
import imgPic14 from '../assets/live/pic14.jpg';
import imgPic15 from '../assets/live/pic15.jpg';
import imgPic16 from '../assets/live/pic16.jpg';
import imgPic17 from '../assets/live/pic17.jpg';
import imgPic18 from '../assets/live/pic18.jpg';

export interface Ontwerp {
  jaar: string;
  tekst: string;
  beeld: ImageMetadata;
}

export const ONTWERP_KOLOMMEN: Ontwerp[][] = [
  [
    { jaar: '1998', beeld: imgPic02, tekst: "1998 De RHF21 De Luxe, Nederlands eerste ventilerende traagschuimmatras , 7 cm ventilerend traagschuim op koudschuim verlijmd, met waterbasis lijm." },
    { jaar: '2005', beeld: imgPic03, tekst: "Insnijdingen van traagschuim met minimale zone, deed toen niemand Het voordeel is dat de ventilatie beter word en dat de puntelasticiteit toeneemt juist waar de meest druk op het matras wordt uitgeoefend zoals bij de schouders en bij de heupen." },
    { jaar: '2008', beeld: imgPic09, tekst: "(RHF 25) Premium Support matras, 9cm geprofileerd ventilerend traagschuim naar het RHF 23 Original Support matras maar op aantal punten verbetert en beschikbaar in vier hardheden" },
    { jaar: '2011', beeld: imgPic10, tekst: "Eco pocket/koudschuim ”pocket” matras zonderstaal, met 9cm geprofileerd ventilerend traagschuim met ventilerende eigenschap van Pocket matrassen. De voordelen zijn goede veerkracht met goede ventilatie." },
    { jaar: '2015', beeld: imgPic15, tekst: "Ergowing hoofdkussen ontwikkeld. Door de vorm ontziet het Ergowing hoofdkussen de hals- en borstwervels gedurende de slaap waardoor deze de natuurlijke vorm kunnen behouden. Tevens is het kussen aanpasbaar in hardheid." },
    { jaar: '2019', beeld: imgPic18, tekst: "Spriaalbodem zonder metaal. Uitstekende ondersteuning zonder straling." },
    { jaar: '2020', beeld: imgPicRadar, tekst: "Interview met Tros Radar – Zie: Radar" },
    { jaar: '2022', beeld: imgPicTheWorld, tekst: "Royal Health Foam is leverancier geworden van de best mogelijke matrassen voor het luxe cruise schip The World." },
    { jaar: '2025', beeld: imgOverlandCampers, tekst: "Exclusieve samenwerking met luxe camperbouwer Overland Campers" },
  ],
  [
    { jaar: '1999', beeld: imgPic04, tekst: "In 1999 de RHF 16 Medical Pro, gemaakt naar het RHF 21 De Luxe matras. Dit matras verkopen we al jaren met veel succes als anti decubitus matras." },
    { jaar: '2005', beeld: imgPic05, tekst: "Premium Air matras met het eerste geprofileerde traagschuim. Dit matras bood absoluut een betere ventilatie door de extra ventilatie kanalen die zijn aangebracht in de kern van het koudschuim en van het traagschuim." },
    { jaar: '2010', beeld: imgPic11, tekst: "Experimentele ballenmatras (2010). Dit werkte toen nog niet, maar het uiteindelijke ontwerp in 2012 overtrof mijn verwachtingen." },
    { jaar: '2012', beeld: imgPic13, tekst: "Het uiteindelijke Evolution ballenmatras, (super ventilerend traagschuim matras).\nDoor de geweldige veerkracht van de koudschuim ballen (HR65) biedt het matras een zachte “feel” maar toch veel ondersteuning en super ventilatie." },
    { jaar: '2017', beeld: imgPic16, tekst: "Het Royal Belly matras is bij de buik qua stevigheid traploos instelbaar. Met de afstandsbediening kan het Royal Belly matras perfect ingesteld worden en is het precies goed." },
    { jaar: '2019', beeld: imgPic14, tekst: "Samenwerking aan ontwikkeling matras Erasmusziekenhuis Rotterdam en ontwikkeling Force bedbodem (kunststof spiraal bodem)" },
    { jaar: '2020', beeld: imgPicDji, tekst: "Royal Health Foam heeft als adviseur opgetreden voor het Ministerie van Justitie en Veiligheid Dienst Justitiële Inrichtingen voor de aanschaf van 15.000 gevangenismatrassen" },
    { jaar: '2024', beeld: imgMaatwerkSamenwerkingPhilipsRhf, tekst: "Ontwikkeling Couveuse matras samenwerking met Philips, TU Eindhoven , het MMC-ziekenhuis en MME" },
  ],
  [
    { jaar: '1998', beeld: imgPic06, tekst: "Original support, 8 cm ventilerend traagschuimmatras op koudschuim (HR55) met een zilvergaren. Gemaakt naar het RHF 21 De Luxe matras maar op aantal punten verbeterd. Zo heeft de tijk zilvergaren waardoor het antibacterieel werkt en is de traagschuimlaag van 7 naar 8 cm gegaan." },
    { jaar: '2006', beeld: imgPic07, tekst: "Piramide matras (2006) met geprofileerde traagschuim top met ventilatie ruimte. De piramide geven een betere progressieve tegendruk en tevens veel ruimte voor extra ventilatie." },
    { jaar: '2010', beeld: imgPic12, tekst: "Koudschuim matras met profilering. Dit matras biedt veel ondersteuning en tevens ruimte voor schouders en heupen waardoor daar geen overdruk kan gaan optreden." },
    { jaar: '2013', beeld: imgPic14, tekst: "Comfort Premium Air matras (ventilerend koudschuim matras). Door elke beweging drukt de slaper lucht uit de kanalen en zuigt het ook weer lucht aan. Precies voor de kanalen zit het 3D gaas dat maar 2% lucht tegenhoudt." },
    { jaar: '2018', beeld: imgPic17, tekst: "Ontwikkeling van het Biologische Stro matras. De huidige stromatras is een combinatie van moderne materialen en technologieën gecombineerd met het 'ouderwetse' stro." },
    { jaar: '2019', beeld: imgPicNen, tekst: "Deelnemer NEN - Normbepaling NTA 8096 en ISO 20342 Zorgbedden en anti-decubitusmatrassen, Projectgroep Matrassen Nederland" },
    { jaar: '2021', beeld: imgPicPrimaDonnaDeluxe, tekst: "Royal Health Foam heeft de Prima Donna De Luxe geïntroduceerd, het meest luxe kindermatras dat nu te koop is." },
    { jaar: '2024', beeld: imgBlissMobil1200X633, tekst: "Nieuwe samenwerking met luxe camper bouwer Bliss mobil" },
  ],
];
