import { forwardRef } from 'react';
import type { Work } from '@/data/works';

interface ArtworkProps {
  work: Work;
  isActive: boolean;
  isZoomed: boolean;
  onSelect: (work: Work) => void;
  onReadMe: () => void;
}

const Artwork = forwardRef<HTMLDivElement, ArtworkProps>(
  ({ work, isActive, isZoomed, onSelect, onReadMe }, ref) => {
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isZoomed) {
        onSelect(work);
      }
    };

    const handleReadMeClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onReadMe();
    };

    return (
      <div
        ref={ref}
        className="absolute cursor-pointer group"
        style={{
          left: `${work.xPercent}%`,
          top: `${work.yPercent}%`,
          width: `${work.widthPercent}%`,
          height: `${work.heightPercent}%`,
        }}
        onClick={handleClick}
      >
        {/* Frame */}
        <div className={`artwork-frame relative w-full h-full overflow-hidden transition-transform duration-500 ease-out ${!isZoomed ? 'group-hover:scale-[1.03]' : ''}`}>
          {/* Image */}
          <div className="artwork-frame-inner w-full h-full">
            <img
              src={work.image}
              alt={work.title}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
          
          {/* Hotspot pin - only show when not zoomed */}
          {!isActive && !isZoomed && (
            <div className="hotspot-pin opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          )}
        </div>

        {/* Hover label - only when not zoomed */}
        {!isZoomed && (
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <p className="font-display text-sm text-foreground/80 bg-museum-cream/90 px-3 py-1 rounded-sm shadow-sm">
              {work.title}
            </p>
          </div>
        )}

        {/* ReadMe button - only when this artwork is zoomed and focused */}
        {isZoomed && isActive && (
          <div 
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 animate-fade-in"
            style={{ animationDuration: '0.8s', animationDelay: '0.5s', animationFillMode: 'both' }}
          >
            <button
              onClick={handleReadMeClick}
              className="readme-button font-display text-sm tracking-widest uppercase text-foreground/80 bg-museum-cream/95 px-6 py-2 rounded-sm shadow-md backdrop-blur-sm border border-museum-gold/20 hover:bg-museum-cream hover:border-museum-gold/40 transition-all duration-300"
            >
              ReadMe
            </button>
          </div>
        )}
      </div>
    );
  }
);

Artwork.displayName = 'Artwork';

export default Artwork;
