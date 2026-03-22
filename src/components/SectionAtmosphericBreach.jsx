import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function SectionAtmosphericBreach() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.to('.moon-graphic', {
      yPercent: -150,
      rotation: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2
      }
    });

    gsap.from('.breach-text', {
      y: 50,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      scrollTrigger: {
        trigger: container.current,
        start: 'top 50%',
        end: 'center center',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.utils.toArray('.moon-story-card').forEach((card, i) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        delay: i * 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 40%',
          end: 'center center',
          toggleActions: 'play none none reverse'
        }
      });
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-[150vh] flex items-center justify-start px-4 py-16 sm:px-6 md:p-24 z-10 overflow-visible -mt-[12vh] md:-mt-[20vh]">
      <div 
        className="moon-graphic absolute top-[14%] -right-[22vw] w-[70vw] h-[70vw] sm:top-[18%] sm:-right-[14vw] sm:w-[58vw] sm:h-[58vw] md:top-[20%] md:-right-[10vw] md:w-[50vw] md:h-[50vw] rounded-full z-0 overflow-hidden bg-[#111]
                   shadow-[inset_-30px_-30px_100px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.1)] will-change-transform"
        style={{
          backgroundImage: "url('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'translateZ(0)'
        }}
      >
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,_transparent_0%,_rgba(0,0,0,0.8)_80%,_rgba(0,0,0,0.95)_100%)] pointer-events-none" />
      </div>

      <div className="max-w-2xl z-10 relative w-full pt-28 sm:pt-16 md:pt-0 md:ml-[300px]">
        <h2 className="breach-text text-3xl sm:text-4xl md:text-6xl font-light mb-6 md:mb-8 drop-shadow-xl">
          Lunar Flyby.<br />
          <span className="text-gray-300 font-bold italic">Leaving the cradle.</span>
        </h2>
        <p className="breach-text text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl backdrop-blur-sm p-4 rounded-xl border border-white/5 bg-black/20 mb-6">
          As the roar of the engines fades into the silent hum of the void, Earth's gravity releases its grip. The moon passes by in silence — our last familiar neighbor before the vast excursion into the unknown.
        </p>
        
        <div className="breach-text grid grid-cols-1 sm:grid-cols-3 gap-4 border border-white/10 bg-black/40 rounded-xl p-4 backdrop-blur-md">
          <div className="flex flex-col">
             <span className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Lunar Distance</span>
             <span className="font-mono text-sm text-white">384,400 km</span>
          </div>
          <div className="flex flex-col border-t pt-4 sm:pt-0 sm:border-t-0 border-white/10 sm:border-l sm:pl-4">
             <span className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Gravity Assist</span>
             <span className="font-mono text-sm text-green-400">+1.2 km/s</span>
          </div>
          <div className="flex flex-col border-t pt-4 sm:pt-0 sm:border-t-0 border-white/10 sm:border-l sm:pl-4">
             <span className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Surface Temp</span>
             <span className="font-mono text-sm text-white">-173°C to 127°C</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <div className="moon-story-card flex-1 bg-white/5 backdrop-blur-md border border-gray-400/15 rounded-2xl p-5 shadow-[0_8px_32px_rgba(200,200,220,0.08)]">
            <h3 className="text-xs text-gray-300 font-mono uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse" />
              Earth's Companion
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">
              Born from a cataclysmic collision 4.5 billion years ago, the Moon has been Earth's silent guardian — stabilizing our axial tilt, driving the tides, and lighting our darkest nights.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex flex-col bg-black/30 rounded-lg p-2">
                <span className="text-gray-500 uppercase tracking-wider">Diameter</span>
                <span className="font-mono text-white">3,474 km</span>
              </div>
              <div className="flex flex-col bg-black/30 rounded-lg p-2">
                <span className="text-gray-500 uppercase tracking-wider">Orbital Period</span>
                <span className="font-mono text-white">27.3 days</span>
              </div>
            </div>
          </div>

          <div className="moon-story-card flex-1 bg-white/5 backdrop-blur-md border border-blue-300/10 rounded-2xl p-5 shadow-[0_8px_32px_rgba(150,180,255,0.08)]">
            <h3 className="text-xs text-blue-300 font-mono uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse" />
              Gateway to the Cosmos
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              The Artemis program envisions the Moon as our cosmic launchpad. Lunar ice could fuel deep-space ships. A permanent base would make Mars — and beyond — reachable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
