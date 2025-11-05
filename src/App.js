// src/App.js
import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Settings, TrendingUp, Train, Monitor } from 'lucide-react';
import { scenarios, getTrainLoadForScenario } from './data/scenarios';
import Header from './components/Header';
import VideoModal from './components/VideoModal';
import SystemStatus from './components/SystemStatus';
import PlatformMonitor from './components/PlatformMonitor';
import TrainSchedule from './components/TrainSchedule';
import EnhancedAIContext from './components/EnhancedAIContext';
import SystemActivityLog from './components/SystemActivityLog';

const TrainDwellDashboard = () => {
  const [isSystemActive, setIsSystemActive] = useState(true);
  const [currentTime, setCurrentTime] = useState(35);
  const [nudgePhase, setNudgePhase] = useState('monitoring');
  const [autoMode, setAutoMode] = useState(true);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [passengerMovement, setPassengerMovement] = useState({}); // Track movement animations
  const [dwellStartTime, setDwellStartTime] = useState(null); // Track when train arrives
  const [currentDwellTime, setCurrentDwellTime] = useState(0); // Live dwell time

  const currentScenario = scenarios[scenarioIndex];
  const [trainLoad, setTrainLoad] = useState(getTrainLoadForScenario(scenarioIndex));
  const [platformData, setPlatformData] = useState(currentScenario.platformData);

  // Update scenario data when scenario changes
  useEffect(() => {
    setPlatformData(currentScenario.platformData);
    setTrainLoad(getTrainLoadForScenario(scenarioIndex));
    setCurrentTime(35);
    setNudgePhase('monitoring');
    setPassengerMovement({});
    setDwellStartTime(null);
    setCurrentDwellTime(0);
  }, [scenarioIndex, currentScenario.platformData]);

  // TIMER with live passenger movement animations
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
              // Start gradual passenger redistribution with animations
              simulatePassengerMovement(5); // 5 seconds of gradual movement
            }, 8000);
          } else if (newTime === 70) {
            setNudgePhase('optimizing');
            // Continue small redistributions
            simulatePassengerMovement(3);
          } else if (newTime === 90) {
            setNudgePhase('boarding');
            // START DWELL TIME TRACKING when train arrives
            setDwellStartTime(newTime);
          } else if (newTime >= 100 && newTime <= 170) {
            // BOARDING PHASE - Numbers go down as people board
            const shouldBoard = (newTime - 100) % 3 === 0;
            if (shouldBoard) {
              setBoardingMovement();
            }
          }
        } else {
          if (newTime === 40) {
            setNudgePhase('monitoring_only');
          } else if (newTime === 90) {
            setNudgePhase('boarding');
            // START DWELL TIME TRACKING when train arrives
            setDwellStartTime(newTime);
          } else if (newTime >= 100 && newTime <= 170) {
            const shouldBoard = (newTime - 100) % 3 === 0;
            if (shouldBoard) {
              setBoardingMovement();
            }
          }
        }
        
        // Update live dwell time if train is at platform
        if (dwellStartTime !== null && newTime >= dwellStartTime) {
          setCurrentDwellTime(newTime - dwellStartTime);
        }
        
        // Reset when cycle completes
        if (newTime > 180) {
          setDwellStartTime(null);
          setCurrentDwellTime(0);
          return 35;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentScenario, scenarioIndex, isPaused]);

  // Simulate gradual passenger movement with live updates
  const simulatePassengerMovement = (durationSeconds) => {
    const movementInterval = setInterval(() => {
      setPlatformData(prev => {
        const newData = { ...prev };
        let hasMovement = false;
        
        currentScenario.excludeZones.forEach(zone => {
          if (newData[zone] > 0) {
            const moveCount = Math.min(3, Math.floor(newData[zone] * 0.1)); // Move 3 people max per second
            if (moveCount > 0) {
              newData[zone] = Math.max(0, newData[zone] - moveCount);
              
              // Distribute to target zones
              if (currentScenario.targetZones.length > 0) {
                const perTarget = Math.ceil(moveCount / currentScenario.targetZones.length);
                currentScenario.targetZones.forEach(target => {
                  newData[target] = newData[target] + perTarget;
                });
              }
              
              // Set movement animation
              setPassengerMovement(prevMovement => ({
                ...prevMovement,
                [zone]: { direction: 'out', count: moveCount, timestamp: Date.now() }
              }));
              
              hasMovement = true;
            }
          }
        });
        
        newData.total = newData.farEast + newData.east + newData.central + newData.west + newData.farWest;
        return newData;
      });
    }, 1000);

    // Stop movement after duration
    setTimeout(() => {
      clearInterval(movementInterval);
      setPassengerMovement({});
    }, durationSeconds * 1000);
  };

  // Simulate boarding movement with scenario-dependent boarding rates
  const setBoardingMovement = () => {
    setPlatformData(prev => {
      const newData = { ...prev };
      const zones = ['farEast', 'east', 'central', 'west', 'farWest'];
      
      // Scenario-dependent boarding percentage (not everyone boards this train)
      const scenarioBoardingRates = {
        'Rugby Match + Rain': 0.85, // Most people board - event ending
        'Tuesday Rush Hour': 0.75, // Some waiting for different lines
        'School Hours + Rain': 0.80, // Most students going home
        'Late Night Service': 0.90, // Almost everyone boards - limited service
        'Concert Event': 0.88, // Most people leaving event
        'Taylor Swift Concert + Football': 0.82, // Mixed destinations
        'Champions League + Rain': 0.85, // Most heading same direction
        'University Graduation': 0.70, // Families going various places
      };
      
      const baseBoardingRate = scenarioBoardingRates[currentScenario.name] || 0.75;
      
      zones.forEach(zone => {
        if (newData[zone] > 0) {
          // FIXED: Only allow boarding from zones that have train cars
          const zoneIndex = zones.indexOf(zone);
          const carriageCount = currentScenario.trainCarriages || 3;
          const hasTrainCar = zoneIndex >= 1 && zoneIndex <= carriageCount; // East, Central, West for 3-car train
          
          if (!hasTrainCar) return; // Skip boarding for zones without train cars
          
          // Zone efficiency modifier
          let zoneEfficiency = 1.0;
          if (currentScenario.targetZones.includes(zone)) {
            zoneEfficiency = 1.3; // Faster boarding in optimized zones
          } else if (currentScenario.excludeZones.includes(zone)) {
            zoneEfficiency = 0.7; // Slower in overcrowded zones
          }
          
          // Simple realistic boarding: 0.9 passengers per second per zone
          const baseBoarding = 0.9; // Base rate: 0.9 passengers per second
          let actualBoardingRate = baseBoarding;
          
          if (currentScenario.targetZones.includes(zone)) {
            actualBoardingRate = baseBoarding * 1.3; // 1.17 per second in optimized zones
          } else if (currentScenario.excludeZones.includes(zone)) {
            actualBoardingRate = baseBoarding * 0.7; // 0.63 per second in crowded zones
          }
          
          const boardersThisRound = Math.min(newData[zone], Math.floor(actualBoardingRate));
          
          if (boardersThisRound > 0) {
            newData[zone] = Math.max(0, newData[zone] - boardersThisRound);
            
            // Set boarding animation
            setPassengerMovement(prevMovement => ({
              ...prevMovement,
              [zone]: { direction: 'boarding', count: boardersThisRound, timestamp: Date.now() }
            }));
          }
        }
      });
      
      // Recalculate total
      newData.total = newData.farEast + newData.east + newData.central + newData.west + newData.farWest;
      return newData;
    });
    
    // Clear animations after 2 seconds
    setTimeout(() => {
      setPassengerMovement({});
    }, 2000);
  };

  const refreshScenario = () => {
    setScenarioIndex((prev) => (prev + 1) % scenarios.length);
  };

  // Calculate dynamic distribution status
  const getDistributionStatus = () => {
    const counts = [platformData.farEast, platformData.east, platformData.central, platformData.west, platformData.farWest];
    const average = counts.reduce((a, b) => a + b, 0) / counts.length;
    const variance = counts.reduce((sum, count) => sum + Math.pow(count - average, 2), 0) / counts.length;
    const standardDeviation = Math.sqrt(variance);
    
    // If standard deviation is low, distribution is balanced
    return standardDeviation < 8 ? 'Balanced' : 'Imbalanced';
  };

  const getScreenContent = (needsNudging, phase, targetZones, weatherMessage) => {
    if (phase === 'boarding') return '🚂 BOARDING NOW - DOORS OPEN 🚂';
    if (phase === 'nudging') {
      return needsNudging 
        ? `BOARD HERE: ${targetZones.map(z => z.replace(/([A-Z])/g, ' $1')).join(' & ')} ZONES • Shorter queues available`
        : 'Please spread along platform';
    }
    if (phase === 'optimizing') {
      return 'Passengers moving to optimal positions • Boarding starts soon';
    }
    if (phase === 'analyzing') {
      return 'Analyzing platform conditions • Please wait for guidance';
    }
    if (weatherMessage) return weatherMessage;
    return 'Welcome to Bristol Temple Meads • Next train: 2 minutes • Platform 9';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-4">
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

      {/* FIXED: Better grid layout with scrolling and no cutoff */}
      <div className="grid grid-cols-12 gap-4 max-h-[calc(100vh-120px)] overflow-y-auto">
        {/* Left Column - Platform Visualization */}
        <div className="col-span-8 space-y-4">
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
            passengerMovement={passengerMovement}
            distributionStatus={getDistributionStatus()}
          />

          {/* Platform Information Screens */}
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700">
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Monitor className="w-4 h-4 text-blue-400" />
              Platform Information Screens
            </h4>
            <div className="bg-black rounded-lg p-4 border-2 border-blue-500">
              <div className="text-center">
                <div className="text-yellow-400 text-sm mb-2">🚂 PLATFORM 9 🚂</div>
                <div className="text-white text-lg">
                  {getScreenContent(currentScenario.needsNudging, nudgePhase, currentScenario.targetZones, currentScenario.weatherMessage)}
                </div>
              </div>
            </div>
          </div>

          {/* System Activity Log */}
          <SystemActivityLog 
            currentScenario={currentScenario}
            nudgePhase={nudgePhase}
            currentTime={currentTime}
          />
        </div>

        {/* Right Column - Controls and Data - FIXED: Compact spacing */}
        <div className="col-span-4 space-y-3 overflow-y-auto max-h-[calc(100vh-120px)]">
          {/* Current Scenario */}
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-3 border border-slate-700">
            <h4 className="text-base font-semibold mb-2">Current Scenario</h4>
            <div className="bg-slate-700 rounded-lg p-2">
              <div className="flex items-center gap-2 mb-1">
                {currentScenario.icon.map((Icon, idx) => (
                  <Icon key={idx} className="w-4 h-4 text-blue-400" />
                ))}
                <span className="font-medium text-blue-300 text-sm">{currentScenario.name}</span>
              </div>
              <div className="text-xs text-slate-400">{currentScenario.context}</div>
            </div>
          </div>

          {/* Train Schedule */}
          <TrainSchedule 
            currentScenario={currentScenario}
            trainLoad={trainLoad}
          />

          {/* Enhanced AI Context Analysis */}
          <EnhancedAIContext currentScenario={currentScenario} />

          {/* Train Load Data */}
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-3 border border-slate-700">
            <h4 className="text-base font-semibold mb-2 flex items-center gap-2">
              <Train className="w-4 h-4 text-blue-400" />
              Incoming Train (APC Data)
            </h4>
            <div className="space-y-1">
              {Object.entries(trainLoad).map(([carriage, load]) => (
                <div key={carriage} className="flex items-center justify-between">
                  <span className="text-xs capitalize">{carriage.replace(/([0-9])/g, ' $1')}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-12 bg-slate-700 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all ${load > 40 ? 'bg-red-500' : load > 30 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${(load / 60) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs w-6">{load}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Decision Engine */}
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-3 border border-slate-700">
            <h4 className="text-base font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              AI Nudge Engine
            </h4>
            <div className="space-y-2">
              {currentScenario.needsNudging ? (
                <>
                  <div className="bg-slate-700 rounded-lg p-2">
                    <div className="text-xs font-medium text-green-400 mb-1">Recommended Action:</div>
                    <div className="text-xs">
                      {currentScenario.zonalNudging ? 'Zonal-Specific Nudging' : 'Global Platform Nudge'}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Target: {currentScenario.targetZones.map(z => z.replace(/([A-Z])/g, ' $1').trim()).join(', ') || 'None'}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs font-medium text-blue-400 mb-1">Active Methods:</div>
                    <div className="space-y-1">
                      {['LED Platform Lighting', 'Mobile Notifications', 'Audio Announcement'].map((method, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <div className={`w-1.5 h-1.5 rounded-full ${(nudgePhase === 'nudging' || nudgePhase === 'optimizing') && currentScenario.needsNudging ? 'bg-green-400 animate-pulse' : 'bg-slate-500'}`}></div>
                          <span className={(nudgePhase === 'nudging' || nudgePhase === 'optimizing') && currentScenario.needsNudging ? 'text-green-300' : 'text-slate-400'}>{method}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-2">
                  <div className="text-xs font-medium text-green-400 mb-1">No Intervention Required</div>
                  <div className="text-xs text-green-300">Platform distribution within optimal parameters</div>
                </div>
              )}
            </div>
          </div>

          {/* Performance Prediction */}
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-3 border border-slate-700">
            <h4 className="text-base font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              Performance Metrics
            </h4>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-300">Predicted Dwell Time:</span>
                <span className={`font-bold text-sm ${currentScenario.needsNudging ? 'text-green-400' : 'text-blue-400'}`}>
                  {currentScenario.needsNudging ? '147s' : '162s'}
                </span>
              </div>
              {dwellStartTime !== null && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-300">Current Dwell Time:</span>
                  <span className="font-bold text-sm text-yellow-400">
                    {currentDwellTime}s
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-300">Baseline (No System):</span>
                <span className="font-medium text-slate-400 text-sm">
                  {currentScenario.name === 'Concert Event' ? '245s' : 
                   currentScenario.name === 'School Hours + Rain' ? '198s' : 
                   currentScenario.name === 'Rugby Match + Rain' ? '183s' : '162s'}
                </span>
              </div>
              {currentScenario.needsNudging && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-300">Expected Improvement:</span>
                  <span className="font-bold text-purple-400 text-sm">
                    -{currentScenario.name === 'Concert Event' ? '40' : 
                      currentScenario.name === 'School Hours + Rain' ? '26' : '20'}%
                  </span>
                </div>
              )}
              <div className="mt-2 p-2 bg-blue-500/20 border border-blue-500/30 rounded text-xs">
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
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-3 border border-slate-700">
            <h4 className="text-base font-semibold mb-2 flex items-center gap-2">
              <Settings className="w-4 h-4 text-orange-400" />
              Manual Controls
            </h4>
            <div className="space-y-2">
              <button 
                className={`w-full py-1.5 rounded-lg font-medium text-sm transition-all ${
                  autoMode ? 'bg-slate-600 text-slate-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                }`}
                disabled={autoMode}
              >
                Emergency Stop All Nudging
              </button>
              <button 
                className={`w-full py-1.5 rounded-lg font-medium text-sm transition-all ${
                  autoMode ? 'bg-slate-600 text-slate-400 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-700'
                }`}
                disabled={autoMode}
              >
                Override Zone Selection
              </button>
              <button 
                className={`w-full py-1.5 rounded-lg font-medium text-sm transition-all ${
                  autoMode ? 'bg-slate-600 text-slate-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                }`}
                disabled={autoMode}
              >
                Adjust Weather Messaging
              </button>
            </div>
            {autoMode && (
              <div className="mt-2 text-xs text-slate-400 text-center">
                Switch to Manual Mode to enable controls
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainDwellDashboard;