import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Rocket, Globe } from 'lucide-react';

export default function JourneyProgress() {
  const lineRef = useRef(null);
  const rocketRef = useRef(null);
  const progressLineRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.to(rocketRef.current, {
      top: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });

    gsap.to(progressLineRef.current, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 h-[60vh] md:h-[70vh] w-12 z-50 flex flex-col items-center pointer-events-none"
    >
      <div className="flex flex-col items-center mb-2">
        <Globe className="text-blue-400 w-6 h-6 z-10 bg-space-900 rounded-full" strokeWidth={1.5} />
        <span className="text-[10px] uppercase font-mono text-blue-400 mt-1">Earth</span>
      </div>

      <div className="relative flex-grow w-full flex justify-center py-2" ref={lineRef}>
        <div className="absolute top-0 bottom-0 w-px bg-white/20 border-dashed border-l border-white/20" />
        <div 
          ref={progressLineRef}
          className="absolute top-0 w-px bg-gradient-to-b from-blue-400 via-accent to-mars-500 origin-top h-full"
          style={{ transform: 'scaleY(0)' }}
        />

        <div 
          ref={rocketRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-space-900 z-20 rounded-full p-1 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          <Rocket className="w-4 h-4 text-accent rotate-180" strokeWidth={2} />
        </div>

        <div className="absolute top-1/4 w-2 h-px bg-white/50 left-1/2" />
        <div className="absolute top-2/4 w-2 h-px bg-white/50 left-1/2" />
        <div className="absolute top-3/4 w-2 h-px bg-white/50 left-1/2" />
      </div>

      <div className="flex flex-col items-center mt-2">
        <span className="text-[10px] uppercase font-mono text-mars-500 mb-1">Mars</span>
        <div className="w-6 h-6 rounded-full bg-[radial-gradient(circle_at_30%_30%,_var(--color-mars-500),_#501000)] shadow-[0_0_15px_rgba(226,90,56,0.3)] z-10" />
      </div>
    </div>
  );
}
