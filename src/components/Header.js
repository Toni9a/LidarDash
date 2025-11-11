// src/components/Header.js
import React from 'react';
import { RefreshCw, Play, Pause, Video, ArrowLeft } from 'lucide-react';
import TrainToggle from './TrainToggle'; // NEW IMPORT

const Header = ({ onGoBack, onShowVideo, onRefreshScenario, isPaused, onTogglePause, isSystemActive }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur border-b border-slate-700 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Back button */}
        <button 
          onClick={onGoBack}
          className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center flex-1">
          <h1 className="text-2xl font-bold text-sky-300 mb-1">
            Intelligent Platform Nudging System
          </h1>
          <p className="text-slate-400 text-sm">Bristol Temple Meads - Platform 9</p>
        </div>

        <div className="flex items-center gap-4">
          {/* ONLY NEW ADDITION: Theme Toggle */}
          <TrainToggle />
          
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
            <span className="text-sm font-medium">
              {isSystemActive ? 'System Active' : 'System Offline'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;