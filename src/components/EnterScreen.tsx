import { useState, useRef } from 'react';
import { gsap } from 'gsap';

interface EnterScreenProps {
  onEnter: () => void;
}

const EnterScreen = ({ onEnter }: EnterScreenProps) => {
  const screenRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (!screenRef.current) return;
    gsap.to(screenRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      onComplete: onEnter,
    });
  };

  return (
    <div
      id="enter"
      ref={screenRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'hsl(30, 20%, 10%)' }}
    >
      <h1
        className=" text-6xl md:text-8xl tracking-widest mb-4"
        style={{
          fontFamily: 'Pinyon Script',
          color: 'hsl(42, 75%, 50%)',
        }}
      >
        Look At Me
      </h1>
      <p
        className="text-xl md:text-2xl italic mb-12"
        style={{
          fontFamily: 'var(--font-body)',
          color: 'hsl(40, 30%, 75%)',
        }}
      >
       {/*Che bella la vita*/}
      </p>
      <button
        onClick={handleEnter}
        className="px-10 py-3 rounded-full text-lg tracking-wide transition-all duration-300 hover:scale-105"
        style={{
          fontFamily: 'Montserrat',
          border: '1px solid hsl(42, 75%, 50%)',
          color: 'hsl(42, 75%, 50%)',
          background: 'transparent',
        }}
      >
        Entra
      </button>
    </div>
  );
};

export default EnterScreen;
