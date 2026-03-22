import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        scrub: 2
      }
    });

    ScrollTrigger.create({
      trigger: container.current,
      start: 'top 80%',
      onEnter: () => {
        const voidSec = document.getElementById('void-section');
        if(voidSec) voidSec.style.opacity = '0';
      },
      onLeaveBack: () => {
        const voidSec = document.getElementById('void-section');
        if(voidSec) voidSec.style.opacity = '1';
      }
    });

    gsap.utils.toArray('.mars-story-card').forEach((card, i) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        delay: i * 0.2,
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
    <section ref={container} className="relative w-full h-[150vh] flex flex-col items-center justify-start pt-24 overflow-hidden z-30 bg-gradient-to-b from-transparent via-[#401000]/80 to-[#B73D1E]/40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#E25A38_0%,_transparent_60%)] opacity-20 pointer-events-none" />

      <div className="relative z-50 w-[45vw] md:w-[40vw] lg:max-w-lg p-4 lg:p-8 text-right flex flex-col items-end pt-[5vh] ml-auto md:mr-8 lg:mr-16">
        <h2 className="text-sm text-mars-500 font-mono tracking-widest uppercase mb-4 animate-pulse bg-black/60 px-4 py-1 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(226,90,56,0.6)]">
          Deceleration Burn Commencing
        </h2>
        <h3 className="text-5xl md:text-7xl font-bold font-sans drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] text-white mb-8">
          Martian Descent
        </h3>
        
        <div className="grid grid-cols-2 gap-4 w-full backdrop-blur-md bg-black/40 border border-mars-500/30 rounded-xl p-4 shadow-[0_0_30px_rgba(226,90,56,0.3)]">
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
          <div className="flex flex-col items-center border-t border-mars-500/30 pt-4 border-l">
             <span className="text-[10px] text-mars-500 uppercase tracking-widest mb-1">Mach Regime</span>
             <span className="font-mono text-white">Hypersonic</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-8 w-full text-left">
          <div className="mars-story-card flex-1 bg-white/5 backdrop-blur-md border border-mars-500/20 rounded-2xl p-5 shadow-[0_8px_32px_rgba(226,90,56,0.12)]">
            <h3 className="text-xs text-mars-500 font-mono uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-mars-500 animate-pulse" />
              The Red Planet
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              Mars — the fourth stone from the Sun. A world of rust-red deserts, towering volcanoes, and canyon systems that dwarf the Grand Canyon.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
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

          <div className="mars-story-card flex-1 bg-white/5 backdrop-blur-md border border-orange-500/15 rounded-2xl p-5 shadow-[0_8px_32px_rgba(255,150,50,0.08)]">
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
        className="realistic-mars absolute -bottom-[120vw] left-1/2 -translate-x-1/2 w-[220vw] h-[220vw] md:w-[150vw] md:h-[150vw] rounded-[100%] z-0 
                   shadow-[inset_0_-150px_350px_rgba(0,0,0,0.9),inset_0_40px_100px_rgba(255,100,0,0.3)] 
                   overflow-hidden contrast-125 saturate-[1.2] will-change-transform"
        style={{
          backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg')",
          backgroundSize: '106% 106%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,150,50,0.2)_0%,_transparent_60%)] mix-blend-screen pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,_rgba(0,0,0,1)_0%,_transparent_75%)] pointer-events-none" />
      </div>
      <div className="landing-ui-panel absolute bottom-[25vh] md:bottom-[30vh] left-1/2 -translate-x-1/2 w-11/12 max-w-2xl bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6 z-40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-0 pointer-events-none">
        <div className="flex justify-between items-center mb-6 border-b border-blue-500/30 pb-4 relative overflow-hidden">
          <h3 className="text-xl md:text-2xl font-mono uppercase tracking-widest text-blue-400">Touchdown Confirmed</h3>
          <div className="flex items-center gap-3">
             <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Systems Nominal</span>
             <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_#22c55e]" />
          </div>
          
          <div className="landing-scanline absolute top-0 left-0 w-full h-0 bg-blue-500/10 mix-blend-screen" />
        </div>
        
        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          <div className="landing-stat flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-blue-500/80 mb-1 font-bold">Landing Coordinates</span>
            <span className="font-mono text-white text-sm md:text-lg">18.4°N 77.5°E</span>
          </div>
          <div className="landing-stat flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-blue-500/80 mb-1 font-bold">Mission Elapsed Time</span>
            <span className="font-mono text-white text-sm md:text-lg">Sol 1, 14:32</span>
          </div>
          <div className="landing-stat flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-blue-500/80 mb-1 font-bold">Atmospheric Pressure</span>
            <span className="font-mono text-white text-sm md:text-lg">6.1 mbar</span>
          </div>
          <div className="landing-stat flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-blue-500/80 mb-1 font-bold">Surface Temp</span>
            <span className="font-mono text-white text-sm md:text-lg">-63 °C</span>
          </div>
        </div>
      </div>

    </section>
  );
}
