import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import type { Work } from '@/data/works';

interface ArtworkDetailProps {
  work: Work | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArtworkDetail = ({ work, isOpen, onClose }: ArtworkDetailProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (!panelRef.current || !contentRef.current) return;

    // Kill previous animation
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const ctx = gsap.context(() => {
      timelineRef.current = gsap.timeline();

      if (isOpen && work) {
        timelineRef.current
          .set(panelRef.current, { visibility: 'visible' })
          .fromTo(
            contentRef.current,
            { y: 50, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 1, 
              ease: 'power2.out' 
            }
          )
          .fromTo(
            '.detail-text',
            { y: 20, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.8, 
              stagger: 0.15, 
              ease: 'power2.out' 
            },
            '-=0.6'
          );
      } else {
        timelineRef.current
          .to('.detail-text', { 
            y: 10, 
            opacity: 0, 
            duration: 0.4, 
            stagger: 0.05 
          })
          .to(contentRef.current, { 
            y: 30, 
            opacity: 0, 
            duration: 0.5, 
            ease: 'power2.in' 
          }, '-=0.2')
          .set(panelRef.current, { visibility: 'hidden' });
      }
    });

    return () => ctx.revert();
  }, [isOpen, work]);

  // Cleanup on unmount
  useLayoutEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  if (!work) return null;

  return (
    <div 
      ref={panelRef} 
      className="fixed inset-0 flex items-end justify-center pointer-events-none z-50"
      style={{ visibility: 'hidden' }}
    >
      {/* Overlay click to close */}
      <div 
        className="absolute inset-0 pointer-events-auto"
        onClick={onClose}
      />

      {/* Content panel - emerges from bottom center */}
      <div 
        ref={contentRef}
        className="relative pointer-events-auto mb-24 max-w-lg mx-4"
      >
        {/* Glassmorphism card */}
        <div className="bg-museum-cream/90 backdrop-blur-md rounded-lg shadow-2xl p-8 border border-museum-gold/20">
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-museum-wall/50 hover:bg-museum-wall transition-colors duration-300"
            onClick={onClose}
            aria-label="Chiudi dettaglio"
          >
            <svg 
              width="14" 
              height="14" 
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

          {/* Artwork info */}
          <div className="space-y-4 text-center">
            <div className="detail-text">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {work.year}
              </span>
            </div>

            <h2 className="detail-text font-display text-2xl text-foreground tracking-wide">
              {work.title}
            </h2>

            <p className="detail-text font-display text-sm text-museum-gold tracking-widest uppercase">
              {work.artist}
            </p>

            <div className="detail-text w-12 h-px bg-museum-gold/40 mx-auto" />

            <p className="detail-text text-sm text-foreground/80 leading-relaxed max-w-md mx-auto">
              {work.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
