import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import DeepSpaceObject from './DeepSpaceObject';

export default function SectionDeepSpace() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.utils.toArray('.deepspace-card').forEach((card, i) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 50%',
          end: 'center center',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-[150vh] flex items-center justify-end px-4 py-8 sm:px-6 md:p-24 z-10 overflow-hidden">
      <DeepSpaceObject type="asteroid" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030610]/40 to-transparent pointer-events-none" />
      
      <div className="max-w-2xl z-10 relative w-full pt-12 md:pr-[10vw] flex flex-col items-end text-right">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-light mb-6 md:mb-8 drop-shadow-xl text-white">
          The Asteroid Belt.<br />
          <span className="text-gray-300 font-bold italic">Navigating the debris.</span>
        </h2>
        
        <p className="deepspace-card text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl glass-panel p-4 rounded-xl mb-6">
          Between Mars and Jupiter lies a vast ring of primordial rubble. Though mostly empty space, navigating near these ancient rocks requires precise maneuvering.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-6 w-full justify-end">
          <div className="deepspace-card w-full sm:w-80 glass-panel rounded-2xl p-5 shadow-[0_8px_32px_rgba(200,200,220,0.08)] animate-float text-left">
            <h3 className="text-xs text-blue-300 font-mono uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse" />
              Rubble Piles
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Most asteroids aren't solid rock, but loose collections of boulders held together by weak gravity. A collision would scatter them like billiard balls.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
