import React from 'react';
import { Train } from 'lucide-react';

const TrainSchedule = ({ currentScenario, trainLoad }) => {
  const carriageCount = currentScenario.trainCarriages || 3;
  const trainConfig = currentScenario.trainConfig || "Class 387 - 3 carriages";
  const totalCapacity = carriageCount * 60;

  return (
    <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Train className="w-5 h-5 text-blue-400" />
        Incoming Trains - Platform 9
      </h3>
      
      <div className="space-y-3">
        {/* Current Train */}
        <div className="bg-green-500/20 border border-green-500 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-6 bg-green-500 rounded flex items-center justify-center text-xs font-bold">
                🚂
              </div>
              <div>
                <div className="text-green-400 font-bold">LONDON PADDINGTON</div>
                <div className="text-xs text-green-300">{trainConfig}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-green-400 font-bold text-lg">ARRIVING</div>
              <div className="text-xs text-green-300">On Time</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-2">
              <span className="text-green-300">Ticket Sales:</span>
              <span className={`px-2 py-1 rounded font-medium ${
                currentScenario.name === 'Concert Event' || 
                currentScenario.name === 'Taylor Swift Concert + Football' ? 'bg-red-500/30 text-red-300' :
                currentScenario.name === 'Rugby Match + Rain' ||
                currentScenario.name === 'Champions League + Rain' ? 'bg-yellow-500/30 text-yellow-300' :
                currentScenario.name === 'School Hours + Rain' ||
                currentScenario.name === 'University Graduation' ? 'bg-orange-500/30 text-orange-300' :
                'bg-green-500/30 text-green-300'
              }`}>
                {currentScenario.name === 'Concert Event' || 
                 currentScenario.name === 'Taylor Swift Concert + Football' ? 'VERY HIGH' :
                 currentScenario.name === 'Rugby Match + Rain' ||
                 currentScenario.name === 'Champions League + Rain' ? 'HIGH' :
                 currentScenario.name === 'School Hours + Rain' ||
                 currentScenario.name === 'University Graduation' ? 'MEDIUM' : 'NORMAL'}
              </span>
            </div>
            <div className="text-green-300">
              Load: {Object.values(trainLoad).reduce((a, b) => a + b, 0)}/{totalCapacity} passengers
            </div>
          </div>

          {/* Dynamic carriage display */}
          <div className="mt-2 grid gap-1" style={{ gridTemplateColumns: `repeat(${carriageCount}, 1fr)` }}>
            {Array.from({ length: carriageCount }, (_, i) => (
              <div key={i} className="bg-slate-700 rounded p-1 text-center text-xs">
                <div className="text-white">Car {i + 1}</div>
                <div className="text-green-400">{trainLoad[`carriage${i + 1}`] || 0}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Train */}
        <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-6 bg-yellow-500 rounded flex items-center justify-center text-xs font-bold">
                🚂
              </div>
              <div>
                <div className="text-yellow-400 font-bold">BRISTOL PARKWAY</div>
                <div className="text-xs text-yellow-300">Service 1C78 • 4 Cars • Class 800</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-yellow-400 font-bold text-lg">6 MIN</div>
              <div className="text-xs text-yellow-300">Expected</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-yellow-300">Ticket Sales:</span>
              <span className="px-2 py-1 rounded font-medium bg-green-500/30 text-green-300">LOW</span>
            </div>
            <div className="text-yellow-300">Load: 68/240 passengers</div>
          </div>
        </div>

        {/* Following Train */}
        <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-6 bg-blue-500 rounded flex items-center justify-center text-xs font-bold">
                🚂
              </div>
              <div>
                <div className="text-blue-400 font-bold">LONDON PADDINGTON</div>
                <div className="text-xs text-blue-300">Service 1W17 • 3 Cars • Class 387</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-blue-400 font-bold text-lg">18 MIN</div>
              <div className="text-xs text-blue-300">Scheduled</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-blue-300">Ticket Sales:</span>
              <span className="px-2 py-1 rounded font-medium bg-yellow-500/30 text-yellow-300">MEDIUM</span>
            </div>
            <div className="text-blue-300">Pre-book: 95/180 seats</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainSchedule;