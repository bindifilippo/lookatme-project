import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AboutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutOverlay = ({ isOpen, onClose }: AboutOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-500 ease-in-out ${
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Content panel */}
      <div
        className={`relative w-full h-full overflow-y-auto transition-all duration-500 ease-in-out ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{ backgroundColor: 'hsl(40 35% 92%)' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-[10000] p-2 rounded-full hover:bg-black/10 transition-colors duration-200"
          aria-label="Chiudi"
        >
          <X className="w-10 h-10 text-foreground/70" />
        </button>

        {/* Empty content area */}
        <div className="w-full min-h-full p-8">
          {/* Contenuto vuoto */}
        </div>
      </div>
    </div>
  );
};

export default AboutOverlay;
