// Dati delle opere con coordinate e informazioni
import artwork1 from '@/assets/artwork-1.jpg';
import artwork2 from '@/assets/artwork-2.png';
import artwork3 from '@/assets/artwork-3.jpg';
import artwork4 from '@/assets/artwork-4.png';
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
    collection: "Collezione Gualino, Musei Reali Torino",
    museum: "",
    description: "Il dipinto fu acquistato a Parigi nel 1920 da Riccardo Gualino - imprenditore, mecenate e collezionista - e donato alla Galleria Sabauda nel 1930.  Venere è ritratta nuda, a figura intera, su uno sfondo scuro mentre con le mani e i lunghi capelli cerca, con pudore, di coprirsi. \n L’opera fu realizzata nella bottega fiorentina di Sandro Botticelli, probabilmente come opera autonoma ispirata alla Nascita di Venere degli Uffizi, con ripensamenti visibili nelle pose di mani, piedi e arti, come evidenziato da indagini diagnostiche del 2019. \n Secondo la versione di Esiodo, Venere dalla spuma marina, dopo che Crono evira Urano gettandone i genitali nel mare. Dea romana dell’amore (Afrodite per i greci) e simbolo di armonia e fecondità, emerge già adulta su una conchiglia portata da Zefiro.",
    image: artwork1,
    xPercent: 70,
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
  {
    id: 2,
    artist: "Tommaso Della Porta",
    title: "Busto di Minerva con elmo figurato",
    year: "Sec. II a.C. e sec. XVI d.C.",
    technique: "Marmo pario; marmo pentelico",
    collection: "Museo di Antichità, Musei Reali Torino",
    museum: "",
    description: "Il busto di Minerva unisce una testa romana repubblicana a un busto rinascimentale. Lo stile classicista, influenzato dall'ellenismo, suggerisce una bottega ateniese attiva nella Roma antica, mentre le aggiunte rinascimentali, in marmi greci, sono opera di Tommaso Della Porta il Vecchio. La scultura entra nelle collezioni sabaude tra fine Cinquecento e inizio Seicento, collocata nella Grande Galleria del Palazzo Ducale a Torino, dove Carlo Emanuele I di Savoia aveva raccolto la sua ricca biblioteca e la sua preziosa collezione d’arte e di antichità. \n  Si narra che Zeus si fosse innamorato della dea Meti. Un oracolo, però, predice che Meti avrebbe generato una figlia più potente del padre. Terrorizzato dalla profezia, Zeus la inganna: la convince a trasformarsi in una mosca e la ingoia intera. La dea, però, continua la gravidanza all’interno di Zeus e, a suon di colpi di martello, crea un’armatura per la futura figlia. I colpi, così rumorosi, incessanti e dolorosi, spingono Zeus a chiedere a Efesto, il fabbro divino, di spaccargli la testa con un’ascia. Proprio allora, dalla grande ferita viene fuori Minerva, già adulta, armata di elmo, corazza, scudo e lancia.",
    image: artwork2,
    xPercent: 20,
    yPercent: 42,
    widthPercent: 12,
    heightPercent: 42,
    storie:[
      {
      id:"storia1",
      paragrafo:"Minerva usa l’elmo maschile come trofeo.\n Mi colpisce la figura viscida sopra il copricapo e l’uso dei serpenti come ornamento. L’uomo rappresentato sembra il tipico patriarca siciliano che sovrasta la donna, a cui non resta che lottare per affermare il proprio ruolo ", 
      autore:"Chiara Billi Cusimano"
      },
      {
      id:"storia2",
      paragrafo:"In questo busto non vedo una dea, ma una donna che indossa un copricapo da cui spunta un uomo. \n So che Minerva è nata dalla testa di Zeus e quindi credo che questo elmo rappresenti suo padre. Lei lo indossa con fierezza.\n  Mi ricorda la mia rivincita e la mia indipendenza quando andai a vivere da sola. Ero molto giovane, ma la paura e le insicurezze erano rassicurate dalla presenza silenziosa dei miei cari. \n Ho viaggiato, mi sono trasferita, ma ho portato sempre con me la mia famiglia: mio padre era sempre sul mio capo.", 
      autore:"Erica Carnevale"
      },
      {
        id:"storia3",
        paragrafo:"Una statua storica, che trasmette un forte background di un paese e della capacità della sua gente di realizzare una statua. Il copricapo su cui incombe una figura maschile però mi riporta alla mente il controllo dell’uomo sulla donna. \n Di una donna che vive sotto un’ombra.",
        autore:"Luftullah Sarwari"
      }
    ]
  },
  {
    id: 3,
    artist: "Giovanni Riccio",
    title: "Giuseppina Bolognara",
    year: "seconda metà XIX secolo ",
    technique: "litografia",
    collection: "Museo Nazionale del Risorgimento Italiano",
    museum: "",
    description: "Litografo attivo nel Piemonte risorgimentale, Riccio realizzò stampe celebrative di eroi ed eroine del periodo. \n In quest'opera, raffigura Giuseppina Bolognara attraverso un immaginario tipico della propaganda patriottica piemontese, in posa fiera, con dettagli realistici del volto e abbigliamento popolare.Giuseppina Bolognara, nota come 'Peppa 'a cannunera' (Peppa la cannoniera), è un’eroina del Risorgimento italiano. Nata a Barcellona Pozzo di Gotto (Messina) tra 1826-1841, orfana e anticonformista, emigra giovanissima a Catania come lavandaia, stalliera e vivandiera. \n Durante l'insurrezione antiborbonica del 31 maggio 1860, resta sola al cannone in piazza Duomo contro i lancieri nemici, sparando con sangue freddo e guadagnandosi il soprannome leggendario. Catturata e poi rilasciata dal generale Clary, partecipa alla liberazione di Siracusa e alla Spedizione dei Mille, simboleggiando il coraggio femminile nel Meridione risorgimentale.storico.",
    image: artwork3,
    xPercent: 55,
    yPercent: 35,
    widthPercent: 10,
    heightPercent: 35,
    storie: [{
      id:"storia1",
      paragrafo:"Giuseppina di Barcellona: nonostante abbia dovuto subire tanto, sia stata ostacolata, ha tirato fuori una grinta e un coraggio fino a diventare “la cannoniera” che è riuscita a fare la storia grazie al suo coraggio. \n  Era un donna considerata poco attraente, piena di cicatrici, disprezzata dagli uomini per il suo aspetto fisico. Io non mi considero bellissima, però sono sempre stata guardata con apprezzamento. Non importava quanto fossi intelligente, preparata… contava essere attraente. \n  Paradossalmente sono stata più fortunata di lei senza avere i suoi meriti. Questo mi colpisce molto: a seconda che tu sia “da un lato” piuttosto che da un altro dal punto di vista fisico, vieni considerata in maniera diversa. \n  Per Giuseppina ho provato compassione e ammirazione insieme. Allora come oggi, se hai gli uomini contro, tutto è più difficile.",
      autore:"Erica Carnevale"
    }]
  },
  {
    id: 4,
    artist: "Autore Ignoto",
    title: "Naiade",
    year: "1650-1699",
    technique: "marmo verzino di Frabosa",
    collection: "Villa della Regina, Torino",
    museum: "",
    description: "Una Naiade sdraiata regge un'urna capovolta da cui sgorga l'acqua della cascatella del Belvedere di Villa della Regina a Torino. \n Semisdraiata, con capelli raccolti e ciocche fluenti, fa coppia con un satiro. L'acqua scorre da livelli progressivi verso una vasca-conchiglia in marmo bianco, collegando il Belvedere superiore alla Fontana del Mascherone e alle fontane inferiori. In questo caso, rappresenta l'abbondanza e la fertilità del giardino su cui sorge la Villa. \n Nella mitologia greca, le Naiadi sono ninfe delle acque dolci, spesso figlie di Zeus o di dèi fluviali. Sono spiriti femminili legati a fiumi, sorgenti, laghi e paludi. Vivono molto a lungo ma non sono immortali. Sono protettrici della fecondità della terra, del matrimonio e con poteri guaritori e profetici. Spesso erano venerate con offerte presso fonti sacre. ",
    image: artwork4,
    xPercent: 38,
    yPercent: 28,
    widthPercent: 15,
    heightPercent: 35,
    storie:[{
      id:"storia1",
      paragrafo:"Una donna nuda è seduta comodamente. Accanto a lei, un bambino che la guarda sognante e amorevole. Accanto, c’è un vaso da cui esce un liquido vitale. \n Penso alla responsabilità di questa donna. Penso alle responsabilità delle donne del Marocco verso la loro famiglia. \n A loro è affidata la cura dei legami familiari e della casa.",
      autore:"Hodda Bourki",
    },
    {
      id:"storia2",
      paragrafo:"Una giovane donna aggraziata è seduta su un fianco e tiene un vaso da cui sgorga dell’acqua. Al suo fianco c’è una figura metà uomo e metà animale, sembrerebbe quasi una capra, con lo sguardo rivolto verso di lei. Lei però non ricambia e guarda dritto, quasi con freddezza. E’ molto bella, ma distante. Lui sembra più rilassato, a suo agio, ma anche invadente nei suoi confronti, specialmente nello sguardo. Ho un background filippino, ma sono nata e cresciuta in Italia. \n La figura del fauno mi ricorda alcune creature della cultura popolare filippina, metà umane e metà animali, che hanno carattere mostruoso e influenze negative. Spesso a casa, da piccola, sentivo i racconti di questi personaggi. Mi ricordo di un grosso gnomo maligno detto “nuno”, che si diceva abitasse sotto terra nel giardino della casa dei miei nonni materni. Ogni volta che mia mamma e i suoi fratelli giocavano in giardino, dovevano chiedere il permesso per non disturbarlo. Altrimenti lui avrebbe potuto mandar loro maledizioni o farli stare male in qualche modo, per esempio facendoli cadere o piangere. \n Un’estate, mia cugina, che ha la mia stessa età, stava studiando la lezione di storia sulla mitologia greco-romana. Allora mi era sembrato naturale unirmi a lei per ripassare insieme ma, col senno di poi, da grande, ho capito quanto lo sguardo del suo libro fosse etnocentrico e coloniale, e quanto il sistema scolastico mi avesse insegnato poco della storia e della cultura del paese d’origine dei miei genitori.",
      autore:"Maria Rosa Liay"
    },
    {
      id:"storia3",
      paragrafo:"Un bambino e una donna che tiene un vaso da cui esce dell’acqua. Fertilità e vita. E’ la donna che genera la cascata, è lei che genera la linea della vita. Nell’impero Inca, le donne erano considerate simbolo di fertilità e ricoprivano un ruolo molto importante nella famiglia. \n Come mia madre, che per noi è sempre stata un sostegno. Lei è stata fondamentale per l’educazione mia e dei miei fratelli. Ha passato momenti molto difficili durante la sua infanzia perché in quegli anni, così come ora, nella nostra società imperversava il machismo. Era una società che credeva che le donne dovessero occuparsi solo delle faccende domestiche e non permetteva nemmeno che andassero a scuola. Nonostante queste costrizioni, madre è stata una persona resiliente che ha saputo superare gli ostacoli e darci una buona educazione. Un’educazione in cui si è sempre premiato il rispetto verso le altre persone, senza considerare razza, credo o condizione sociale.",
      autore:"Milagros Taipe"
    },
    {
      id:"storia4",
      paragrafo:"Una neiade e un centauro guardano la città di Torino dall’alto, bagnandola con l'acqua che sgorga dalla loro anfora. \n Mi colpisce molto la libertà con cui un tempo venivano raffigurati corpi nudi di donne e uomini mentre ora è diventato un tabù oppure una riproduzione di corpi sessualizzati e strumentalizzati. \n Negli ultimi periodi mi sembra si stia facendo maggiore attenzione al tema sessualizzazione e strumentalizzazione, anche se troppo poco. La televisione pubblica continua a mostrare donne con corpi scoperti nel ruolo di vallette accompagnatrici. Penso che i mass media abbiano fomentato questa tipologia di narrazione rendendola sistemica e culturale. Risulta ora complicatissimo estirpare questa modalità di rappresentazione dei corpi, anche se il modo più semplice potrebbe essere proprio il ripartire dalle origini. Da quel modo di fare arte senza secondi fini, dando spazio agli elementi che compongono la natura nella loro forma più autentica. \n Proprio come in questa scultura.",
      autore:"Roxana Olariu"
    },
    {
      id:"storia5",
      paragrafo:"Una donna seduta sulla riva di un ruscello è intenta a raccogliere dell’acqua in compagnia di un fauno. Lui la contempla; lei, rilassata, osserva il flusso che parte dal suo vaso. \n Quando da piccola vivevo a Palermo, in estate l’acqua veniva sempre a mancare. Allora, la mia e le altre famiglie caricavano le loro macchine con boccioni e bottiglie per andare a far scorta. \n Di solito le fontane erano posizionate in zona mare e per noi bambini e bambine era un momento di festa! Ciascuno raccoglieva l'acqua per sé e poi aiutava gli altri. In questo modo si faceva anche amicizia. Era un momento di comunità e condivisione allegro nonostante la siccità e la carenza d’acqua che affliggeva il territorio.",
      autore:"Shobini Ratnasinghan"
    },
    {
      id:"storia6",
      paragrafo:"Appena arrivata di fronte alla fontana, ho visto due sculture che mi hanno ricordato il mio paese d'origine, l’Iran. \n Il suono dell’acqua, il verde della collina intorno e il bianco della pietra, mi hanno trasmesso un senso di pace. \n Mi sono venute alla mente le fontane che ho visto a Roma e quelle in piazza CLN a Torino, del fiume Po e Dora. Mi sono chiesta: qual è il ruolo dell’acqua in questa cultura? Perché costruiscono così fontane così imponenti? \n In Iran, nei tempi antichi, si raccontava di una dea che proteggeva l’acqua. Il suo nome era Anahita ed è raffigurata metà donna e metà animale. Anahita nella cultura persiana è associata all’acqua, alla fertilità, alla guarigione e al vento. Simboleggia una forza vivificante e sostenitrice. Era ed è una figura molto importante a livello propiziatorio perché molte regioni del mio paese erano affette da grande siccità e quindi l’acqua era un elemento essenziale di sopravvivenza.",
      autore:"Tahereh Ahmadzadeh"
    }
  ]},
  /*
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
