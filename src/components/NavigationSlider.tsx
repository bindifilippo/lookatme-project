import { works } from '@/data/works';

interface NavigationSliderProps {
  activeIndex: number | null;
  onNavigate: (index: number) => void;
  onReset: () => void;
}

const NavigationSlider = ({ activeIndex, onNavigate, onReset }: NavigationSliderProps) => {
  return (
    <div className="nav-slider">
      {/* Home button */}
      <button
        onClick={onReset}
        className="w-4 h-4 rounded-sm bg-muted hover:bg-museum-gold-light transition-all duration-300 flex items-center justify-center mr-2"
        title="Vista panoramica"
      >
        <svg 
          width="10" 
          height="10" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className="text-foreground/70"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </button>

      {/* Separator */}
      <div className="w-px h-4 bg-border" />

      {/* Dots */}
      {works.map((work, index) => (
        <button
          key={work.id}
          onClick={() => onNavigate(index)}
          className={`nav-dot ${activeIndex === index ? 'active' : ''}`}
          title={work.title}
          aria-label={`Vai a ${work.title}`}
        />
      ))}
    </div>
  );
};

export default NavigationSlider;
