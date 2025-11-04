export const getZoneColor = (zone, count, nudgePhase, targetZones, excludeZones) => {
    if (nudgePhase === 'nudging' && targetZones.includes(zone)) {
      return 'bg-green-500 ring-2 ring-green-300 animate-pulse';
    }
    if (excludeZones.includes(zone)) {
      return 'bg-red-500';
    }
    
    if (count > 40) return 'bg-red-600';
    if (count > 30) return 'bg-red-500';
    if (count > 20) return 'bg-yellow-500';
    if (count > 15) return 'bg-blue-400';
    return 'bg-green-400';
  };
  
  export const getPhaseStatus = (nudgePhase) => {
    switch (nudgePhase) {
      case 'monitoring': return 'Monitoring Platform Activity';
      case 'analyzing': return 'LiDAR Scan & AI Analysis';
      case 'nudging': return 'Issuing Targeted Nudge Instructions';
      case 'optimizing': return 'Passenger Redistribution in Progress';
      case 'boarding': return 'Active Boarding Phase';
      case 'monitoring_only': return 'Monitoring Only - No Intervention Needed';
      default: return 'System Ready';
    }
  };
  
  export const getZonalNudgeInfo = (zone, needsNudging, nudgePhase, targetZones, excludeZones) => {
    if (!needsNudging || nudgePhase !== 'nudging') return null;
    
    if (targetZones.includes(zone)) {
      return { type: 'encourage', message: 'Board here', arrow: null };
    }
    if (excludeZones.includes(zone)) {
      const zoneIndex = ['farEast', 'east', 'central', 'west', 'farWest'].indexOf(zone);
      const targetIndices = targetZones.map(z => ['farEast', 'east', 'central', 'west', 'farWest'].indexOf(z));
      
      let direction = '';
      let targetZone = '';
      
      if (targetIndices.length > 0) {
        const closestTargetIndex = targetIndices.reduce((closest, current) => 
          Math.abs(current - zoneIndex) < Math.abs(closest - zoneIndex) ? current : closest
        );
        
        const closestTarget = ['farEast', 'east', 'central', 'west', 'farWest'][closestTargetIndex];
        targetZone = closestTarget;
        
        if (closestTargetIndex < zoneIndex) {
          direction = '←';
        } else if (closestTargetIndex > zoneIndex) {
          direction = '→';
        }
      }
      
      return { 
        type: 'discourage', 
        message: `Move ${direction} to ${targetZone.replace(/([A-Z])/g, ' $1').trim()}`,
        arrow: direction,
        targetZone: targetZone
      };
    }
    return null;
  };
  
  export const getScreenContent = (needsNudging, nudgePhase, targetZones, weatherMessage) => {
    if (!needsNudging) {
      return "Welcome to Bristol Temple Meads • Next train: 2 minutes • Platform 9";
    }
    
    if (nudgePhase === 'nudging') {
      const targetZoneNames = targetZones.map(z => 
        z.replace(/([A-Z])/g, ' $1').trim().toUpperCase()
      ).join(' & ');
      
      return `BOARD HERE: ${targetZoneNames} ZONES • ${weatherMessage || 'Shorter queues available'}`;
    }
    
    return "Analyzing platform conditions • Please wait for boarding guidance";
  };