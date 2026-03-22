import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function SectionAntigravityVoid() {
  const container = useRef(null);
  const scrollContainer = useRef(null);

  useGSAP(() => {
    let sections = gsap.utils.toArray('.void-panel');

    const panelScroll = gsap.to(sections, {
      id: 'void-scroll',
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        scrub: 2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 1 / (sections.length - 1),
          duration: { min: 0.2, max: 0.5 },
          ease: 'power1.inOut',
          inertia: false
        },
        end: () => '+=' + scrollContainer.current.offsetWidth,
        onLeave: () => gsap.to(container.current, { autoAlpha: 0, duration: 0.2 }),
        onEnterBack: () => gsap.to(container.current, { autoAlpha: 1, duration: 0.2 })
      }
    });

    gsap.to('.asteroid-fast', {
      x: -2000,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2.5,
        invalidateOnRefresh: true
      }
    });

    gsap.utils.toArray('.void-story-card').forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card.closest('.void-panel'),
          start: 'left center',
          end: 'right center',
          containerAnimation: panelScroll,
          toggleActions: 'play none none reverse'
        }
      });
    });

  }, { scope: container });


  return (
    <section id="void-section" ref={container} className="relative w-full h-screen overflow-hidden bg-transparent z-20 transition-opacity duration-300">
      <div 
        ref={scrollContainer} 
        className="flex h-full w-[300vw]"
      >
        <div className="absolute top-[20%] left-[80vw] w-12 h-12 bg-gray-700/40 blur-sm rounded-full asteroid-fast z-0" />
        <div className="absolute top-[80%] left-[150vw] w-24 h-16 bg-gray-600/30 blur-sm rounded-full asteroid-fast z-0 rotate-45" />
        <div className="absolute top-[40%] left-[250vw] w-8 h-8 bg-gray-500/50 blur-[2px] rounded-full asteroid-fast z-0" />

        <div className="void-panel w-screen h-full flex flex-col items-center justify-center p-4 lg:p-8 relative">
          <div className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto right-auto md:right-8 lg:right-16 w-[calc(100%-2rem)] sm:w-[28rem] md:w-[40vw] max-w-md z-10 p-4 lg:p-8 bg-black/40 border border-white/5 rounded-2xl backdrop-blur-sm">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 tracking-tight">The Void</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6">
              Cruising at 24,000 km/h. The silence is absolute. 140 million miles of nothingness separates origin and destination.
            </p>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex flex-col gap-2">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-gray-500 tracking-wider">Cosmic Radiation</span>
                 <span className="font-mono text-yellow-500">1.8 mSv/day</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="text-gray-500 tracking-wider">Solar Array Output</span>
                 <span className="font-mono text-green-400">14.2 kW</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="text-gray-500 tracking-wider">Exterior Temp</span>
                 <span className="font-mono text-blue-300">-270.45 °C (2.7K)</span>
               </div>
            </div>
            <div className="void-story-card mt-4 bg-white/5 backdrop-blur-md border border-purple-500/15 rounded-xl p-4">
              <h4 className="text-xs text-purple-400 font-mono uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                The Interplanetary Medium
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Between worlds lies a near-perfect vacuum — just 5 particles per cubic centimeter. Solar wind streams past at 400 km/s. Without Earth's magnetosphere, the crew relies on the ship's water-shield walls to absorb cosmic rays. Muscles atrophy at 1% per week; bones thin at 1.5% per month. Every day demands exercise.
              </p>
            </div>
          </div>
        </div>

        <div className="void-panel w-screen h-full flex items-center justify-center p-4 lg:p-8 relative">
          <div className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto right-auto md:right-8 lg:right-16 w-[calc(100%-2rem)] sm:w-[28rem] md:w-[40vw] max-w-md bg-space-800/40 backdrop-blur-lg border border-white/10 rounded-2xl p-4 lg:p-8 shadow-2xl z-10">
            <h3 className="text-xl font-mono uppercase tracking-widest text-accent mb-6 border-b border-white/10 pb-4">
              Autonomous Navigation Active
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Trajectory verified. The main engine is powered down to conserve fuel for the descent phase. Gravity assists have been successfully calculated and executed.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
               <div className="bg-black/50 p-3 rounded-lg border border-white/10 text-center">
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Cabin Pressure</div>
                  <div className="text-xl font-mono text-white">14.7 psi</div>
               </div>
               <div className="bg-black/50 p-3 rounded-lg border border-white/10 text-center">
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Cryo Status</div>
                  <div className="text-xl font-mono text-cyan-400">Optimal</div>
               </div>
            </div>

            <div className="void-story-card bg-white/5 backdrop-blur-md border border-cyan-500/15 rounded-xl p-4 mb-4">
              <h4 className="text-xs text-cyan-400 font-mono uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Hohmann Transfer Orbit
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed mb-2">
                Our trajectory follows a Hohmann transfer ellipse — the most fuel-efficient path between two circular orbits. Two precise engine burns: one to leave Earth's orbit, one to enter Mars'.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="flex flex-col bg-black/30 rounded-lg p-2">
                  <span className="text-gray-500 uppercase tracking-wider">Delta-V Total</span>
                  <span className="font-mono text-white">3.6 km/s</span>
                </div>
                <div className="flex flex-col bg-black/30 rounded-lg p-2">
                  <span className="text-gray-500 uppercase tracking-wider">Transit Time</span>
                  <span className="font-mono text-white">~7 months</span>
                </div>
                <div className="flex flex-col bg-black/30 rounded-lg p-2">
                  <span className="text-gray-500 uppercase tracking-wider">Signal Delay</span>
                  <span className="font-mono text-yellow-400">3-22 min</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
               <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-accent animate-[pulse_2s_ease-in-out_infinite]" />
               </div>
            </div>
          </div>
        </div>

        <div className="void-panel w-screen h-full flex flex-col items-center justify-center p-4 lg:p-8 relative">
          <div className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto right-auto md:right-8 lg:right-16 text-left md:text-right w-[calc(100%-2rem)] sm:w-[28rem] md:w-[40vw] max-w-md z-10">
            <div className="inline-block px-4 py-1 rounded-full border border-mars-500 text-mars-500 text-sm uppercase tracking-widest mb-6 bg-black/50 backdrop-blur-sm">
              Gravity Well Detected
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-light mb-4 text-shadow-lg">Entering the <span className="font-bold text-mars-500">Red Line</span></h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-xl md:mx-auto mb-8">
              After 210 days of silence, a rust-colored marble emerges from the darkness. What was once a pixel is now a world.
            </p>
            
            <div className="void-story-card bg-white/5 backdrop-blur-md border border-mars-500/20 rounded-2xl p-6 w-full shadow-[0_8px_32px_rgba(226,90,56,0.15)] ml-auto">
              <blockquote className="text-gray-300 italic text-base sm:text-lg leading-relaxed mb-3">
                "For all its material advantages, the sedentary life has left us edgy, unfulfilled. Even after 400 generations in villages and cities, we haven't forgotten. The open road still softly calls."
              </blockquote>
              <cite className="text-xs text-mars-500 font-mono tracking-widest">— Carl Sagan, Pale Blue Dot</cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
