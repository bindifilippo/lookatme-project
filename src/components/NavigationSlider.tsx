import { works } from '@/data/works';
import homeSvg from '@/assets/home.svg';

interface NavigationSliderProps {
  activeIndex: number | null;
  isZoomed: boolean;
  onNavigate: (index: number) => void;
  onReset: () => void;
}

const NavigationSlider = ({ activeIndex, isZoomed, onNavigate, onReset }: NavigationSliderProps) => {
  return (
    <div className="nav-slider mb-8">
      {/* Home button */}
      <button
        onClick={onReset}
        className={`w-14 h-14 rounded-3xl transition-all duration-300 flex items-center justify-center mr-2 ${
          isZoomed ? 'bg-muted hover:bg-museum-gold-light' : 'bg-museum-gold/50'
        }`
      }
        title="Vista panoramica"
      >
        <img
          src={homeSvg}
          alt="Home"
          className="w-24 h-24 object-contain"
        />
      </button>

      {/* Separator */}
      <div className="w-px h-4 bg-border" />

      {/* Dots */}
      {works.map((work, index) => (
        <button
          key={work.id}
          onClick={() => onNavigate(index)}
          className={`nav-dot ${activeIndex === index ? 'active' : ''} ${isZoomed ? 'scale-110' : ''}`}
          title={work.title}
          aria-label={`Vai a ${work.title}`}
        />
      ))}

      {/* Zoomed indicator 
      {isZoomed && activeIndex !== null && (
        <div className="ml-3 text-xs font-display text-foreground/60 tracking-wide">
          {activeIndex + 1} / {works.length}
        </div>
      )}*/}
    </div>
  );
};

export default NavigationSlider;
