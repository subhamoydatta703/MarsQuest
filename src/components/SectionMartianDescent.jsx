import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MarsRover from './MarsRover';

gsap.registerPlugin(ScrollTrigger);

export default function SectionMartianDescent() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.to('.realistic-mars', {
      yPercent: -40,
      scale: 1.2,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        end: 'bottom bottom',
        scrub: 0.8,
        invalidateOnRefresh: true
      }
    });

    ScrollTrigger.create({
      trigger: container.current,
      start: 'top 80%',
      onEnter: () => {
        const voidSec = document.getElementById('void-section');
        if(voidSec) gsap.set(voidSec, { autoAlpha: 0 });
      },
      onLeaveBack: () => {
        const voidSec = document.getElementById('void-section');
        if(voidSec) gsap.set(voidSec, { autoAlpha: 1 });
      }
    });

    gsap.utils.toArray('.mars-story-card').forEach((card, i) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 1.4,
        delay: i * 0.15,
        ease: 'power2.out',
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
    <section ref={container} className="relative w-full h-[150vh] flex flex-col items-center justify-start pt-20 sm:pt-24 overflow-hidden z-30 bg-gradient-to-b from-transparent via-[#401000]/80 to-[#B73D1E]/40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#E25A38_0%,_transparent_60%)] opacity-20 pointer-events-none" />

      <div className="relative z-50 w-full max-w-xl md:w-[60vw] lg:max-w-3xl p-4 sm:p-6 lg:p-8 text-left flex flex-col items-start pt-[2vh] ml-auto md:mr-8 lg:mr-16">
        <h2 className="text-xs sm:text-sm text-mars-500 font-mono tracking-[0.25em] uppercase mb-4 animate-pulse bg-black/60 px-4 py-1 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(226,90,56,0.6)]">
          Deceleration Burn Commencing
        </h2>
        <h3 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] text-white mb-8">
          Martian Descent
        </h3>
        
        <div className="grid grid-cols-2 gap-4 w-full glass-panel rounded-xl p-4 mb-8">
          <div className="flex flex-col items-center">
             <span className="text-[10px] text-mars-500 uppercase tracking-widest mb-1">Entry Angle</span>
             <span className="font-mono text-white">-14.2°</span>
          </div>
          <div className="flex flex-col items-center border-l border-mars-500/30">
             <span className="text-[10px] text-mars-500 uppercase tracking-widest mb-1">Heat Shield</span>
             <span className="font-mono text-orange-400">2,100 °C</span>
          </div>
          <div className="flex flex-col items-center border-t border-mars-500/30 pt-4">
             <span className="text-[10px] text-mars-500 uppercase tracking-widest mb-1">Max Decel</span>
             <span className="font-mono text-white">9.4 G</span>
          </div>
          <div className="flex flex-col items-center border-t border-mars-500/30 pt-2 sm:pt-4 border-l">
             <span className="text-[8px] sm:text-[10px] text-mars-500 uppercase tracking-widest mb-1 text-center">Mach Regime</span>
             <span className="font-mono text-white text-xs sm:text-base">Hypersonic</span>
          </div>
        </div>

        {/* Mobile: Horizontal scroll, Desktop: Flex row */}
        <div className="flex flex-row md:flex-row overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-4 w-full text-left pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="mars-story-card min-w-[85vw] sm:min-w-0 flex-1 glass-panel rounded-2xl p-4 sm:p-5 animate-float snap-center" style={{animationDelay: '0s'}}>
            <h3 className="text-xs text-mars-500 font-mono uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-mars-500 animate-pulse" />
              The Red Planet
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              Mars — the fourth stone from the Sun. A world of rust-red deserts, towering volcanoes, and canyon systems that dwarf the Grand Canyon.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex flex-col bg-black/30 rounded-lg p-2">
                <span className="text-gray-500 uppercase tracking-wider">Diameter</span>
                <span className="font-mono text-white">6,779 km</span>
              </div>
              <div className="flex flex-col bg-black/30 rounded-lg p-2">
                <span className="text-gray-500 uppercase tracking-wider">Gravity</span>
                <span className="font-mono text-white">3.72 m/s²</span>
              </div>
              <div className="flex flex-col bg-black/30 rounded-lg p-2">
                <span className="text-gray-500 uppercase tracking-wider">Day Length</span>
                <span className="font-mono text-orange-300">24h 37m</span>
              </div>
              <div className="flex flex-col bg-black/30 rounded-lg p-2">
                <span className="text-gray-500 uppercase tracking-wider">Olympus Mons</span>
                <span className="font-mono text-white">21.9 km high</span>
              </div>
            </div>
          </div>

          <div className="mars-story-card min-w-[85vw] sm:min-w-0 flex-1 glass-panel rounded-2xl p-4 sm:p-5 animate-float snap-center" style={{animationDelay: '1.5s'}}>
            <h3 className="text-xs text-orange-400 font-mono uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              A New Home?
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              Subsurface water ice confirmed. Thin CO₂ atmosphere shields from some radiation. A sol nearly matches Earth's day. With ISRU technology, we could manufacture oxygen and fuel from Martian resources.
            </p>
            <p className="text-xs text-gray-500 italic leading-relaxed">
              First hab modules. Then greenhouses. Then domes. In a century, perhaps... terraforming. The red planet could bloom.
            </p>
          </div>
        </div>
      </div>
      <div 
        className="realistic-mars absolute -bottom-[130vw] sm:-bottom-[125vw] md:-bottom-[120vw] left-1/2 -translate-x-1/2 w-[250vw] h-[250vw] sm:w-[220vw] sm:h-[220vw] md:w-[150vw] md:h-[150vw] rounded-[100%] z-0 
                   shadow-[inset_0_-150px_350px_rgba(0,0,0,0.9),inset_0_40px_100px_rgba(255,100,0,0.3)] 
                   overflow-hidden contrast-125 saturate-[1.2] will-change-transform"
        style={{
          backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg')",
          backgroundSize: '106% 106%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,150,50,0.15)_0%,_transparent_60%)] pointer-events-none opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,_rgba(0,0,0,1)_0%,_transparent_75%)] pointer-events-none" />
      </div>
      
      <MarsRover />

      <div className="landing-ui-panel absolute bottom-[2vh] sm:bottom-[5vh] left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] sm:w-11/12 max-w-2xl glass-panel rounded-xl sm:rounded-2xl p-3 sm:p-6 z-40 opacity-0 pointer-events-none scanlines">
        <div className="flex flex-row justify-between items-center gap-2 mb-3 sm:mb-6 border-b border-blue-500/30 pb-2 sm:pb-4 relative overflow-hidden">
          <h3 className="text-sm sm:text-xl md:text-2xl font-mono uppercase tracking-[0.2em] text-blue-400 m-0 leading-none">Touchdown Confirmed</h3>
          <div className="flex items-center gap-1.5 sm:gap-3">
             <span className="text-[8px] sm:text-[10px] text-gray-400 font-mono tracking-widest uppercase hidden sm:block">Systems Nominal</span>
             <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_#22c55e]" />
          </div>
          
          <div className="landing-scanline absolute top-0 left-0 w-full h-0 bg-blue-400/20" />
        </div>
        
        <div className="grid grid-cols-2 gap-y-2 sm:gap-y-6 gap-x-2 sm:gap-x-4">
          <div className="landing-stat flex flex-col">
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-blue-500/80 mb-0.5 sm:mb-1 font-bold">Coordinates</span>
            <span className="font-mono text-white text-xs sm:text-sm md:text-lg">18.4°N 77.5°E</span>
          </div>
          <div className="landing-stat flex flex-col">
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-blue-500/80 mb-0.5 sm:mb-1 font-bold">Elapsed Time</span>
            <span className="font-mono text-white text-xs sm:text-sm md:text-lg">Sol 1, 14:32</span>
          </div>
          <div className="landing-stat flex flex-col">
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-blue-500/80 mb-0.5 sm:mb-1 font-bold">Atmos Pressure</span>
            <span className="font-mono text-white text-xs sm:text-sm md:text-lg">6.1 mbar</span>
          </div>
          <div className="landing-stat flex flex-col">
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-blue-500/80 mb-0.5 sm:mb-1 font-bold">Surface Temp</span>
            <span className="font-mono text-white text-xs sm:text-sm md:text-lg">-63 °C</span>
          </div>
        </div>
      </div>

    </section>
  );
}
