// src/components/PlatformMonitor.js
import React from 'react';
import { Users, Train, ArrowLeft, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { getZoneColor, getZonalNudgeInfo } from '../utils/helpers';

const PlatformMonitor = ({ platformData, trainLoad, nudgePhase, currentScenario, passengerMovement, distributionStatus }) => {
  const zones = ['farEast', 'east', 'central', 'west', 'farWest'];
  const zoneLabels = ['Far East', 'East', 'Central', 'West', 'Far West'];
  const carriageCount = currentScenario.trainCarriages || 3;

  return (
    <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5 text-blue-400" />
        <h3 className="text-xl font-semibold">Live Platform Monitor</h3>
      </div>

      {/* Platform Zone Visualization */}
      <div className="relative mb-8">
        {/* Platform zones with consistent sizing */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {zones.map((zone, idx) => {
            const count = platformData[zone];
            const nudgeInfo = getZonalNudgeInfo(
              zone, 
              currentScenario.needsNudging, 
              nudgePhase, 
              currentScenario.targetZones, 
              currentScenario.excludeZones
            );
            
            return (
              <div key={zone} className="relative">
                {/* Zone card - consistent sizing with train */}
                <div className={`
                  ${getZoneColor(zone, count, nudgePhase, currentScenario.targetZones, currentScenario.excludeZones)}
                  rounded-lg p-4 text-center text-white font-bold shadow-lg h-[100px] flex flex-col justify-center relative
                `}>
                  {/* Passenger icon */}
                  <div className="flex justify-center mb-1">
                    <Users className="w-5 h-5" />
                  </div>
                  
                  {/* Count with smooth transitions */}
                  <div className="text-xl font-bold mb-1 transition-all duration-1000 ease-in-out">
                    {count}
                  </div>
                  
                  {/* Zone label */}
                  <div className="text-xs opacity-90">{zoneLabels[idx]}</div>
                  
                  {/* Movement animations - FIXED: Only show boarding if there's a car underneath */}
                  {passengerMovement[zone] && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-bounce">
                      {passengerMovement[zone].direction === 'out' && (
                        <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                          <span>-{passengerMovement[zone].count}</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      )}
                      {passengerMovement[zone].direction === 'boarding' && (
                        // Only show boarding animation if there's actually a train car for this zone
                        (() => {
                          const zoneIndex = zones.indexOf(zone);
                          const carriageCount = currentScenario.trainCarriages || 3;
                          const hasTrainCar = zoneIndex >= 1 && zoneIndex <= carriageCount; // East, Central, West for 3-car train
                          
                          return hasTrainCar ? (
                            <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                              <span>-{passengerMovement[zone].count}</span>
                              <div className="w-3 h-3 text-center">🚂</div>
                            </div>
                          ) : null;
                        })()
                      )}
                    </div>
                  )}
                  
                  {/* Nudge indicator */}
                  {nudgeInfo && (
                    <div className="absolute -top-2 -right-2">
                      {nudgeInfo.type === 'encourage' ? 
                        <CheckCircle className="w-5 h-5 text-green-300 bg-green-600 rounded-full p-1" /> :
                        <AlertTriangle className="w-5 h-5 text-orange-300 bg-orange-600 rounded-full p-1" />
                      }
                    </div>
                  )}
                </div>

                {/* Nudge instructions below zone */}
                {nudgeInfo && nudgePhase === 'nudging' && (
                  <div className={`mt-2 text-center text-xs font-medium px-2 py-1 rounded ${
                    nudgeInfo.type === 'encourage' ? 'bg-green-600 text-white' : 'bg-orange-600 text-white'
                  }`}>
                    {nudgeInfo.type === 'encourage' ? 'Board here' : (
                      <div className="flex items-center justify-center gap-1">
                        {nudgeInfo.arrow === '←' && <ArrowLeft className="w-3 h-3" />}
                        Move {nudgeInfo.arrow}
                        {nudgeInfo.arrow === '→' && <ArrowRight className="w-3 h-3" />}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Enhanced Platform edge with train visualization */}
        <div className="relative">
          {/* Yellow platform edge line */}
          <div className="w-full h-2 bg-yellow-400 mb-4 relative rounded-sm">
            <div className="absolute left-1/2 -top-3 transform -translate-x-1/2">
              <Train className="w-6 h-6 text-yellow-400" />
            </div>
            {/* Platform edge dots */}
            <div className="absolute inset-0 flex justify-between items-center px-4">
              {Array.from({length: 9}).map((_, i) => (
                <div key={i} className="w-1 h-1 bg-yellow-600 rounded-full"></div>
              ))}
            </div>
          </div>

          {/* Train carriages - train-shaped with 2 doors each */}
          <div className="flex justify-center gap-2">
            {Array.from({ length: carriageCount }, (_, i) => (
              <div key={i} className="relative">
                {/* Train carriage shape */}
                <div className="bg-slate-600 rounded-lg shadow-lg border-2 border-slate-500 relative h-[100px] flex flex-col justify-center text-center min-w-[140px]">
                  {/* Carriage roof */}
                  <div className="absolute -top-1 left-2 right-2 h-2 bg-slate-500 rounded-t-lg"></div>
                  
                  {/* Carriage windows - FIXED: Only 2 windows now */}
                  <div className="absolute top-2 left-4 right-4 flex justify-between">
                    <div className="w-4 h-4 bg-blue-200 rounded-sm opacity-70"></div>
                    <div className="w-4 h-4 bg-blue-200 rounded-sm opacity-70"></div>
                  </div>
                  
                  {/* Carriage content */}
                  <div className="z-10 relative">
                    <div className="text-white text-sm font-medium mb-1">Car {i + 1}</div>
                    <div className="text-slate-200 text-lg font-bold">
                      {trainLoad[`carriage${i + 1}`] || 0}
                    </div>
                  </div>
                  
                  {/* Carriage wheels */}
                  <div className="absolute -bottom-2 left-3 right-3 flex justify-between">
                    <div className="w-3 h-3 bg-gray-800 rounded-full border border-gray-600"></div>
                    <div className="w-3 h-3 bg-gray-800 rounded-full border border-gray-600"></div>
                  </div>
                  
                  {/* Door indicators - FIXED: 2 doors per carriage, more spaced out */}
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-green-400 rounded-r"></div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-green-400 rounded-l"></div>
                </div>
                
                {/* Carriage connection */}
                {i < carriageCount - 1 && (
                  <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-4 bg-slate-700 rounded-r"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status summary with passenger flow indicator and boarding info */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex flex-col">
          <span className="text-slate-300">
            Total passengers: <span className="font-bold text-white transition-all duration-1000">{platformData.total}</span>
          </span>
          {nudgePhase === 'boarding' && (
            <span className="text-xs text-slate-400">
              {(() => {
                const scenarioBoardingRates = {
                  'Rugby Match + Rain': 0.85,
                  'Tuesday Rush Hour': 0.75,
                  'School Hours + Rain': 0.80,
                  'Late Night Service': 0.90,
                  'Concert Event': 0.88,
                  'Taylor Swift Concert + Football': 0.82,
                  'Champions League + Rain': 0.85,
                  'University Graduation': 0.70,
                };
                const boardingRate = scenarioBoardingRates[currentScenario.name] || 0.75;
                const expectedRemaining = Math.floor(platformData.total * (1 - boardingRate));
                return `~${expectedRemaining} waiting for other trains`;
              })()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {nudgePhase === 'boarding' && (
            <span className="text-blue-400 text-xs flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              Boarding in progress
            </span>
          )}
          <span className="text-slate-300">
            Distribution status: 
            <span className={`ml-1 font-bold ${
              distributionStatus === 'Balanced' ? 'text-green-400' : 'text-yellow-400'
            }`}>
              {distributionStatus}
            </span>
          </span>
        </div>
      </div>

      {/* Active nudging overlay boxes - FIXED: Show only active methods per scenario */}
      {nudgePhase === 'nudging' && currentScenario.needsNudging && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Audio Announcement - only if active */}
          {currentScenario.activeMethods?.includes('Audio Announcement') && (
            <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-3">
              <div className="flex items-center gap-2 text-yellow-400 font-medium mb-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                Audio Announcement
              </div>
              <div className="text-xs text-yellow-300">
                "For the Bristol train: Please move to {currentScenario.targetZones.map(z => z.replace(/([A-Z])/g, ' $1').toLowerCase()).join(' and ')} zones for faster boarding"
              </div>
            </div>
          )}

          {/* LED Platform Lighting - only if active */}
          {currentScenario.activeMethods?.includes('LED Platform Lighting') && (
            <div className="bg-green-900/30 border border-green-600 rounded-lg p-3">
              <div className="flex items-center gap-2 text-green-400 font-medium mb-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                LED Platform Lighting
              </div>
              <div className="text-xs text-green-300">
                Green zones: {currentScenario.targetZones.join(', ')}
              </div>
            </div>
          )}

          {/* Mobile Notifications - only if active */}
          {currentScenario.activeMethods?.includes('Mobile Notifications') && (
            <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-3">
              <div className="flex items-center gap-2 text-blue-400 font-medium mb-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                Mobile Notifications
              </div>
              <div className="text-xs text-blue-300">
                {Math.floor(platformData.total * 0.7)} notifications sent
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlatformMonitor;