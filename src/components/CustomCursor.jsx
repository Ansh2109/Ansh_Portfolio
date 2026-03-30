import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const glowRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const glow = glowRef.current;
    const trail = trailRef.current;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Smooth interpolation
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;

      if (cursor) {
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      }
      
      if (glow) {
        glow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      if (trail) {
        // Subtle lag for the trail
        trail.style.transform = `translate3d(${cursorX - dx * 0.5}px, ${cursorY - dy * 0.5}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* Cyber Glow following mouse exactly */}
      <div 
        ref={glowRef}
        className="fixed top-0 left-0 w-32 h-32 bg-green-500/10 rounded-full pointer-events-none z-[99] blur-3xl"
      />

      {/* Trailing 'Digital Ghost' */}
      <div 
        ref={trailRef}
        className="fixed top-0 left-0 w-4 h-4 border border-green-500/30 rounded-sm pointer-events-none z-[100] transition-opacity duration-300"
      />

      {/* Main Cyber Ship */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[101]"
      >
        <div className="relative flex flex-col items-center">
          {/* Triangular Cyber Ship */}
          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[15px] border-b-green-400 shadow-[0_0_15px_rgba(0,255,65,0.8)]" />
          
          {/* Digital Wings */}
          <div className="absolute top-2 -left-2 w-1 h-3 bg-green-500/50 skew-x-[20deg]" />
          <div className="absolute top-2 -right-2 w-1 h-3 bg-green-500/50 -skew-x-[20deg]" />
          
          {/* Data Pulse */}
          <div className="mt-1 w-1 h-1 bg-green-300 rounded-full animate-ping" />
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
