import React, { useRef, useLayoutEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Work } from '@/data/works';

function renderWithBreaks(text?: string) {
  if (!text) return null;

  const lines = text.split("\n");
  return lines.map((line, i) => (
    <React.Fragment key={i}>
      {line.trim()}
      {i < lines.length - 1 && <br />}
    </React.Fragment>
  ));
}

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

  const safeIndex = Math.min(storiaIndex, work.storie.length - 1);
  const currentStoria = work.storie[safeIndex];
  if (!currentStoria) return null;
  

  return (
    <>
      {/* Left panel - Didascalia */}
      <div
        id="didascalia"
        ref={leftPanelRef}
        className="fixed top-1/2 -translate-y-1/2 z-50 pointer-events-auto"
        style={{
          left: 'calc(50% - 630px)',
          width: '380px',
          opacity: 0,
        }}
      >
        <div className="bg-museum-cream/95 backdrop-blur-md rounded-lg shadow-2xl p-6 border-[6px] border-museum-rame">
          <div className="space-y-3">
            <div className="space-y-3 text-center">
                <p className="font-display text-sm text-museum-gold tracking-widest uppercase">
                  {work.artist}
                </p>
                <h3 className="font-display text-xl text-foreground/80 tracking-wide">
                  {work.title}
                </h3>
                <div className="w-10 h-px bg-museum-gold/40 mx-auto" />
                <h3 className="tracking-[0.1em] text-muted-foreground">
                  {work.year}
                </h3>
                <h3 className="tracking-[0.1em] text-muted-foreground">
                  {work.technique}
                </h3>
                <div className="w-10 h-px bg-museum-gold/40 mx-auto" />
                  <h4 className="tracking-[0.2em] text-muted-foreground">
                    <strong>{work.collection} {work.museum}</strong>
                </h4>
            </div>
            <div className="w-10 h-px bg-museum-gold/40 mx-auto" />
              <p className=" text-foreground/80 leading-relaxed text-justify font-moderno ">
             {renderWithBreaks(work.description)}
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
          right: 'calc(50% - 730px)',
          width: '480px',
          opacity: 0,
        }}
      >
        <div className="bg-museum-cream/95 backdrop-blur-md rounded-lg shadow-2xl p-6 border-[6px] border-museum-rame">
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
            <div>
              <p className="text-lg font-moderno font-bold text-foreground/80">L’interpretazione delle protagoniste</p>
            </div>
            <div className="storie-interattive" ref={storiaContentRef}>
              <p className="text-foreground/80 leading-relaxed text-justify font-moderno ">
                {currentStoria.paragrafo.split('\n').map((line, index) => (
                  <span key={index}>{line}<br /></span>))}
              </p>
              <p className="text-foreground/80 leading-relaxed mt-2 font-moderno">
                <strong>{currentStoria.autore}</strong>
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
