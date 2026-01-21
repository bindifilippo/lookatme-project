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
            { x: '100%', opacity: 0 },
            { 
              x: '0%', 
              opacity: 1, 
              duration: 0.8, 
              ease: 'power3.out' 
            }
          )
          .fromTo(
            '.detail-text',
            { y: 30, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.6, 
              stagger: 0.1, 
              ease: 'power2.out' 
            },
            '-=0.4'
          );
      } else {
        timelineRef.current
          .to('.detail-text', { 
            y: 20, 
            opacity: 0, 
            duration: 0.3, 
            stagger: 0.05 
          })
          .to(contentRef.current, { 
            x: '100%', 
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
      className={`detail-panel ${isOpen ? 'active' : ''}`}
      style={{ visibility: 'hidden' }}
    >
      {/* Overlay click to close */}
      <div 
        className="absolute inset-0 bg-transparent"
        onClick={onClose}
      />

      {/* Content panel */}
      <div 
        ref={contentRef}
        className="detail-content absolute right-0 top-0 h-full w-full max-w-md flex flex-col justify-center"
      >
        {/* Close button */}
        <button 
          className="close-button"
          onClick={onClose}
          aria-label="Chiudi dettaglio"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Artwork info */}
        <div className="space-y-6">
          <div className="detail-text">
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              {work.year}
            </span>
          </div>

          <h2 className="detail-text artwork-title">
            {work.title}
          </h2>

          <p className="detail-text artwork-artist">
            {work.artist}
          </p>

          <div className="detail-text w-16 h-px bg-museum-gold/50" />

          <p className="detail-text artwork-description">
            {work.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
