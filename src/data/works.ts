// Dati delle opere con coordinate e informazioni
import artwork1 from '@/assets/artwork-1.jpg';
import artwork2 from '@/assets/artwork-2.jpg';
import artwork3 from '@/assets/artwork-3.jpg';
import artwork4 from '@/assets/artwork-4.jpg';
import artwork5 from '@/assets/artwork-5.jpg';
import artwork6 from '@/assets/artwork-6.jpg';

interface Storia {
  id: string;               // ID univoco per ogni storia
  paragrafo: string;        // Testo del paragrafo
  autore: string;           // Autore della storia
}


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
  storie: Storia[];
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
    heightPercent: 45,
    storie:[
      {
        id:"storia1",
        paragrafo:"Io sono Astou. Lei è Venere. \n Lei ha i capelli lunghissimi, lisci, marroni, corpo magro, viso triste, bocca piccola, naso lungo. Lei è alta. Io non vorrei il collo lungo e le braccia secche come le sue. Non mi piacciono le sue dita lunghe, però mi piace il suo corpo magro. Il mio è grosso, non mi piace, però mi piacciono i miei capelli lunghi e lisci e neri. \n Lei pensa alla vita. Io penso a mia mamma. Non la vedo da un anno perché sono in Italia e lei è in Senegal. Sono la più piccola della famiglia. Io e lei siamo sempre state complici, vicinissime. Mi manca tanto. \n Mia mamma è bellissima. Mia mamma è più bella di Venere.", 
        autore:"Astou Diagne"
      },
      {
        id:"storia2",
        paragrafo:"Io sono Favour e sono nigeriana. Lei è Venere.\n È bellissima. Ha capelli belli e marroni. Mi piace il suo corpo magro con la pancia piccola. Mi piace la sua pancia magra perché la mia è grassa e non mi sta bene. Lei pensa all'amore, io penso al lavoro.\nNe vorrei uno. Io sono in Italia dal 2015 e non ho mai lavorato. Sono andata a scuola. Adesso cerco lavoro.",
        autore:"Favour Ekhosun"
      },
      {
        id:"storia3",
        paragrafo:"Io sono Jennifer. Lei è Venere.\n Alta, bella, magra, capelli lunghissimi marroni, occhi neri. Lei è come me, solo che io non ho i capelli lunghi, i miei sono corti. Lei sta pensando a qualcosa?\n Io non penso a niente. Ho buttato tutto: la vita è piccola.",
        autore:"Jennifer Brown"
      },
      {
        id:"storia4",
        paragrafo:"Lei è Venere. \n Ha un viso serio e triste, occhi neri, capelli lunghi. E’ alta e ha un bel corpo. Lei ha i capelli lunghi e marroni, mi piace. Invece i miei sono corti e li vorrei lunghi. Se la guardo e mi chiedi a cosa penso, penso che lei si vergogna come me.\n Io sono timida. Non mi piace parlare quando ci sono tante persone, perché non parlo bene l'italiano.",
        autore:"Madeleine Kossia Koliame"
      },
      {
        id:"storia5",
        paragrafo:"Io sono Souad. Questa Venere è bella, è alta e ha un bel corpo. Ha i capelli lunghissimi che coprono le sue parti intime. Lei è magra ma ha la pancia: forse è incinta? \n Non mi piace vederla nuda e non mi piacciono i capelli lunghi. E anche i suoi seni piccoli non mi piacciono. A me piace essere magra, alta e senza pancia. \n È timida e triste. Secondo me sta pensando a qualcosa, magari alla vita, ai suoi problemi personali, alla nostalgia. \n Forse ha un rimorso.",
        autore:"Souad Daoudi"
      }
    ]
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
