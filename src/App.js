import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Settings, TrendingUp, Train } from 'lucide-react';
import { scenarios, getTrainLoadForScenario } from './data/scenarios';
import Header from './components/Header';
import VideoModal from './components/VideoModal';
import SystemStatus from './components/SystemStatus';
import PlatformMonitor from './components/PlatformMonitor';
import TrainSchedule from './components/TrainSchedule';

const TrainDwellDashboard = () => {
  const [isSystemActive, setIsSystemActive] = useState(true);
  const [currentTime, setCurrentTime] = useState(35);
  const [nudgePhase, setNudgePhase] = useState('monitoring');
  const [autoMode, setAutoMode] = useState(true);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentScenario = scenarios[scenarioIndex];
  const [trainLoad, setTrainLoad] = useState(getTrainLoadForScenario(scenarioIndex));
  const [platformData, setPlatformData] = useState(currentScenario.platformData);

  // Update scenario data when scenario changes
  useEffect(() => {
    setPlatformData(currentScenario.platformData);
    setTrainLoad(getTrainLoadForScenario(scenarioIndex));
    setCurrentTime(35);
    setNudgePhase('monitoring');
  }, [scenarioIndex, currentScenario.platformData]);

  // SLOWER TIMER - 1 second intervals
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 1;
        
        if (currentScenario.needsNudging) {
          if (newTime === 40) {
            setNudgePhase('analyzing');
            setTimeout(() => {
              setNudgePhase('nudging');
              // Simulate passenger redistribution
              setPlatformData(prev => {
                const newData = { ...prev };
                currentScenario.excludeZones.forEach(zone => {
                  const reduction = Math.floor(newData[zone] * 0.15);
                  newData[zone] = Math.max(0, newData[zone] - reduction);
                  if (currentScenario.targetZones.length > 0) {
                    const perTarget = Math.ceil(reduction / currentScenario.targetZones.length);
                    currentScenario.targetZones.forEach(target => {
                      newData[target] = newData[target] + perTarget;
                    });
                  }
                });
                return newData;
              });
            }, 5000); // 5 seconds to see analyzing phase
          } else if (newTime === 60) {
            setNudgePhase('optimizing');
          } else if (newTime === 90) {
            setNudgePhase('boarding');
          }
        } else {
          if (newTime === 40) {
            setNudgePhase('monitoring_only');
          } else if (newTime === 90) {
            setNudgePhase('boarding');
          }
        }
        
        return newTime > 180 ? 35 : newTime; // Reset after completion
      });
    }, 1000); // 1 second intervals

    return () => clearInterval(timer);
  }, [currentScenario, scenarioIndex, isPaused]);

  const refreshScenario = () => {
    setScenarioIndex((prev) => (prev + 1) % scenarios.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-6">
      <Header
        onShowVideo={() => setShowVideo(true)}
        onRefreshScenario={refreshScenario}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused(!isPaused)}
        isSystemActive={isSystemActive}
      />

      <VideoModal 
        showVideo={showVideo} 
        onClose={() => setShowVideo(false)} 
      />

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Platform Visualization */}
        <div className="col-span-8 space-y-6">
          <SystemStatus 
            currentTime={currentTime}
            isPaused={isPaused}
            nudgePhase={nudgePhase}
          />
          
          <PlatformMonitor 
            platformData={platformData}
            trainLoad={trainLoad}
            nudgePhase={nudgePhase}
            currentScenario={currentScenario}
          />
        </div>

        {/* Right Column - Controls and Data */}
        <div className="col-span-4 space-y-6">
          {/* Current Scenario */}
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700">
            <h4 className="text-lg font-semibold mb-3">Current Scenario</h4>
            <div className="bg-slate-700 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                {currentScenario.icon.map((Icon, idx) => (
                  <Icon key={idx} className="w-4 h-4 text-blue-400" />
                ))}
                <span className="font-medium text-blue-300">{currentScenario.name}</span>
              </div>
              <div className="text-xs text-slate-400">{currentScenario.context}</div>
            </div>
          </div>

          {/* Train Schedule */}
          <TrainSchedule 
            currentScenario={currentScenario}
            trainLoad={trainLoad}
          />

          {/* Historical Context */}
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700">
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              AI Context Analysis
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Pattern Confidence:</span>
                <span className="text-purple-400 font-semibold">{currentScenario.confidence}%</span>
              </div>
              <div className="text-xs text-slate-400 bg-slate-700 rounded p-3">
                <div className="text-green-400 text-xs font-medium mb-1">Historical Baseline:</div>
                <div>{currentScenario.baseline}</div>
                <div className="text-slate-500 mt-2">Reference: {currentScenario.date}</div>
                <div className="text-blue-400 text-xs mt-2 font-medium">Decision: {currentScenario.nudgingReason}</div>
              </div>
            </div>
          </div>

          {/* Train Load Data */}
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700">
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Train className="w-4 h-4 text-blue-400" />
              Incoming Train (APC Data)
            </h4>
            <div className="space-y-2">
              {Object.entries(trainLoad).map(([carriage, load]) => (
                <div key={carriage} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{carriage.replace(/([0-9])/g, ' $1')}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${load > 40 ? 'bg-red-500' : load > 30 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${(load / 60) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs w-8">{load}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Decision Engine */}
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700">
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              AI Nudge Engine
            </h4>
            <div className="space-y-3">
              {currentScenario.needsNudging ? (
                <>
                  <div className="bg-slate-700 rounded-lg p-3">
                    <div className="text-sm font-medium text-green-400 mb-1">Recommended Action:</div>
                    <div className="text-sm">
                      {currentScenario.zonalNudging ? 'Zonal-Specific Nudging' : 'Global Platform Nudge'}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Target: {currentScenario.targetZones.map(z => z.replace(/([A-Z])/g, ' $1').trim()).join(', ') || 'None'}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-blue-400 mb-2">Active Methods:</div>
                    <div className="space-y-1">
                      {['LED Platform Lighting', 'Mobile Notifications', 'Audio Announcement'].map((method, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <div className={`w-2 h-2 rounded-full ${(nudgePhase === 'nudging' || nudgePhase === 'optimizing') && currentScenario.needsNudging ? 'bg-green-400 animate-pulse' : 'bg-slate-500'}`}></div>
                          <span className={(nudgePhase === 'nudging' || nudgePhase === 'optimizing') && currentScenario.needsNudging ? 'text-green-300' : 'text-slate-400'}>{method}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                  <div className="text-sm font-medium text-green-400 mb-1">No Intervention Required</div>
                  <div className="text-xs text-green-300">Platform distribution within optimal parameters</div>
                </div>
              )}
            </div>
          </div>

          {/* Performance Prediction */}
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700">
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              Performance Metrics
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Predicted Dwell Time:</span>
                <span className={`font-bold ${currentScenario.needsNudging ? 'text-green-400' : 'text-blue-400'}`}>
                  {currentScenario.needsNudging ? '147s' : '162s'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Baseline (No System):</span>
                <span className="font-medium text-slate-400">
                  {currentScenario.name === 'Concert Event' ? '245s' : 
                   currentScenario.name === 'School Hours + Rain' ? '198s' : 
                   currentScenario.name === 'Rugby Match + Rain' ? '183s' : '162s'}
                </span>
              </div>
              {currentScenario.needsNudging && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Expected Improvement:</span>
                  <span className="font-bold text-purple-400">
                    -{currentScenario.name === 'Concert Event' ? '40' : 
                      currentScenario.name === 'School Hours + Rain' ? '26' : '20'}%
                  </span>
                </div>
              )}
              <div className="mt-3 p-2 bg-blue-500/20 border border-blue-500/30 rounded text-xs">
                <div className={`${currentScenario.effectiveness === 'Very High' ? 'text-green-300' : 
                                currentScenario.effectiveness === 'High' ? 'text-green-400' :
                                currentScenario.effectiveness === 'Medium' ? 'text-yellow-300' : 'text-slate-300'}`}>
                  {currentScenario.needsNudging ? 
                    `✓ ${currentScenario.effectiveness} effectiveness expected for this scenario type` :
                    `ℹ Monitoring only - natural passenger behavior optimal`}
                </div>
              </div>
            </div>
          </div>

          {/* Manual Override Controls */}
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700">
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4 text-orange-400" />
              Manual Controls
            </h4>
            <div className="space-y-3">
              <button 
                className={`w-full py-2 rounded-lg font-medium transition-all ${
                  autoMode ? 'bg-slate-600 text-slate-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                }`}
                disabled={autoMode}
              >
                Emergency Stop All Nudging
              </button>
              <button 
                className={`w-full py-2 rounded-lg font-medium transition-all ${
                  autoMode ? 'bg-slate-600 text-slate-400 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-700'
                }`}
                disabled={autoMode}
              >
                Override Zone Selection
              </button>
              <button 
                className={`w-full py-2 rounded-lg font-medium transition-all ${
                  autoMode ? 'bg-slate-600 text-slate-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                }`}
                disabled={autoMode}
              >
                Adjust Weather Messaging
              </button>
            </div>
            {autoMode && (
              <div className="mt-3 text-xs text-slate-400 text-center">
                Switch to Manual Mode to enable controls
              </div>
            )}
          </div>
        </div>
      </div>

      {/* System Activity Log */}
      <div className="mt-6 bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700">
        <h4 className="text-lg font-semibold mb-3">System Activity Log</h4>
        <div className="text-xs font-mono text-slate-300 space-y-1 max-h-32 overflow-y-auto">
          <div className="text-blue-400">[T-55s] Scenario detected: {currentScenario.context}</div>
          <div className="text-purple-400">[T-53s] Historical pattern match: {currentScenario.confidence}% confidence</div>
          {currentTime >= 40 && <div className="text-green-400">[T-50s] LiDAR scan initiated - {platformData.total} passengers detected</div>}
          {currentTime >= 42 && <div className="text-cyan-400">[T-48s] Weather factor: {currentScenario.weather} - applying contextual adjustments</div>}
          {currentTime >= 43 && currentScenario.needsNudging && (
            <div className="text-purple-400">
              [T-47s] AI Decision: {currentScenario.zonalNudging ? 'Zonal' : 'Global'} nudging to {currentScenario.targetZones.join(', ')} zones
            </div>
          )}
          {currentTime >= 43 && !currentScenario.needsNudging && (
            <div className="text-green-400">[T-47s] AI Decision: No intervention required - distribution optimal</div>
          )}
          {currentTime >= 45 && currentScenario.needsNudging && (
            <div className="text-yellow-400">
              [T-45s] Multi-modal nudge issued: {currentScenario.weatherMessage ? 'Weather-aware messaging activated' : 'Standard nudging protocols'}
            </div>
          )}
          {currentTime >= 50 && currentScenario.needsNudging && (
            <div className="text-green-400">[T-40s] Passenger redistribution detected in target zones</div>
          )}
          <div className="text-slate-400">[T-{90-currentTime}s] {nudgePhase === 'boarding' ? 'Active boarding in progress...' : 'System monitoring active...'}</div>
        </div>
      </div>
    </div>
  );
};

export default TrainDwellDashboard;