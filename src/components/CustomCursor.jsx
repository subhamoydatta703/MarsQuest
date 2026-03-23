import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.1, ease: "power3" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.1, ease: "power3" });
    
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.4, ease: "power3", delay: 0.05 });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.4, ease: "power3", delay: 0.05 });

    const mouseMove = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) return null;

  return (
    <>
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 border-[1.5px] border-blue-400/60 rounded-full z-[10001] pointer-events-none mix-blend-screen shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-transform duration-200 ease-out"
        id="cursor-ring"
      />
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-white rounded-full z-[10002] pointer-events-none shadow-[0_0_5px_rgba(255,255,255,0.8)]"
      />
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          body * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
