import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

const PLANET_DATA = {
  sun: { name: 'Sun', type: 'Yellow Dwarf Star', gravity: '274 m/s²', info: 'The heart of our solar system, a hot ball of glowing gases.' },
  mercury: { name: 'Mercury', type: 'Terrestrial Planet', gravity: '3.7 m/s²', info: 'The smallest and fastest planet, zipping around the Sun in only 88 Earth days.' },
  venus: { name: 'Venus', type: 'Terrestrial Planet', gravity: '8.87 m/s²', info: 'A thick, toxic atmosphere traps heat in a runaway greenhouse effect.' },
  earth: { name: 'Earth', type: 'Terrestrial Planet', gravity: '9.807 m/s²', info: 'Our home planet, the only place we know of so far that is inhabited by living things.' },
  mars: { name: 'Mars', type: 'Terrestrial Planet', gravity: '3.71 m/s²', info: 'A dusty, cold, desert world with a very thin atmosphere.' },
  jupiter: { name: 'Jupiter', type: 'Gas Giant', gravity: '24.79 m/s²', info: 'More than twice as massive as all the other planets combined.' },
  saturn: { name: 'Saturn', type: 'Gas Giant', gravity: '10.44 m/s²', info: 'Adorned with a dazzling, complex system of icy rings.' },
  uranus: { name: 'Uranus', type: 'Ice Giant', gravity: '8.69 m/s²', info: 'Rotates at a nearly 90-degree angle from the plane of its orbit.' },
  neptune: { name: 'Neptune', type: 'Ice Giant', gravity: '11.15 m/s²', info: 'Dark, cold, and whipped by supersonic winds. The last of the planets in our solar system.' }
};

