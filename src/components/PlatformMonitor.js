import React from 'react';
import { Users, Volume2, Smartphone, Lightbulb, Monitor } from 'lucide-react';
import { getZoneColor, getZonalNudgeInfo, getScreenContent } from '../utils/helpers';

const PlatformMonitor = ({ 
  platformData, 
  trainLoad, 
  nudgePhase, 
  currentScenario 
}) => {
  return (
    <div className="space-y-6">
      {/* Platform Visualization */}
      <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-400" />
          Live Platform Monitor
        </h3>
        
        <div className="relative bg-slate-700 rounded-lg p-8 mb-4">
          {/* Platform zones */}
          <div className="flex justify-center gap-3 mb-6">
            {Object.entries(platformData).filter(([key]) => key !== 'total').map(([zone, count]) => {
              const zonalNudge = getZonalNudgeInfo(
                zone, 
                currentScenario.needsNudging, 
                nudgePhase, 
                currentScenario.targetZones, 
                currentScenario.excludeZones
              );
              
              return (
                <div key={zone} className="text-center relative">
                  <div 
                    className={`w-20 h-28 rounded-lg border-2 border-slate-600 flex flex-col items-center justify-center text-white font-bold transition-all duration-1000 ${
                      getZoneColor(zone, count, nudgePhase, currentScenario.targetZones, currentScenario.excludeZones)
                    }`}
                  >
                    <div className="text-xl">{count}</div>
                    <div className="text-xs opacity-80 text-center leading-tight">
                      {zone.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    
                    {/* Zonal nudging indicators */}
                    {zonalNudge && (
                      <div className={`absolute -top-3 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${
                        zonalNudge.type === 'encourage' ? 'bg-green-400 text-green-900 ring-2 ring-green-300' : 'bg-orange-500 text-orange-900 ring-2 ring-orange-300'
                      } animate-bounce`}>
                        {zonalNudge.type === 'encourage' ? '✓' : zonalNudge.arrow || '!'}
                      </div>
                    )}
                  </div>
                  
                  {/* Zone-specific nudge messages with directional arrows */}
                  {nudgePhase === 'nudging' && zonalNudge && (
                    <div className="absolute top-full mt-2 z-10">
                      <div className={`text-xs font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap ${
                        zonalNudge.type === 'encourage' ? 'bg-green-500 text-green-100' : 'bg-orange-500 text-orange-100'
                      }`}>
                        {zonalNudge.message}
                        {zonalNudge.type === 'discourage' && zonalNudge.arrow && (
                          <div className="mt-1 text-center font-bold text-lg animate-pulse">
                            {zonalNudge.arrow}
                          </div>
                        )}
                      </div>
                      {/* Arrow pointing to target zone */}
                      {zonalNudge.type === 'discourage' && zonalNudge.targetZone && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                          <div className="text-xs text-orange-300 font-medium bg-slate-800 px-2 py-1 rounded border">
                            → {zonalNudge.targetZone.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Train representation */}
          <div className="flex justify-center gap-2">
            <div className="w-20 h-10 bg-slate-600 rounded border flex items-center justify-center text-xs">
              Car 1<br/>{trainLoad.carriage1}
            </div>
            <div className="w-20 h-10 bg-slate-600 rounded border flex items-center justify-center text-xs">
              Car 2<br/>{trainLoad.carriage2}
            </div>
            <div className="w-20 h-10 bg-slate-600 rounded border flex items-center justify-center text-xs">
              Car 3<br/>{trainLoad.carriage3}
            </div>
          </div>

          {/* Active nudge visualization with flow indicators */}
          {nudgePhase === 'nudging' && currentScenario.needsNudging && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 bg-yellow-500/30 border border-yellow-400 rounded-lg p-3 animate-pulse">
                <div className="flex items-center gap-2 mb-1">
                  <Volume2 className="w-4 h-4 text-yellow-300" />
                  <span className="text-xs text-yellow-300 font-medium">Audio Announcement</span>
                </div>
                <div className="text-xs text-yellow-200">
                  {currentScenario.weatherMessage ? 
                    `"${currentScenario.weatherMessage}"` : 
                    `"Please move to ${currentScenario.targetZones.join(' and ')} zones for faster boarding"`
                  }
                </div>
              </div>
              
              <div className="absolute top-4 right-4 bg-blue-500/30 border border-blue-400 rounded-lg p-3 animate-pulse">
                <div className="flex items-center gap-2 mb-1">
                  <Smartphone className="w-4 h-4 text-blue-300" />
                  <span className="text-xs text-blue-300 font-medium">Mobile Notifications</span>
                </div>
                <div className="text-xs text-blue-200">{Math.floor(platformData.total * 0.73)} notifications sent</div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-green-500/30 border border-green-400 rounded-lg p-3 animate-pulse">
                <div className="flex items-center gap-2 mb-1">
                  <Lightbulb className="w-4 h-4 text-green-300" />
                  <span className="text-xs text-green-300 font-medium">LED Platform Lighting</span>
                </div>
                <div className="text-xs text-green-200">Green zones: {currentScenario.targetZones.join(', ')}</div>
              </div>

              {/* Passenger flow indicators */}
              <div className="absolute bottom-4 right-4 bg-purple-500/30 border border-purple-400 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-purple-300" />
                  <span className="text-xs text-purple-300 font-medium">Live Passenger Flow</span>
                </div>
                <div className="text-xs text-purple-200 space-y-1">
                  {currentScenario.excludeZones.map((zone, idx) => {
                    const targetZone = currentScenario.targetZones[idx % currentScenario.targetZones.length];
                    return (
                      <div key={zone} className="flex items-center gap-1">
                        <span>{zone.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="animate-pulse">→</span>
                        <span>{targetZone?.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-sm text-slate-400">
          Total passengers: <span className="text-white font-medium">{platformData.total}</span> | 
          Distribution status: <span className={`font-medium ${currentScenario.needsNudging ? 'text-yellow-400' : 'text-green-400'}`}>
            {currentScenario.needsNudging ? 'Imbalanced' : 'Balanced'}
          </span>
        </div>
      </div>

      {/* Information Screens Display */}
      <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Monitor className="w-5 h-5 text-blue-400" />
          Platform Information Screens
        </h3>
        <div className="bg-black rounded-lg p-4 border-2 border-blue-500">
          <div className="text-center">
            <div className="text-yellow-400 text-lg font-mono mb-2">🚂 PLATFORM 9 🚂</div>
            <div className="text-white text-sm font-medium">
              {getScreenContent(
                currentScenario.needsNudging,
                nudgePhase,
                currentScenario.targetZones,
                currentScenario.weatherMessage
              )}
            </div>
            {nudgePhase === 'nudging' && currentScenario.needsNudging && (
              <div className="mt-2 text-green-400 text-xs animate-pulse">
                FOLLOW GREEN PLATFORM LIGHTS FOR OPTIMAL BOARDING
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformMonitor;