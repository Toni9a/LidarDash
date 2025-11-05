// src/components/SystemActivityLog.js
import React from 'react';
import { Terminal } from 'lucide-react';

const SystemActivityLog = ({ currentScenario, nudgePhase, currentTime }) => {
  const getLogEntries = () => {
    const baseEntries = [
      `[T-53s] Historical pattern match: ${currentScenario.confidence}% confidence`,
      `[T-50s] LiDAR scan initiated - ${currentScenario.platformData.total} passengers detected`,
    ];

    if (currentScenario.webScrapedContext) {
      baseEntries.push(`[T-48s] ${currentScenario.webScrapedContext}`);
    }

    baseEntries.push(
      `[T-47s] AI Decision: ${currentScenario.nudgingReason}`,
    );

    if (currentScenario.needsNudging) {
      baseEntries.push(
        `[T-45s] Multi-modal nudge issued: Weather-aware messaging activated`,
        `[T-40s] Passenger redistribution detected in target zones`
      );
    }

    baseEntries.push(`[T-12s] System monitoring active...`);
    
    return baseEntries;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700">
      <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Terminal className="w-4 h-4 text-green-400" />
        System Activity Log
      </h4>
      <div className="bg-slate-900 rounded-lg p-3 font-mono text-sm space-y-1 max-h-32 overflow-y-auto">
        {getLogEntries().map((entry, idx) => (
          <div key={idx} className="text-green-400">
            {entry}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemActivityLog;