// Dati delle opere con coordinate e informazioni
import artwork1 from '@/assets/artwork-1.jpg';
import artwork2 from '@/assets/artwork-2.jpg';
import artwork3 from '@/assets/artwork-3.jpg';
import artwork4 from '@/assets/artwork-4.jpg';
import artwork5 from '@/assets/artwork-5.jpg';
import artwork6 from '@/assets/artwork-6.jpg';

export interface Work {
  id: number;
  title: string;
  artist: string;
  year: string;
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
    title: "Ritratto di Gentildonna",
    artist: "Anonimo, Scuola Fiorentina",
    year: "1845",
    description: "Un elegante ritratto che cattura la grazia e la nobiltà del soggetto, con una tecnica pittorica raffinata tipica della tradizione rinascimentale italiana.",
    image: artwork1,
    xPercent: 6,
    yPercent: 22,
    widthPercent: 9,
    heightPercent: 22
  },
  {
    id: 2,
    title: "Colline Toscane al Tramonto",
    artist: "Giovanni Fattori",
    year: "1872",
    description: "Un paesaggio bucolico che immortala la dolcezza delle colline toscane, bagnate dalla luce dorata del tramonto.",
    image: artwork2,
    xPercent: 18,
    yPercent: 14,
    widthPercent: 11,
    heightPercent: 15
  },
  {
    id: 3,
    title: "Natura Morta con Fiori",
    artist: "Rachel Ruysch",
    year: "1710",
    description: "Una composizione floreale magistrale, dove ogni petalo sembra pulsare di vita propria, in puro stile fiammingo.",
    image: artwork3,
    xPercent: 20,
    yPercent: 32,
    widthPercent: 8,
    heightPercent: 18
  },
  {
    id: 4,
    title: "Bacco e Arianna",
    artist: "Tiziano Vecellio",
    year: "1523",
    description: "Scena mitologica che rappresenta l'incontro tra il dio del vino e la principessa cretese, capolavoro del Rinascimento veneziano.",
    image: artwork4,
    xPercent: 34,
    yPercent: 15,
    widthPercent: 11,
    heightPercent: 15
  },
  {
    id: 5,
    title: "Il Mercante",
    artist: "Rembrandt van Rijn",
    year: "1654",
    description: "Ritratto introspettivo che rivela la maestria del chiaroscuro di Rembrandt, catturando l'anima del soggetto.",
    image: artwork5,
    xPercent: 52,
    yPercent: 17,
    widthPercent: 9,
    heightPercent: 22
  },
  {
    id: 6,
    title: "Vascelli al Crepuscolo",
    artist: "Willem van de Velde",
    year: "1680",
    description: "Marina olandese che celebra l'età d'oro della navigazione, con una luce atmosferica che pervade l'intera composizione.",
    image: artwork6,
    xPercent: 68,
    yPercent: 20,
    widthPercent: 11,
    heightPercent: 15
  }
];

// Non più necessaria la funzione corridorWidth dato che usiamo percentuali
export const getCorridorWidth = (): number => {
  return window.innerWidth;
};
