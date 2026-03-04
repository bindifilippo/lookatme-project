import { forwardRef } from 'react';
import type { Work } from '@/data/works';

interface ArtworkProps {
  work: Work;
  isActive: boolean;
  isZoomed: boolean;
  onSelect: (work: Work) => void;
}

const Artwork = forwardRef<HTMLDivElement, ArtworkProps>(
  ({ work, isActive, isZoomed, onSelect }, ref) => {
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isZoomed) {
        onSelect(work);
      }
    };
    
    return (
      <div
        ref={ref}
        className="absolute cursor-pointer group "
        style={{
          left: `${work.xPercent}%`,
          top: `${work.yPercent}%`,
          width: `${work.widthPercent}%`,
          height: `${work.heightPercent}%`,
          zIndex: isZoomed && isActive ? 20 : 1,
          position: 'absolute',
        }}
        onClick={handleClick}
      >
        {/* Frame */}
        <div className={`relative overflow-hidden transition-transform duration-500 ease-out ${!isZoomed ? 'group-hover:scale-[1.03]' : ''}`}>
          {/* Image */}
          <div className="artwork-frame-inner">
            <img
              src={work.image}
              alt={work.title}
              className="object-cover"
              draggable={false}
              decoding="async"
              loading="lazy"
              width={300}
              height={300}
            />
          </div>
          
          {/* Click indicator - centered, breathing animation */}
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out pointer-events-none ${
              isActive || isZoomed ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="click-indicator" />
          </div>
        </div>

        {/* Hover label - only when not zoomed */}
        {!isZoomed && (
          <div className="absolute -bottom-100 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <p className="font-display text-sm text-foreground/80 bg-museum-cream/90 px-3 py-1 rounded-sm shadow-sm">
              {work.title}
            </p>
          </div>
        )}
      </div>
    );
  }
);

Artwork.displayName = 'Artwork';

export default Artwork;
