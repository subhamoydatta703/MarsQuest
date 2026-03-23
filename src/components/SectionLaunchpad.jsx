import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function SectionLaunchpad() {
  const container = useRef(null);
  const dashboard = useRef(null);
  const rotateXToRef = useRef(null);
  const rotateYToRef = useRef(null);
  const [timerText, setTimerText] = useState('00:00:00');
  const [isLaunched, setIsLaunched] = useState(false);
  const launchTimeRef = useRef(null);

  useGSAP(() => {
    rotateXToRef.current = gsap.quickTo(dashboard.current, 'rotateX', {
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });

    rotateYToRef.current = gsap.quickTo(dashboard.current, 'rotateY', {
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });

    gsap.to('.realistic-earth', {
      y: '20vh',
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
        invalidateOnRefresh: true
      }
    });

    gsap.to('.hero-title', {
      y: '-20vh',
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
        invalidateOnRefresh: true
      }
    });

    gsap.to('.launch-trigger', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top -5%',
        onEnter: () => setIsLaunched(true),
        onLeaveBack: () => {
          setIsLaunched(false);
          setTimerText('00:00:00');
        }
      }
    });

    gsap.utils.toArray('.earth-story-card').forEach((card, i) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 1.4,
        delay: i * 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 30%',
          end: 'center center',
          toggleActions: 'play none none reverse'
        }
      });
    });

  }, { scope: container });

  useEffect(() => {
    let interval;
    if (isLaunched) {
      launchTimeRef.current = Date.now();
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - launchTimeRef.current) / 1000);
        const hours = String(Math.floor(elapsed / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
        const seconds = String(elapsed % 60).padStart(2, '0');
        setTimerText(`${hours}:${minutes}:${seconds}`);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLaunched]);

  const handleMouseMove = (e) => {
    if (!dashboard.current || !rotateXToRef.current || !rotateYToRef.current) return;
    const { left, top, width, height } = dashboard.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 10;
    const y = (e.clientY - top - height / 2) / 10;
    rotateYToRef.current(x);
    rotateXToRef.current(-y);
  };

  const handleMouseLeave = () => {
    if (!dashboard.current) return;
    gsap.to(dashboard.current, { rotateY: 0, rotateX: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <section 
      ref={container} 
      className="relative w-full min-h-[150vh] flex flex-col items-center pt-[20vh] sm:pt-[28vh] md:pt-[15vh] overflow-visible bg-transparent pb-32"
      style={{ perspective: 1000 }}
    >
      <div className="launch-trigger absolute top-0 w-full h-1" />

      <div 
        ref={dashboard}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="launchpad-dashboard relative z-30 w-[calc(100%-1.5rem)] sm:w-11/12 max-w-2xl bg-[#09101f]/80 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-4 sm:p-6 md:p-8 shadow-[0_20px_50px_rgba(0,100,255,0.15)] cursor-crosshair transform-gpu flex flex-col gap-4 sm:gap-6 scanlines"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flex justify-between items-end border-b border-blue-500/20 pb-4">
          <div className="text-sm text-blue-400 font-mono tracking-widest uppercase">
            Launch Subsystems
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-black/40 rounded-xl p-4 border border-blue-500/10">
            <div className="text-xs text-blue-400 uppercase tracking-wider mb-2">Main Engine Thrust</div>
            <div className="text-xl sm:text-2xl font-mono text-white">104.5%</div>
            <div className="w-full h-1 bg-white/10 mt-2 rounded-full overflow-hidden">
               <div className="w-full h-full bg-blue-500 animate-pulse" />
            </div>
          </div>
          <div className="bg-black/40 rounded-xl p-4 border border-blue-500/10">
            <div className="text-xs text-blue-400 uppercase tracking-wider mb-2">G-Force</div>
            <div className="text-xl sm:text-2xl font-mono text-white">{isLaunched ? '3.2 G' : '1.0 G'}</div>
            <div className="w-full h-1 bg-white/10 mt-2 rounded-full overflow-hidden">
               <div className={`h-full bg-blue-500 transition-all duration-1000 ${isLaunched ? 'w-3/4' : 'w-1/4'}`} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-[80vh] md:top-[40vh] left-0 md:left-auto md:right-16 lg:right-32 z-20 w-full md:w-auto overflow-hidden pointer-events-auto">
        <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-6 pt-4 md:pt-0 md:pb-0 px-4 md:px-0">
          <div className="earth-story-card min-w-[85vw] sm:min-w-[60vw] md:min-w-0 md:w-80 glass-panel rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,100,200,0.15)] animate-float snap-center" style={{animationDelay: '0s'}}>
            <h3 className="text-xs text-blue-400 font-mono uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Our Pale Blue Dot
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              Home to 8 billion souls — a fragile oasis spinning at 1,670 km/h through the cosmic void.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex flex-col bg-black/30 rounded-lg p-2">
                <span className="text-gray-500 uppercase tracking-wider">Diameter</span>
                <span className="font-mono text-white">12,742 km</span>
              </div>
              <div className="flex flex-col bg-black/30 rounded-lg p-2">
                <span className="text-gray-500 uppercase tracking-wider">Age</span>
                <span className="font-mono text-white">4.54 Bn yrs</span>
              </div>
              <div className="flex flex-col bg-black/30 rounded-lg p-2">
                <span className="text-gray-500 uppercase tracking-wider">Atmosphere</span>
                <span className="font-mono text-cyan-300">N₂ 78% O₂ 21%</span>
              </div>
              <div className="flex flex-col bg-black/30 rounded-lg p-2">
                <span className="text-gray-500 uppercase tracking-wider">Gravity</span>
                <span className="font-mono text-white">9.807 m/s²</span>
              </div>
            </div>
          </div>

          <div className="earth-story-card min-w-[85vw] sm:min-w-[60vw] md:min-w-0 md:w-80 glass-panel rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,200,255,0.1)] animate-float snap-center" style={{animationDelay: '1s'}}>
            <h3 className="text-xs text-cyan-400 font-mono uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Why We Leave
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Becoming multi-planetary isn't just ambition — it's survival. A single asteroid, a supervolcano, or a gamma-ray burst could end everything. Mars is humanity's backup drive.
            </p>
          </div>
        </div>
      </div>

      <div 
        className="realistic-earth absolute top-[68vh] md:top-[60vh] left-1/2 -translate-x-1/2 w-[260vw] h-[260vw] sm:w-[180vw] sm:h-[180vw] md:w-[150vw] md:h-[150vw] rounded-[100%] z-0 
                   shadow-[inset_0_40px_100px_rgba(0,20,50,0.9),inset_0_-40px_200px_rgba(0,0,0,0.9),0_-20px_80px_rgba(50,150,255,0.4)] 
                   overflow-hidden border-t sm:border-t-2 border-blue-400/50 bg-[#020510] will-change-transform"
        style={{
          backgroundImage: "url('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 rounded-[100%] shadow-[inset_0_10vw_10vw_rgba(30,120,255,0.4)] pointer-events-none opacity-80" />
        <div className="absolute inset-0 bg-blue-900/40" />
        <div className="absolute top-0 w-full h-[30%] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 10%22 preserveAspectRatio=%22none%22><path d=%22M0,5 Q10,0 20,5 T40,5 T60,5 T80,5 T100,5 L100,10 L0,10 Z%22 fill=%22rgba(255,255,255,0.4)%22/></svg>')] bg-repeat-x bg-[length:10%_100%] opacity-40 scale-y-50 mt-[5vw]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,_rgba(0,0,0,0.9)_0%,_transparent_70%)] pointer-events-none" />
      </div>

    </section>
  );
}
