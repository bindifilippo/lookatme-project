import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
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

  useLayoutEffect(() => {
    if (!leftPanelRef.current || !rightPanelRef.current) return;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const ctx = gsap.context(() => {
      timelineRef.current = gsap.timeline();

      if (isOpen && work) {
        timelineRef.current
          .fromTo(
            leftPanelRef.current,
            { x: -60, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
          )
          .fromTo(
            rightPanelRef.current,
            { x: 60, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.7'
          );
      } else {
        timelineRef.current
          .to(leftPanelRef.current, {
            x: -40, opacity: 0, duration: 0.5, ease: 'power2.in',
          })
          .to(rightPanelRef.current, {
            x: 40, opacity: 0, duration: 0.5, ease: 'power2.in',
          }, '-=0.4');
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

  return (
    <>
      {/* Left panel - Didascalia */}
      <div
        id="didascalia"
        ref={leftPanelRef}
        className="fixed top-1/2 -translate-y-1/2 z-50 pointer-events-auto"
        style={{
          left: 'calc(50% - 340px)',
          width: '280px',
          opacity: 0,
        }}
      >
        <div className="bg-museum-cream/95 backdrop-blur-md rounded-lg shadow-2xl p-6 border border-museum-gold/20">
          <div className="space-y-3 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {work.year}
            </span>
            <h2 className="font-display text-xl text-foreground tracking-wide">
              {work.title}
            </h2>
            <p className="font-display text-sm text-museum-gold tracking-widest uppercase">
              {work.artist}
            </p>
            <div className="w-10 h-px bg-museum-gold/40 mx-auto" />
          </div>
        </div>
      </div>

      {/* Right panel - Testi */}
      <div
        id="testi"
        ref={rightPanelRef}
        className="fixed top-1/2 -translate-y-1/2 z-50 pointer-events-auto"
        style={{
          right: 'calc(50% - 340px)',
          width: '280px',
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
              Descrizione
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {work.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtworkDetail;
