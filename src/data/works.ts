// Dati delle opere con coordinate e informazioni
import artwork1 from '@/assets/artwork-1.jpg';
import artwork2 from '@/assets/artwork-2.jpg';
import artwork3 from '@/assets/artwork-3.jpg';
import artwork4 from '@/assets/artwork-4.jpg';
import artwork5 from '@/assets/artwork-5.jpg';
import artwork6 from '@/assets/artwork-6.jpg';

export interface Work {
  id: number;
  artist: string;
  title: string;
  year: string;
  technique: string,
  collection: string,
  museum: string,
  description: string;
  image: string;
  // Coordinate in percentuale (0-100)
  xPercent: number;
  yPercent: number;
  // Dimensioni in percentuale della viewport
  widthPercent: number;
  heightPercent: number;
}

// Coordinate come percentuale della viewport
// L'area utile del muro è circa dal 5% al 85% della larghezza
export const works: Work[] = [
  {
    id: 1,
    artist: "Sandro Botticelli e bottega",
    title: "Venere",
    year: "1485-1490 ca",
    technique: "Olio su tela, cm 174 x 77",
    collection: "Collezione Gualino",
    museum: "Musei Reali",
    description: "Il dipinto fu acquistato a Parigi nel 1920 da Riccardo Gualino - imprenditore, mecenate e collezionista - e donato alla Galleria Sabauda nel 1930.  Venere è ritratta nuda, a figura intera, su uno sfondo scuro mentre con le mani e i lunghi capelli cerca, con pudore, di coprirsi. L’opera fu realizzata nella bottega fiorentina di Sandro Botticelli, probabilmente come opera autonoma ispirata alla Nascita di Venere degli Uffizi, con ripensamenti visibili nelle pose di mani, piedi e arti, come evidenziato da indagini diagnostiche del 2019.Secondo la versione di Esiodo, Venere dalla spuma marina, dopo che Crono evira Urano gettandone i genitali nel mare. Dea romana dell’amore (Afrodite per i greci) e simbolo di armonia e fecondità, emerge già adulta su una conchiglia portata da Zefiro.",
    image: artwork1,
    xPercent: 14,
    yPercent: 25,
    widthPercent: 11,
    heightPercent: 26
  },
  /*{
    id: 2,
    title: "Colline Toscane al Tramonto",
    artist: "Giovanni Fattori",
    year: "1872",
    description: "Un paesaggio bucolico che immortala la dolcezza delle colline toscane, bagnate dalla luce dorata del tramonto.",
    image: artwork2,
    xPercent: 28,
    yPercent: 30,
    widthPercent: 12,
    heightPercent: 18
  },
  {
    id: 3,
    title: "Natura Morta con Fiori",
    artist: "Rachel Ruysch",
    year: "1710",
    description: "Una composizione floreale magistrale, dove ogni petalo sembra pulsare di vita propria, in puro stile fiammingo.",
    image: artwork3,
    xPercent: 40,
    yPercent: 50,
    widthPercent: 10,
    heightPercent: 16
  },
  {
    id: 4,
    title: "Bacco e Arianna",
    artist: "Tiziano Vecellio",
    year: "1523",
    description: "Scena mitologica che rappresenta l'incontro tra il dio del vino e la principessa cretese, capolavoro del Rinascimento veneziano.",
    image: artwork4,
    xPercent: 42,
    yPercent: 27,
    widthPercent: 14,
    heightPercent: 20
  },
  {
    id: 5,
    title: "Il Mercante",
    artist: "Rembrandt van Rijn",
    year: "1654",
    description: "Ritratto introspettivo che rivela la maestria del chiaroscuro di Rembrandt, catturando l'anima del soggetto.",
    image: artwork5,
    xPercent: 58,
    yPercent: 34,
    widthPercent: 11,
    heightPercent: 26
  },
  {
    id: 6,
    title: "Vascelli al Crepuscolo",
    artist: "Willem van de Velde",
    year: "1680",
    description: "Marina olandese che celebra l'età d'oro della navigazione, con una luce atmosferica che pervade l'intera composizione.",
    image: artwork6,
    xPercent: 72,
    yPercent: 40,
    widthPercent: 12,
    heightPercent: 18
  }*/
];

// Non più necessaria la funzione corridorWidth dato che usiamo percentuali
export const getCorridorWidth = (): number => {
  return window.innerWidth;
};