export default function SectionSolarSystem({ onComplete }) {
  const container = useRef(null);
  const wrapper = useRef(null);
  const earthClone = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handlePointerEnter = (e, planetKey) => {
    if (isPlaying) return;
    setHoveredPlanet(PLANET_DATA[planetKey]);
    setMousePos({ x: e.clientX, y: e.clientY });
  };
  
  const handlePointerMove = (e) => {
    if (hoveredPlanet && !isPlaying) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  };
  
  const handlePointerLeave = () => {
    setHoveredPlanet(null);
  };

  useEffect(() => {
    const initiateJourney = () => {
      if (isPlaying) return;
      setIsPlaying(true);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', initiateJourney);
      setHoveredPlanet(null);
      const orbitEarth = container.current.querySelector('.orbit-earth');
      const ssEarthEl = orbitEarth.querySelector('.solar-earth-texture');
      const ssRect = ssEarthEl.getBoundingClientRect();

      const allOrbits = container.current.querySelectorAll('[class*="orbit-"]');
      allOrbits.forEach(el => { el.style.animationPlayState = 'paused'; });

      const clone = earthClone.current;
      const earthCenterX = ssRect.left + ssRect.width / 2;
      const earthCenterY = ssRect.top + ssRect.height / 2;
      const earthSize = ssRect.width;

      gsap.set(clone, {
        display: 'block',
        position: 'fixed',
        left: ssRect.left,
        top: ssRect.top,
        width: ssRect.width,
        height: ssRect.height,
        opacity: 1,
        scale: 1,
        borderRadius: '50%',
        zIndex: 1001,
        boxShadow: '0 0 8px rgba(59,130,246,0.5), 0 0 16px rgba(59,130,246,0.15)',
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        backgroundPosition: 'top center'
      });

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      let targetDiameter;
      if (vw >= 768) {
        targetDiameter = vw * 1.5;
      } else if (vw >= 640) {
        targetDiameter = vw * 1.8;
      } else {
        targetDiameter = vw * 2.6;
      }

      const targetCenterX = vw / 2;
      const earthTopOffset = vw >= 768 ? 0.60 * vh : 0.68 * vh;
      const targetCenterY = earthTopOffset + targetDiameter / 2;

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });

      tl.set(ssEarthEl, { opacity: 0 }, 0);
      tl.set('.orbit-earth', { borderColor: 'transparent' }, 0);

      tl.to('.milky-way-bg, .star-field, .sun-core, .sun-corona, .solar-system-wrapper, [class*="orbit-"]', { 
        opacity: 0, 
        duration: 1.2, 
        ease: 'sine.inOut',
        stagger: 0.1
      }, 0.5);

      tl.to(clone, {
        left: targetCenterX - targetDiameter / 2,
        top: targetCenterY - targetDiameter / 2,
        width: targetDiameter,
        height: targetDiameter,
        boxShadow: 'inset 0 40px 100px rgba(0,20,50,0.9), inset 0 -40px 200px rgba(0,0,0,0.9), 0 -20px 80px rgba(50,150,255,0.4)',
        borderColor: 'rgba(96, 165, 250, 0.5)', 
        backgroundColor: '#020510',
        duration: 3.0,
        ease: 'power3.inOut'
      }, 0);

      tl.to('.clone-atmosphere', { opacity: 1, duration: 1.5, ease: 'sine.inOut' }, 1.0);
      tl.to(container.current, { backgroundColor: '#020510', duration: 1.5 }, 0.5);
    };

    const handleScroll = (e) => {
      if (e.deltaY > 0) {
        if (e.cancelable) e.preventDefault();
        initiateJourney();
      }
    };
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchstart', initiateJourney, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', initiateJourney);
    };
  }, [isPlaying, onComplete]);

  return (
    <section ref={container} className="fixed inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden z-[999]"
      style={{ background: 'radial-gradient(ellipse at 50% 45%, #0a0a1a 0%, #020208 50%, #000000 100%)' }}>
      
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .hover-tooltip { animation: fadeIn 0.15s ease-out forwards; }
      `}</style>

      {hoveredPlanet && (
        <div 
          className="hover-tooltip fixed z-[1000] pointer-events-none p-5 rounded-2xl backdrop-blur-xl bg-black/50 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{ 
            left: mousePos.x + 20, 
            top: mousePos.y + 20,
            transform: 'translateZ(0)' 
          }}
        >
          <h4 className="text-xl font-bold text-white tracking-wide mb-1 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            {hoveredPlanet.name}
          </h4>
          <div className="text-[10px] uppercase tracking-[0.2em] text-blue-300 mb-4">{hoveredPlanet.type}</div>
          
          <div className="flex flex-col mb-4 bg-white/5 border border-white/5 rounded-lg p-2.5">
            <span className="text-[9px] text-gray-400 uppercase tracking-widest mb-0.5">Surface Gravity</span>
            <span className="font-mono text-sm text-green-400">{hoveredPlanet.gravity}</span>
          </div>
          <p className="text-sm text-gray-300 max-w-[220px] leading-relaxed">
            {hoveredPlanet.info}
          </p>
        </div>
      )}

      <div 
        ref={earthClone}
        className="hidden overflow-hidden border-t sm:border-t-2"
        style={{
          backgroundImage: "url('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg')",
          backgroundSize: 'cover', backgroundPosition: 'top center', backgroundRepeat: 'no-repeat',
          borderRadius: '100%', borderColor: 'transparent'
        }}
      >
        <div className="clone-atmosphere absolute inset-0 opacity-0 pointer-events-none">
          <div className="absolute inset-0 rounded-[100%] shadow-[inset_0_10vw_10vw_rgba(30,120,255,0.4)] opacity-80" />
          <div className="absolute inset-0 bg-blue-900/40" />
          <div className="absolute top-0 w-full h-[30%] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 10%22 preserveAspectRatio=%22none%22><path d=%22M0,5 Q10,0 20,5 T40,5 T60,5 T80,5 T100,5 L100,10 L0,10 Z%22 fill=%22rgba(255,255,255,0.4)%22/></svg>')] bg-repeat-x bg-[length:10%_100%] opacity-40 scale-y-50 mt-[5vw]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,_rgba(0,0,0,0.9)_0%,_transparent_70%)]" />
        </div>
      </div>

      <div className="milky-way-bg absolute inset-0 z-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/e4/Milky_Way_Galaxy.jpg')",
          backgroundSize: 'cover', backgroundPosition: 'center', filter: 'contrast(1.5) brightness(0.5) saturate(0.5) hue-rotate(-10deg)'
        }}
      />

      <div className="star-field absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(1.2px 1.2px at 10% 20%, rgba(255,255,255,0.9), transparent),
            radial-gradient(0.8px 0.8px at 20% 60%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 30% 10%, rgba(255,255,255,0.7), transparent),
            radial-gradient(0.6px 0.6px at 40% 80%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1.5px 1.5px at 50% 5%, rgba(200,220,255,0.8), transparent),
            radial-gradient(0.8px 0.8px at 60% 50%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 70% 30%, rgba(255,255,255,0.7), transparent),
            radial-gradient(0.7px 0.7px at 80% 70%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1.3px 1.3px at 90% 15%, rgba(200,200,255,0.8), transparent),
            radial-gradient(0.8px 0.8px at 5% 90%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 15% 45%, rgba(255,255,255,0.5), transparent),
            radial-gradient(0.6px 0.6px at 25% 75%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1.2px 1.2px at 35% 35%, rgba(255,220,200,0.6), transparent),
            radial-gradient(0.8px 0.8px at 45% 95%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 55% 25%, rgba(255,255,255,0.6), transparent),
            radial-gradient(0.7px 0.7px at 65% 85%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1.4px 1.4px at 75% 55%, rgba(200,220,255,0.7), transparent),
            radial-gradient(0.6px 0.6px at 85% 40%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 95% 65%, rgba(255,255,255,0.6), transparent),
            radial-gradient(0.8px 0.8px at 3% 35%, rgba(255,255,255,0.5), transparent)
          `,
          backgroundSize: '300px 300px'
        }}
      />

      <div ref={wrapper} className="solar-system-wrapper relative w-[115vw] h-[115vw] md:w-[105vh] md:h-[105vh] flex items-center justify-center transform-gpu will-change-transform z-10">
         
         <div className="sun-corona absolute w-24 h-24 md:w-32 md:h-32 rounded-full z-[9] pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(255,200,80,0.6) 0%, rgba(255,150,30,0.35) 25%, rgba(255,100,0,0.12) 45%, rgba(255,60,0,0.04) 65%, transparent 80%)' }}
         />
         <div className="sun-core absolute w-12 h-12 md:w-16 md:h-16 rounded-full z-10 cursor-help"
           onPointerEnter={(e) => handlePointerEnter(e, 'sun')}
           onPointerMove={handlePointerMove}
           onPointerLeave={handlePointerLeave}
           style={{
             backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg')",
             backgroundSize: '130% 130%', backgroundPosition: 'center',
             boxShadow: '0 0 30px 10px rgba(255,160,0,0.7), 0 0 60px 20px rgba(255,100,0,0.3)',
             WebkitMaskImage: 'radial-gradient(circle, white 50%, transparent 72%)',
             maskImage: 'radial-gradient(circle, white 50%, transparent 72%)'
           }}
         />

         <div className="orbit-mercury absolute w-[15%] h-[15%] rounded-full border border-white/[0.03] animate-[spin_5s_linear_infinite] pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] md:w-[8px] md:h-[8px] rounded-full overflow-hidden cursor-help pointer-events-auto"
                 onPointerEnter={(e) => handlePointerEnter(e, 'mercury')} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}
                 style={{ background: 'radial-gradient(circle at 45% 40%, #b0a090, #6b5d50)', boxShadow: '0 0 4px rgba(180,160,140,0.3)' }}>
              <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 35% 40%, transparent 25%, rgba(0,0,0,0.7) 100%)' }} />
            </div>
         </div>

         <div className="orbit-venus absolute w-[24%] h-[24%] rounded-full border border-white/[0.04] animate-[spin_8s_linear_infinite] pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[8px] h-[8px] md:w-[12px] md:h-[12px] rounded-full overflow-hidden cursor-help pointer-events-auto"
                 onPointerEnter={(e) => handlePointerEnter(e, 'venus')} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}
                 style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg')", backgroundSize: 'cover', boxShadow: '0 0 6px rgba(220,200,120,0.3)' }}>
              <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 35% 40%, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />
            </div>
         </div>

         <div className="orbit-earth absolute w-[35%] h-[35%] rounded-full border border-blue-400/[0.05] animate-[spin_15s_linear_infinite] pointer-events-none">
            <div className="solar-earth-texture absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[12px] h-[12px] md:w-[16px] md:h-[16px] rounded-full overflow-hidden cursor-help pointer-events-auto"
                 onPointerEnter={(e) => handlePointerEnter(e, 'earth')} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}
                 style={{
                   backgroundImage: "url('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg')",
                   backgroundSize: 'cover', backgroundPosition: 'top center',
                   boxShadow: '0 0 8px rgba(59,130,246,0.5), 0 0 16px rgba(59,130,246,0.15)'
                 }}>
              <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 40% 35%, transparent 30%, rgba(0,0,0,0.55) 100%)' }} />
              <div className="absolute inset-[-1px] rounded-full pointer-events-none" style={{ boxShadow: 'inset 0 0 4px rgba(100,180,255,0.7)' }} />
            </div>
            
            <div className="orbit-moon absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[20px] h-[20px] md:w-[28px] md:h-[28px] rounded-full animate-[spin_3s_linear_infinite] pointer-events-none">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-[3px] md:w-[4px] md:h-[4px] rounded-full overflow-hidden pointer-events-auto"
                    style={{ backgroundImage: "url('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg')", backgroundSize: 'cover', boxShadow: '0 0 2px rgba(200,200,200,0.3)' }}>
                 <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 40% 40%, transparent 25%, rgba(0,0,0,0.7) 100%)' }} />
               </div>
            </div>
         </div>

         <div className="orbit-mars absolute w-[46%] h-[46%] rounded-full border border-red-400/[0.04] animate-[spin_25s_linear_infinite] pointer-events-none">
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] md:w-[14px] md:h-[14px] rounded-full overflow-hidden cursor-help pointer-events-auto"
                 onPointerEnter={(e) => handlePointerEnter(e, 'mars')} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}
                 style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg')", backgroundSize: 'cover', boxShadow: '0 0 8px rgba(226,90,56,0.4)' }}>
              <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 35% 40%, transparent 30%, rgba(0,0,0,0.65) 100%)' }} />
            </div>
         </div>

         <div className="orbit-jupiter absolute w-[60%] h-[60%] rounded-full border border-orange-200/[0.03] animate-[spin_45s_linear_infinite] pointer-events-none">
            <div className="absolute bottom-1/2 left-0 -translate-x-1/2 translate-y-1/2 w-[20px] h-[20px] md:w-[32px] md:h-[32px] rounded-full overflow-hidden cursor-help pointer-events-auto"
                 onPointerEnter={(e) => handlePointerEnter(e, 'jupiter')} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}
                 style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg')", backgroundSize: 'cover', boxShadow: '0 0 15px rgba(200,150,80,0.15)' }}>
              <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 40% 35%, transparent 35%, rgba(0,0,0,0.55) 100%)' }} />
            </div>
         </div>

         <div className="orbit-saturn absolute w-[75%] h-[75%] rounded-full border border-yellow-100/[0.02] animate-[spin_70s_linear_infinite] pointer-events-none">
            <div className="absolute top-[10%] left-[10%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-help pointer-events-auto" 
                 onPointerEnter={(e) => handlePointerEnter(e, 'saturn')} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}
                 style={{ transform: 'rotate(-20deg)' }}>
              <div className="relative w-[16px] h-[16px] md:w-[24px] md:h-[24px] rounded-full overflow-hidden z-[2]"
                   style={{
                     background: 'linear-gradient(180deg, #e8d5a3 0%, #c4a96a 25%, #d4b87a 50%, #b89955 75%, #a08540 100%)',
                     boxShadow: '0 0 8px rgba(200,180,100,0.2)'
                   }}>
                <div className="absolute inset-0 rounded-full opacity-30" style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(180,150,80,0.4) 2px, rgba(180,150,80,0.4) 3px)'
                }} />
                <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 45% 40%, transparent 40%, rgba(0,0,0,0.4) 100%)' }} />
              </div>
              <div className="absolute w-[200%] h-[50%] rounded-[50%] pointer-events-none z-[1]"
                   style={{ border: '2px solid rgba(210,195,150,0.35)', boxShadow: '0 0 6px rgba(200,180,100,0.08), inset 0 0 3px rgba(200,180,100,0.05)' }} />
              <div className="absolute w-[170%] h-[42%] rounded-[50%] pointer-events-none z-[1]"
                   style={{ border: '1.5px solid rgba(200,185,130,0.25)' }} />
              <div className="absolute w-[140%] h-[35%] rounded-[50%] pointer-events-none z-[1]"
                   style={{ border: '1px solid rgba(190,175,120,0.2)' }} />
            </div>
         </div>

         <div className="orbit-uranus absolute w-[88%] h-[88%] rounded-full border border-cyan-300/[0.02] animate-[spin_100s_linear_infinite] pointer-events-none">
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] md:w-[18px] md:h-[18px] rounded-full overflow-hidden cursor-help pointer-events-auto"
                 onPointerEnter={(e) => handlePointerEnter(e, 'uranus')} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}
                 style={{ background: 'radial-gradient(circle at 48% 45%, #a8e4e0, #5bb8b2 40%, #3a8a86 80%)', boxShadow: '0 0 10px rgba(100,200,200,0.2)' }}>
              <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 40% 38%, transparent 35%, rgba(0,0,0,0.5) 100%)' }} />
            </div>
         </div>

         <div className="orbit-neptune absolute w-[100%] h-[100%] rounded-full border border-blue-400/[0.015] animate-[spin_140s_linear_infinite] pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[12px] h-[12px] md:w-[18px] md:h-[18px] rounded-full overflow-hidden cursor-help pointer-events-auto"
                 onPointerEnter={(e) => handlePointerEnter(e, 'neptune')} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}
                 style={{ background: 'radial-gradient(circle at 48% 45%, #6888d0, #3355a8 40%, #1a3070 80%)', boxShadow: '0 0 10px rgba(60,100,200,0.2)' }}>
              <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 40% 38%, transparent 35%, rgba(0,0,0,0.5) 100%)' }} />
            </div>
         </div>

      </div>

      <div className={`absolute bottom-[7vh] left-1/2 -translate-x-1/2 flex flex-col items-center text-white/25 transition-opacity duration-700 ${isPlaying ? 'opacity-0' : 'opacity-100 animate-bounce'}`}>
        <span className="text-[7px] tracking-[0.35em] uppercase mb-2 text-center pointer-events-none select-none">Scroll to begin</span>
        <svg className="pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
      </div>

    </section>
  );
}
