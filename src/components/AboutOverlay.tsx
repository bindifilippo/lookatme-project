import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import banner from '@/assets/banner.png'
import genererazionePonte from '@/assets/generazione-ponte.avif';
import fabene from '@/assets/fa-bene.png'

interface AboutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutOverlay = ({ isOpen, onClose }: AboutOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-500 ease-in-out ${
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      } font-moderno`}
      >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Content panel */}
      <div
        className={`relative w-full h-full overflow-y-auto transition-all duration-500 ease-in-out ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{ backgroundColor: 'hsl(40 35% 92%)' }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="fixed top-12 left-12 z-[10000] p-2 rounded-full bg-black/10  hover:bg-black/20 transition-colors duration-200"
            aria-label="Chiudi"
          >
            <X className="w-10 h-10 text-foreground/70" />
          </button>

              <div className="w-full min-h-full p-12">
                <div className="pt-12"></div>
                {/* 2 colonne: sinistra testo lungo, destra sezioni */}
                <div className="grid grid-cols-1 gap-28 lg:grid-cols-[2fr_1fr] lg:items-start">
                  <article>
                    <strong> <p className="mt-12 text-4xl"></p> </strong>
                    <p className="mt-6 text-2xl"> <strong>Look at Me è un invito e una dichiarazione.</strong> <br/> È l’atto di fermarsi davanti a un’opera del nostro patrimonio culturale e guardarla davvero. Ma è anche il coraggio di dire: “guardami”, mentre la osservo, perché dentro quello sguardo c’è la mia storia.</p>
                    <p className="mt-6 text-2xl">Questo sito pilota nasce dal <strong>progetto Parlapà, narrazioni contemporanee al femminile</strong> realizzato da Generazione Ponte e Fa Bene cofinanziato dall’Unione Europea e dalla Regione Piemonte tramite il bando Connect for Global Change promosso da COP – Consorzio Ong Piemonte. <br/> <br/>Quello che vedete e leggete è il risultato di un percorso che ha messo al centro le persone prima ancora delle opere. 
                    Attraverso una rilettura del patrimonio culturale in prospettiva di genere, donne con background migratorio hanno attraversato musei, immagini, simboli e narrazioni sedimentate nel tempo. Le hanno interrogate. Le hanno ribaltate. Le hanno abitate. Ogni opera è diventata uno specchio, una soglia, una possibilità di racconto.</p> 
                    <p className="mt-6 text-2xl ">
                    <strong>In Look at Me lo sguardo non è mai a senso unico. <br/> Chi osserva un dipinto, una scultura, un frammento di storia, si lascia a sua volta attraversare. Le partecipanti interpretano le opere a partire dalle proprie esperienze di migrazione, di appartenenza plurale, di identità in trasformazione. Così il patrimonio non è più qualcosa di distante o immobile, ma un territorio vivo e pieno di voci.</strong></p> 
                    <p className="mt-6 text-2xl "> 
                    Questo spazio digitale raccoglie opere e racconti. Non sono semplici descrizioni: sono narrazioni situate, intime e politiche insieme. Ogni testo è un gesto di riappropriazione, un modo per affermare che la cultura è un campo aperto, dove nuove prospettive possono riscrivere il significato delle immagini che credevamo di conoscere. </p>
                    <p className="mt-6 mb-12 text-2xl "><strong>Guardare un’opera, qui, significa anche lasciarsi guardare.<br/> E riconoscere che dentro ogni sguardo c’è un mondo che merita di essere visto.</strong></p>
                  </article>
                  {/* COLONNA 2: sezioni */}
                  <aside className="space-y-10">
                    <section> 
                      <strong><p className="mt-12 mb-0 text-2xl ">I musei di Torino che abbiamo visitato:</p></strong>
                      <p className="mt-6 mb-12 text-xl ">Museo Nazionale del Risorgimento Italiano <br />  Musei Reali <br /> Villa della Regina</p>
                    </section>
                   <hr className="my-12 border-t border-black/20" />
                    <section> 
                      <strong><p className="mt-12 mb-0  text-2xl ">Le opere che abbiamo raccontato:</p></strong>
                      <p className="mt-6 mb-6 text-xl ">Abito appartenuto a Maria Clotilde o a Maria Pia di Savoia / Berlina-coupé cosiddetta diplomatica di Cavour / Giuseppina Bolognara / Camera dei Deputati del Parlamento Subalpino e del Regno d'Italia, Museo Nazionale del Risorgimento Italiano<br/> <br/>Minerva e Venere, Musei Reali<br/> <br/> Naiade, Villa della Regina </p>
                      <p className="mr-12 text-lg">Le immagini sono pubblicate su gentile concessione del Ministero della cultura, Residenze Reali Sabaude - Direzione regionale Musei Nazionali Piemonte,l Museo Nazionale del Risorgimento Italiano di Torino</p>
                    </section>
                    <hr className="my-12 border-t border-black/20" />
                    <section> 
                      <strong><p className="mt-12 mb-0  text-2xl ">Le persone che hanno interpretato le opere:</p></strong>
                      <p className="mt-6 mb-12 text-xl "> Tahereh Ahmadzadeh, Mohammad Ali Ahmadi, Elva Taipe Alanya, Chiara Billi CusimanoHodda Bourki, Jennifer Brown, Erica Carnevale, Souad Daoudi, Astou Diagne, Favour Ekhosun, Mohammad-Samad Jafari, Madeleine Kossia Koliame, Maria Rosa Liay, Yazuri Martel Ychpas, Sole Miseo, Roxana Olariu, Shobini Ratnasinghan, Luftullah Sarwari, Milagros Taipe</p>
                    </section>
                    <hr className="my-12 border-t border-black/20" />
                    <section> 
                     <p className="mt-12 mb-0  text-2xl"> <strong>Curatrice del progetto:</strong> Lorena Tadorni</p>
                      <p className="mt-12 mb-0  text-2xl "><strong>Guida:</strong> Nemi Ferrara</p>
                      <p className="mt-12 mb-0  text-2xl"><strong>Web designer:</strong> Filippo Bindi </p>
                    </section>
                  </aside>
                </div>
                <hr className="my-12 border-t border-black/20" />
                <div className="flex w-full items-center justify-center gap-24 mt-24">
                  <div className="w-64 h-32 flex items-center justify-center">
                    <img
                      src={genererazionePonte}
                      alt="Generazione Ponte"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="w-64 h-32 flex items-center justify-center">
                    <img
                      src={fabene}
                      alt="Fa Bene"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <img src={banner}/> 
            </div>
          </div>
        </div>
  );
};

export default AboutOverlay;
