// "Kennis van zaken" op de oude chrisnederhorst.nl: de matrasmerken van Chris
// en zijn informatiesites. Tekst letterlijk overgenomen.
import type { ImageMetadata } from 'astro';
import rhfLogo from '../assets/live/rhflogo.jpg';
import skLogo from '../assets/live/slaapkindjeslaap.jpg';
import oblizzLogo from '../assets/live/oblizz-logo.gif';
import matrasInfo from '../assets/live/matras.info.png';
import traagschuimInfo from '../assets/live/traagschuim.info.png';
import koudschuimInfo from '../assets/live/koudschuim.info.png';
import kindermatrasInfo from '../assets/live/kindermatras.info.png';
import bedbodemInfo from '../assets/live/bedbodem.info.png';

export interface Merk {
  naam: string;
  tekst: string;
  url: string;
  logo: ImageMetadata;
  logoAlt: string;
}

export const MERKEN: Merk[] = [
  {
    naam: 'Royal Health Foam',
    tekst: 'Ventilerende traagschuim matrassen met directe levering aan consumenten.',
    url: 'https://www.healthfoam.com',
    logo: rhfLogo,
    logoAlt: 'RHF Matrassen',
  },
  {
    naam: 'Slaap Kindje Slaap',
    tekst: 'De beste en veiligste kindermatrassen met directe levering aan consumenten.',
    url: 'http://www.slaapkindjeslaap.nl',
    logo: skLogo,
    logoAlt: 'Slaap Kindje Slaap - Kindermatrassen',
  },
  {
    naam: 'Oblizz',
    tekst: 'Energetische matrassen zoals het biogeometry matras en het aroma matras.',
    url: 'http://www.energetischematrassen.nl',
    logo: oblizzLogo,
    logoAlt: 'Oblizz',
  },
];

export interface InfoSite {
  url: string;
  logo: ImageMetadata;
  alt: string;
}

export const INFOSITES: InfoSite[] = [
  { url: 'https://www.matras.info', logo: matrasInfo, alt: 'Matras.info - informatie over matrassen' },
  { url: 'https://www.traagschuim.info', logo: traagschuimInfo, alt: 'Traagschuim.info - informatie over traagschuim' },
  { url: 'https://www.koudschuim.info', logo: koudschuimInfo, alt: 'Koudschuim.info - informatie over koudschuim' },
  { url: 'http://www.kindermatras.info', logo: kindermatrasInfo, alt: 'kindermatras.info - informatie over kindermatrassen' },
  { url: 'http://www.bedbodem.info', logo: bedbodemInfo, alt: 'Informatie over bedbodems' },
];
