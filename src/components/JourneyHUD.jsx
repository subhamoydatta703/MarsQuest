import React from 'react';

export default function JourneyHUD() {
  return (
    <div className="journey-hud fixed z-[110] pointer-events-none 
                    top-0 left-0 w-full flex flex-row items-center justify-between
                    md:top-8 md:left-8 md:w-64 md:flex-col md:items-stretch md:justify-start 
                    md:gap-6 font-mono text-white
                    glass-panel border-x-0 border-t-0 border-b border-white/10 p-2 sm:p-3
                    md:!bg-transparent md:!backdrop-blur-none md:!border-none md:!shadow-none md:p-0">
      
      {/* Panel 1: Main Telemetry */}
      <div className="relative flex-1 flex flex-row items-center justify-around md:justify-start md:flex-col md:glass-panel md:p-4 md:rounded-lg md:scanlines gap-2 md:gap-0">
        <h3 className="hidden md:block text-xs text-accent uppercase tracking-[0.2em] mb-3 drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]">Telemetry Data</h3>
        
        <div className="flex flex-row md:flex-col flex-1 justify-around md:justify-start w-full gap-2 md:gap-0">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end md:mb-2 md:border-b border-white/20 md:pb-1 items-center md:items-start text-center md:text-left">
            <span className="text-[8px] md:text-xs text-gray-400 leading-none mb-1 md:mb-0">Distance</span>
            <span className="text-[10px] md:text-sm font-bold hud-dist leading-none">0 km</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-end md:mb-2 md:border-b border-white/20 md:pb-1 items-center md:items-start text-center md:text-left">
            <span className="text-[8px] md:text-xs text-gray-400 leading-none mb-1 md:mb-0">Velocity</span>
            <span className="text-[10px] md:text-sm font-bold hud-vel leading-none">0 km/s</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-end items-center md:items-start text-center md:text-left">
            <span className="text-[8px] md:text-xs text-gray-400 leading-none mb-1 md:mb-0">Day</span>
            <span className="text-[10px] md:text-sm font-bold text-mars-500 hud-days leading-none">0</span>
          </div>
        </div>
      </div>

      {/* Panel 2: Fuel */}
      <div className="relative flex flex-col justify-center px-3 sm:px-4 w-16 sm:w-24 md:w-full border-l border-white/10 md:border-none md:glass-panel md:p-4 md:rounded-lg md:scanlines">
        <div className="flex flex-row md:justify-between items-center md:mb-1 justify-center relative w-full">
          <span className="text-[8px] md:text-xs text-gray-400 uppercase tracking-wider hidden md:block">Main Thruster Fuel</span>
          <span className="text-[10px] sm:text-[12px] md:text-sm font-bold hud-fuel w-full text-center md:text-right leading-none">100%</span>
        </div>
        <div className="w-full h-1 md:h-1.5 mt-1.5 md:mt-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-accent origin-left transition-none hud-fuel-bar" style={{ transform: 'scaleX(1)' }} />
        </div>
      </div>

      {/* Panel 3: Status */}
      <div className="relative flex items-center justify-center px-3 sm:px-4 border-l border-white/10 md:border-none md:glass-panel md:p-4 md:rounded-lg md:scanlines gap-1.5 md:gap-3">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 hud-status-light animate-pulse shadow-[0_0_8px_#22c55e]" />
        <span className="text-[8px] sm:text-[10px] md:text-xs tracking-wider hud-status-text hidden sm:block uppercase whitespace-nowrap text-center">SYSTEMS NOMINAL</span>
      </div>

    </div>
  );
}
