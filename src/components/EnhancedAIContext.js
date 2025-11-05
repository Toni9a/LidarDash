// src/components/EnhancedAIContext.js
import React from 'react';
import { Calendar, Globe, TrendingUp } from 'lucide-react';

const EnhancedAIContext = ({ currentScenario }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700">
      <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Calendar className="w-4 h-4 text-purple-400" />
        AI Context Analysis
      </h4>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-300">Pattern Confidence:</span>
          <span className="text-purple-400 font-semibold">{currentScenario.confidence}%</span>
        </div>
        
        <div className="text-xs text-slate-400 bg-slate-700 rounded p-3">
          <div className="font-semibold text-slate-300 mb-1">Historical Baseline:</div>
          {currentScenario.baseline}
        </div>

        {currentScenario.webScrapedContext && (
          <div className="text-xs text-slate-400 bg-slate-700 rounded p-3">
            <div className="font-semibold text-slate-300 mb-1 flex items-center gap-1">
              <Globe className="w-3 h-3" />
              Web Context:
            </div>
            {currentScenario.webScrapedContext}
          </div>
        )}

        <div className="text-xs text-slate-400 bg-slate-700 rounded p-3">
          <div className="font-semibold text-slate-300 mb-1">Decision:</div>
          {currentScenario.nudgingReason}
        </div>
      </div>
    </div>
  );
};

export default EnhancedAIContext;