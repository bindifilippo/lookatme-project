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
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Zoom to specific artwork (center it and scale)
  const zoomToArtwork = useCallback((index: number) => {
    const artworkEl = artworkRefs.current[index];
    const corridorEl = corridorRef.current;
    if (!artworkEl || !corridorEl) return;

    const work = works[index];
    setActiveWork(work);
    setActiveIndex(index);
    setIsZoomed(true);

    // Calculate the center position
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Artwork center in percentage
    const artworkCenterX = work.xPercent + work.widthPercent / 2;
    const artworkCenterY = work.yPercent + work.heightPercent / 2;
    
    // Calculate translation to center the artwork
    const translateX = (50 - artworkCenterX);
    const translateY = (50 - artworkCenterY);
    
    // Scale factor for zoom effect
    const scale = 2.5;

    gsap.to(corridorEl, {
      scale: scale,
      x: `${translateX * scale}%`,
      y: `${translateY * scale}%`,
      duration: 1.5,
      ease: 'power2.inOut',
    });
  }, []);

  // Navigate to next/previous artwork while zoomed
  const navigateWhileZoomed = useCallback((index: number) => {
    if (index < 0) {
      // Before first artwork - exit zoom
      resetView();
      return;
    }
    if (index >= works.length) {
      // After last artwork - exit zoom
      resetView();
      return;
    }
    zoomToArtwork(index);
  }, []);

  // Reset view to panoramic
  const resetView = useCallback(() => {
    const corridorEl = corridorRef.current;
    if (!corridorEl) return;

    setIsDetailOpen(false);

    gsap.to(corridorEl, {
      scale: 1,
      x: 0,
      y: 0,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => {
        setActiveIndex(null);
        setActiveWork(null);
        setIsZoomed(false);
      }
    });
  }, []);

  // Handle artwork click
  const handleArtworkClick = useCallback((work: Work) => {
    const index = works.findIndex(w => w.id === work.id);
    zoomToArtwork(index);
  }, [zoomToArtwork]);

  // Handle slider navigation
  const handleSliderNavigate = useCallback((index: number) => {
    if (isZoomed) {
      navigateWhileZoomed(index);
    } else {
      zoomToArtwork(index);
    }
  }, [isZoomed, navigateWhileZoomed, zoomToArtwork]);

  // Toggle detail view (ReadMe)
  const toggleDetail = useCallback(() => {
    setIsDetailOpen(prev => !prev);
  }, []);

  // Close detail
  const closeDetail = useCallback(() => {
    setIsDetailOpen(false);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden"
    >
      {/* Museum wall background - transformable container */}
      <div
        ref={corridorRef}
        className="absolute inset-0 origin-center"
        style={{
          backgroundImage: `url(${museumWall})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      >
        {/* Artworks positioned as percentages */}
        {works.map((work, index) => (
          <Artwork
            key={work.id}
            ref={(el) => (artworkRefs.current[index] = el)}
            work={work}
            isActive={activeWork?.id === work.id}
            isZoomed={isZoomed && activeWork?.id === work.id}
            onSelect={handleArtworkClick}
            onReadMe={toggleDetail}
          />
        ))}
      </div>

      {/* Overlay for dimming when zoomed */}
      <div 
        className={`fixed inset-0 bg-black/30 transition-opacity duration-700 pointer-events-none ${isZoomed ? 'opacity-100' : 'opacity-0'}`} 
      />

      {/* Artwork detail panel */}
      <ArtworkDetail
        work={activeWork}
        isOpen={isDetailOpen}
        onClose={closeDetail}
      />

      {/* Navigation slider */}
      <NavigationSlider
        activeIndex={activeIndex}
        isZoomed={isZoomed}
        onNavigate={handleSliderNavigate}
        onReset={resetView}
      />

      {/* Instructions - hide when zoomed */}
      <div className={`fixed top-8 left-1/2 -translate-x-1/2 pointer-events-none z-10 transition-opacity duration-500 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}>
        <p className="font-display text-base text-foreground/70 tracking-wide bg-museum-cream/80 px-6 py-2 rounded-full shadow-sm backdrop-blur-sm">
          Clicca su un'opera per i dettagli
        </p>
      </div>
    </div>
  );
};

export default Scene;
