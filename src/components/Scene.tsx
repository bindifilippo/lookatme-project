import { useRef, useLayoutEffect, useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { works, type Work } from '@/data/works';
import Artwork from './Artwork';
import NavigationSlider from './NavigationSlider';
import ArtworkDetail from './ArtworkDetail';
import AboutOverlay from './AboutOverlay';
const museumWall = '/museum-wall-clean.jpg';

// Fixed design dimensions - the "canvas" never changes, only scales
const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

const Scene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const corridorRef = useRef<HTMLDivElement>(null);
  const artworkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [viewScale, setViewScale] = useState(1);
  
  const [activeWork, setActiveWork] = useState<Work | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Zoom to specific artwork (center it and scale)
  const zoomToArtwork = useCallback((index: number) => {
    const artworkEl = artworkRefs.current[index];
    const corridorEl = corridorRef.current;
    if (!artworkEl || !corridorEl) return;

    const work = works[index];
    setActiveWork(work);
    setActiveIndex(index);
    setIsZoomed(true);

    // Artwork dimensions in design-canvas pixels
    const artworkW = (work.widthPercent / 100) * DESIGN_WIDTH;
    const artworkH = (work.heightPercent / 100) * DESIGN_HEIGHT;

    // Viewport in design-canvas units (undo the viewScale)
    const vpW = window.innerWidth / viewScale;
    const vpH = window.innerHeight / viewScale;

    // Padding so the artwork never touches the window edges (10% margin each side)
    const margin = 0.10;
    const availW = vpW * (1 - margin * 2);
    const availH = vpH * (1 - margin * 2);

    // Scale to fit artwork inside the available area, capped at 3.5
    const scale = Math.min(availW / artworkW, availH / artworkH, 3.5);

    // Artwork center in percentage of design canvas
    const artworkCenterX = work.xPercent + work.widthPercent / 2;
    const artworkCenterY = work.yPercent + work.heightPercent / 2;

    // Translation to center the artwork (in % of corridor)
    const translateX = (50 - artworkCenterX);
    const translateY = (50 - artworkCenterY);

    gsap.to(corridorEl, {
      scale: scale,
      x: `${translateX * scale}%`,
      y: `${translateY * scale}%`,
      duration: 1.5,
      ease: 'power2.inOut',
    });
  }, [viewScale]);

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

  // Compute uniform scale to fit design canvas into viewport
  useEffect(() => {
    const updateScale = () => {
      const scaleX = window.innerWidth / DESIGN_WIDTH;
      const scaleY = window.innerHeight / DESIGN_HEIGHT;
      setViewScale(Math.min(scaleX, scaleY));
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden flex items-center justify-center"
      style={{ background: '#1a1410' }}
    >
      {/* Uniform scaling wrapper - scales the entire scene as one unit */}
      <div
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${viewScale})`,
          transformOrigin: 'center center',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* Museum wall background - transformable container */}
        <div
          ref={corridorRef}
          className={`absolute inset-0 origin-center ${isZoomed ? 'artwork-zoomed' : ''}`}
          style={{
            willChange: 'transform',
          }}
        >
          {/* Museum wall as <img> for LCP discoverability */}
          <img
            src={museumWall}
            alt=""
            fetchPriority="high"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
          />
          {/* Dark overlay when artwork is selected */}
          {isZoomed && (
            <div
              className="absolute inset-0 bg-black/40 transition-opacity duration-500"
              style={{ zIndex: 10 }}
            />
          )}

          {/* Artworks positioned as percentages of the fixed design canvas */}
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

          {/* Museum plaque */}
           
          <div
            className="absolute"
            style={{
              left: '3%',
              top: '8%',
              width: '20%',
              height: '8%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/*  
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(145deg, hsl(38 65% 45%), hsl(35 70% 30%) 30%, hsl(38 65% 45%) 50%, hsl(35 70% 30%) 70%, hsl(40 55% 60%))',
                borderRadius: '4px',
                padding: '6px',
                //boxShadow: '0 8px 30px hsl(30 20% 15% / 0.4), inset 0 1px 0 hsl(40 55% 60% / 0.5)',
              }}
            > </div>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#ffffff',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 2px 10px hsl(30 20% 5% / 0.1)',
                }}
              ></div>
            */}
                <p id="about" className="pinyon-script-regular text-7xl" onClick={() => setIsAboutOpen(true)}>Scopri di più</p>
          </div>
       
        </div>

        {/* Navigation slider - inside scaling wrapper */}
        <NavigationSlider
          activeIndex={activeIndex}
          isZoomed={isZoomed}
          onNavigate={handleSliderNavigate}
          onReset={resetView}
        />
      </div>

      {/* Artwork detail panel */}
      <ArtworkDetail
        work={activeWork}
        isOpen={isDetailOpen}
        onClose={closeDetail}
      />

      {/* About overlay */}
      <AboutOverlay isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
};

export default Scene;
