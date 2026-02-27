import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Work } from '@/data/works';

interface ArtworkDetailProps {
  work: Work | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArtworkDetail = ({ work, isOpen, onClose }: ArtworkDetailProps) => {
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const storiaContentRef = useRef<HTMLDivElement>(null);
  const [storiaIndex, setStoriaIndex] = useState(0);

  // Reset index when work changes
  useLayoutEffect(() => {
    setStoriaIndex(0);
  }, [work?.id]);

  const navigateStoria = useCallback((direction: 'prev' | 'next') => {
    if (!work || !storiaContentRef.current) return;
    const maxIndex = work.storie.length - 1;
    const newIndex = direction === 'next'
      ? Math.min(storiaIndex + 1, maxIndex)
      : Math.max(storiaIndex - 1, 0);
    if (newIndex === storiaIndex) return;

    gsap.to(storiaContentRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setStoriaIndex(newIndex);
        gsap.to(storiaContentRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      },
    });
  }, [work, storiaIndex]);

  useLayoutEffect(() => {
    if (!leftPanelRef.current || !rightPanelRef.current) return;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const ctx = gsap.context(() => {
      timelineRef.current = gsap.timeline();

      if (isOpen && work) {
        timelineRef.current
          .fromTo(leftPanelRef.current, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' })
          .fromTo(rightPanelRef.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.7');
      } else {
        timelineRef.current
          .to(leftPanelRef.current, { x: -40, opacity: 0, duration: 0.5, ease: 'power2.in' })
          .to(rightPanelRef.current, { x: 40, opacity: 0, duration: 0.5, ease: 'power2.in' }, '-=0.4');
      }
    });

    return () => ctx.revert();
  }, [isOpen, work]);

  useLayoutEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  if (!work) return null;

  const currentStoria = work.storie[storiaIndex];

  return (
    <>
      {/* Left panel - Didascalia */}
      <div
        id="didascalia"
        ref={leftPanelRef}
        className="fixed top-1/2 -translate-y-1/2 z-50 pointer-events-auto"
        style={{
          left: 'calc(50% - 500px)',
          width: '280px',
          opacity: 0,
        }}
      >
        <div className="bg-museum-cream/95 backdrop-blur-md rounded-lg shadow-2xl p-6 border border-museum-gold/20">
          <div className="space-y-3 text-center">
            <p className="font-display text-sm text-museum-gold tracking-widest uppercase">
              {work.artist}
            </p>
             <h2 className="font-display text-xl text-foreground tracking-wide">
              {work.title}
            </h2>
            <h3 className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {work.year}
            </h3>
            <p className="text-xs tracking-[0.3em] text-muted-foreground">
              {work.technique}
            </p>
            <div className="w-10 h-px bg-museum-gold/40 mx-auto" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <strong>{work.collection} {work.museum}</strong>
            </span>
            <div className="w-10 h-px bg-museum-gold/40 mx-auto" />
              <p className="text-sm text-foreground/80 leading-relaxed">
              {work.description}
            </p>
          </div>
        </div>
      </div>

      {/* Right panel - Testi */}
      <div
        id="testi"
        ref={rightPanelRef}
        className="fixed top-1/2 -translate-y-1/2 z-50 pointer-events-auto"
        style={{
          right: 'calc(50% - 700px)',
          width: '480px',
          opacity: 0,
        }}
      >
        <div className="bg-museum-cream/95 backdrop-blur-md rounded-lg shadow-2xl p-6 border border-museum-gold/20">
          <button
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-museum-wall/50 hover:bg-museum-wall transition-colors duration-300"
            onClick={onClose}
            aria-label="Chiudi dettaglio"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-foreground/70"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="space-y-3">
            <h3 className="font-display text-sm uppercase tracking-widest text-muted-foreground">
              STORIE
            </h3>
            <div className="storie-interattive" ref={storiaContentRef}>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {currentStoria.paragrafo.split('\n').map((line, index) => (
                  <span key={index}>{line}<br /></span>))}
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed mt-2">
                {currentStoria.autore}
              </p>
            </div>
            {work.storie.length > 1 && (
              <div className="flex items-center justify-center gap-4 pt-1">
                <button
                  onClick={() => navigateStoria('prev')}
                  disabled={storiaIndex === 0}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-museum-wall/50 hover:bg-museum-wall transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Storia precedente"
                >
                  <ChevronLeft className="w-4 h-4 text-foreground/70" />
                </button>
                <span className="text-xs text-muted-foreground tracking-widest">
                  {storiaIndex + 1} / {work.storie.length}
                </span>
                <button
                  onClick={() => navigateStoria('next')}
                  disabled={storiaIndex === work.storie.length - 1}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-museum-wall/50 hover:bg-museum-wall transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Storia successiva"
                >
                  <ChevronRight className="w-4 h-4 text-foreground/70" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtworkDetail;
