import React from 'react';
import { Clock, Zap } from 'lucide-react';
import { getPhaseStatus } from '../utils/helpers';

const SystemStatus = ({ currentTime, isPaused, nudgePhase }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-400" />
          System Status {isPaused && <span className="text-yellow-400">(PAUSED)</span>}
        </h3>
        <div className="text-2xl font-mono text-blue-300">T-{Math.max(0, 90-currentTime)}s</div>
      </div>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Zap className={`w-5 h-5 ${(nudgePhase === 'nudging' || nudgePhase === 'analyzing') ? 'text-yellow-400 animate-pulse' : 'text-gray-400'}`} />
          <span className="font-medium">{getPhaseStatus(nudgePhase)}</span>
        </div>
        {nudgePhase === 'analyzing' && (
          <div className="flex items-center gap-2 text-yellow-400">
            <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Processing LiDAR data...</span>
          </div>
        )}
      </div>

      <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(currentTime / 180) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SystemStatus;