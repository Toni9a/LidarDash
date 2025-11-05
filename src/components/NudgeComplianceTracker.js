// src/components/NudgeComplianceTracker.js - New component to show compliance rates
import React from 'react';
import { TrendingUp, Users, CheckCircle } from 'lucide-react';

const NudgeComplianceTracker = ({ currentScenario, nudgePhase }) => {
  const complianceRate = currentScenario.nudgeComplianceRate || 0.7; // 70% default
  
  if (nudgePhase !== 'nudging' && nudgePhase !== 'optimizing') return null;
  
  return (
    <div className="bg-purple-900/30 border border-purple-600 rounded-lg p-4 mt-4">
      <div className="flex items-center gap-2 text-purple-400 font-medium mb-3">
        <TrendingUp className="w-4 h-4" />
        Live Nudge Compliance
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-purple-300 text-lg font-bold">{Math.floor(complianceRate * 100)}%</div>
          <div className="text-xs text-purple-400">Following Nudges</div>
        </div>
        <div>
          <div className="text-orange-300 text-lg font-bold">{Math.floor((1 - complianceRate) * 100)}%</div>
          <div className="text-xs text-orange-400">Ignoring Nudges</div>
        </div>
        <div>
          <div className="text-green-300 text-lg font-bold">
            {nudgePhase === 'optimizing' ? '85%' : '72%'}
          </div>
          <div className="text-xs text-green-400">Effectiveness</div>
        </div>
      </div>
    </div>
  );
};

export default NudgeComplianceTracker;