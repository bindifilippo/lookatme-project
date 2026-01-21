import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { works, type Work } from '@/data/works';
import Artwork from './Artwork';
import NavigationSlider from './NavigationSlider';
import ArtworkDetail from './ArtworkDetail';
import museumWall from '@/assets/museum-wall-clean.jpg';

const Scene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const corridorRef = useRef<HTMLDivElement>(null);
  const artworkRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [activeWork, setActiveWork] = useState<Work | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isOverlayActive, setIsOverlayActive] = useState(false);

  // Navigate to specific artwork (center it in viewport)
  const navigateToArtwork = useCallback((index: number) => {
    const artworkEl = artworkRefs.current[index];
    if (!artworkEl) return;

    setActiveIndex(index);

    // Highlight animation
    gsap.to(artworkEl, {
      scale: 1.05,
      duration: 0.5,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1,
    });
  }, []);

  // Reset view
  const resetView = useCallback(() => {
    setActiveIndex(null);
    setActiveWork(null);
    setIsDetailOpen(false);
    setIsOverlayActive(false);
  }, []);

  // Select artwork for detail view
  const selectArtwork = useCallback((work: Work) => {
    const index = works.findIndex(w => w.id === work.id);
    const artworkEl = artworkRefs.current[index];
    if (!artworkEl) return;

    setActiveWork(work);
    setActiveIndex(index);
    setIsOverlayActive(true);

    // Slight delay before showing detail
    setTimeout(() => {
      setIsDetailOpen(true);
    }, 300);
  }, []);

  // Close detail
  const closeDetail = useCallback(() => {
    setIsDetailOpen(false);
    setIsOverlayActive(false);
    
    setTimeout(() => {
      setActiveWork(null);
    }, 600);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden"
    >
      {/* Museum wall background */}
      <div
        ref={corridorRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${museumWall})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Artworks positioned as percentages */}
        {works.map((work, index) => (
          <Artwork
            key={work.id}
            ref={(el) => (artworkRefs.current[index] = el)}
            work={work}
            isActive={activeWork?.id === work.id}
            onSelect={selectArtwork}
          />
        ))}
      </div>

      {/* Overlay for dimming */}
      <div className={`museum-overlay ${isOverlayActive ? 'active' : ''}`} onClick={closeDetail} />

      {/* Artwork detail panel */}
      <ArtworkDetail
        work={activeWork}
        isOpen={isDetailOpen}
        onClose={closeDetail}
      />

      {/* Navigation slider */}
      <NavigationSlider
        activeIndex={activeIndex}
        onNavigate={navigateToArtwork}
        onReset={resetView}
      />

      {/* Instructions */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 pointer-events-none z-10">
        <p className="font-display text-base text-foreground/70 tracking-wide bg-museum-cream/80 px-6 py-2 rounded-full shadow-sm backdrop-blur-sm">
          Clicca su un'opera per i dettagli
        </p>
      </div>
    </div>
  );
};

export default Scene;
