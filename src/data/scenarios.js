import { Trophy, CloudRain, Clock, Users, GraduationCap, Sun, Moon } from 'lucide-react';

export const scenarios = [
  {
    name: "Rugby Match + Rain",
    icon: [Trophy, CloudRain],
    context: "Rugby match + Light rain + Evening rush",
    date: "2024-09-15",
    confidence: 87,
    effectiveness: "High",
    baseline: "Heavy clustering East zone, 23% imbalance",
    weather: "rain",
    timeOfDay: "evening",
    event: "rugby",
    platformData: { farEast: 18, east: 35, central: 28, west: 45, farWest: 14, total: 140 },
    needsNudging: true,
    zonalNudging: true,
    targetZones: ['central', 'farWest'],
    excludeZones: ['east', 'west'],
    weatherMessage: "Covered waiting areas available in central and far west zones",
    nudgingReason: "Heavy east/west clustering detected + weather factor"
  },
  {
    name: "Tuesday Rush Hour",
    icon: [Clock, Users],
    context: "Tuesday morning rush + Clear weather + Regular commuters",
    date: "2024-08-27",
    confidence: 94,
    effectiveness: "Medium", 
    baseline: "Balanced distribution, strategic planners dominant",
    weather: "clear",
    timeOfDay: "morning",
    event: "rush",
    platformData: { farEast: 22, east: 28, central: 31, west: 26, farWest: 19, total: 126 },
    needsNudging: false,
    zonalNudging: false,
    targetZones: [],
    excludeZones: [],
    weatherMessage: "",
    nudgingReason: "Well-balanced distribution detected - no intervention needed"
  },
  {
    name: "School Hours + Rain",
    icon: [GraduationCap, CloudRain],
    context: "School finish time + Heavy rain + Mixed demographics",
    date: "2024-07-12",
    confidence: 82,
    effectiveness: "Very High",
    baseline: "Extreme shelter-seeking behavior, 45% imbalance",
    weather: "heavyRain",
    timeOfDay: "afternoon",
    event: "school",
    platformData: { farEast: 12, east: 58, central: 41, west: 19, farWest: 8, total: 138 },
    needsNudging: true,
    zonalNudging: true,
    targetZones: ['farEast', 'west', 'farWest'],
    excludeZones: ['east'],
    weatherMessage: "Covered areas available throughout platform - move to far zones for shorter queues",
    nudgingReason: "Weather-driven overcrowding in sheltered zones"
  },
  {
    name: "Late Night Service",
    icon: [Moon, Users],
    context: "Late evening + Light crowd + Safety considerations",
    date: "2024-08-30",
    confidence: 91,
    effectiveness: "Low",
    baseline: "Natural clustering for safety, minimal intervention",
    weather: "clear",
    timeOfDay: "night",
    event: "normal",
    platformData: { farEast: 8, east: 12, central: 18, west: 11, farWest: 6, total: 55 },
    needsNudging: false,
    zonalNudging: false,
    targetZones: [],
    excludeZones: [],
    weatherMessage: "",
    nudgingReason: "Low density + safety considerations - allowing natural clustering"
  },
  {
    name: "Concert Event",
    icon: [Trophy, Sun],
    context: "Post-concert + Clear weather + High volume",
    date: "2024-06-08",
    confidence: 89,
    effectiveness: "High",
    baseline: "Massive central clustering, 38% imbalance",
    weather: "clear",
    timeOfDay: "evening",
    event: "concert",
    platformData: { farEast: 25, east: 48, central: 67, west: 42, farWest: 28, total: 210 },
    needsNudging: true,
    zonalNudging: true,
    targetZones: ['farEast', 'farWest'],
    excludeZones: ['central'],
    weatherMessage: "",
    nudgingReason: "High-density event crowd with severe central bottlenecking"
  }
];

export const getTrainLoadForScenario = (scenarioIndex) => {
  const baseLoads = [
    { carriage1: 28, carriage2: 35, carriage3: 19 }, // Rugby
    { carriage1: 31, carriage2: 29, carriage3: 33 }, // Rush hour
    { carriage1: 22, carriage2: 41, carriage3: 18 }, // School
    { carriage1: 15, carriage2: 18, carriage3: 12 }, // Night
    { carriage1: 45, carriage2: 52, carriage3: 38 }, // Concert
  ];
  return baseLoads[scenarioIndex] || baseLoads[0];
};