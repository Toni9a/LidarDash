import React from 'react';
import { RefreshCw, Play, Pause, Video } from 'lucide-react';

const Header = ({ 
  onShowVideo, 
  onRefreshScenario, 
  isPaused, 
  onTogglePause, 
  isSystemActive 
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Intelligent Platform Nudging System
        </h1>
        <p className="text-slate-300">Bristol Temple Meads - Platform 9</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onShowVideo}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all"
        >
          <Video className="w-4 h-4" />
          View LiDAR Feed
        </button>
        <button
          onClick={onRefreshScenario}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Switch Scenario
        </button>
        <button
          onClick={onTogglePause}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            isPaused ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700'
          }`}
        >
          {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isSystemActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-sm">{isSystemActive ? 'System Active' : 'System Offline'}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;