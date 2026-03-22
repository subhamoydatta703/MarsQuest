import React from 'react';

export default function JourneyHUD() {
  return (
    <div className="journey-hud fixed left-1/2 top-3 z-[110] flex w-[calc(100%-1.5rem)] max-w-[18rem] -translate-x-1/2 flex-col gap-2 font-mono text-white pointer-events-none mix-blend-difference sm:top-5 sm:w-[20rem] sm:max-w-sm sm:gap-3 md:top-8 md:left-8 md:w-64 md:max-w-[16rem] md:translate-x-0 md:gap-6">
      <div className="relative before:absolute before:inset-0 before:bg-space-900 before:-z-10 before:blur-md p-2 rounded-lg mix-blend-normal">
        <h3 className="text-xs text-accent uppercase tracking-[0.2em] mb-3">Telemetry Data</h3>
        
        <div className="flex justify-between items-end gap-3 mb-2 border-b border-white/20 pb-1">
          <span className="text-xs text-gray-400">Distance from Earth</span>
          <span className="text-sm sm:text-lg font-bold hud-dist text-right">0 km</span>
        </div>

        <div className="flex justify-between items-end gap-3 mb-2 border-b border-white/20 pb-1">
          <span className="text-xs text-gray-400">Relative Velocity</span>
          <span className="text-sm sm:text-lg font-bold hud-vel text-right">0 km/s</span>
        </div>

        <div className="flex justify-between items-end gap-3 mb-2 border-b border-white/20 pb-1">
          <span className="text-xs text-gray-400">Mission Day</span>
          <span className="text-sm sm:text-lg font-bold text-mars-500 hud-days text-right">0</span>
        </div>
      </div>

      <div className="relative before:absolute before:inset-0 before:bg-space-900 before:-z-10 before:blur-md p-2 rounded-lg mix-blend-normal">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">Main Thruster Fuel</span>
          <span className="text-sm font-bold hud-fuel">100%</span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-accent origin-left transition-none hud-fuel-bar" style={{ transform: 'scaleX(1)' }} />
        </div>
      </div>

      <div className="relative before:absolute before:inset-0 before:bg-space-900 before:-z-10 before:blur-md p-2 rounded-lg mix-blend-normal flex items-center gap-2 sm:gap-3">
        <div className="w-2 h-2 rounded-full bg-green-500 hud-status-light animate-pulse" />
        <span className="text-[10px] sm:text-xs tracking-wider hud-status-text">SYSTEMS NOMINAL</span>
      </div>
    </div>
  );
}
