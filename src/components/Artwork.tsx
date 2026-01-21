import { forwardRef } from 'react';
import type { Work } from '@/data/works';

interface ArtworkProps {
  work: Work;
  isActive: boolean;
  onSelect: (work: Work) => void;
}

const Artwork = forwardRef<HTMLDivElement, ArtworkProps>(
  ({ work, isActive, onSelect }, ref) => {
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
        onClick={() => onSelect(work)}
      >
        {/* Frame */}
        <div className="artwork-frame relative w-full h-full overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          {/* Image */}
          <div className="artwork-frame-inner w-full h-full">
            <img
              src={work.image}
              alt={work.title}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
          
          {/* Hotspot pin - always visible, pulses on hover */}
          {!isActive && (
            <div className="hotspot-pin opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          )}
        </div>

        {/* Hover label */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <p className="font-display text-sm text-foreground/80 bg-museum-cream/90 px-3 py-1 rounded-sm shadow-sm">
            {work.title}
          </p>
        </div>
      </div>
    );
  }
);

Artwork.displayName = 'Artwork';

export default Artwork;
