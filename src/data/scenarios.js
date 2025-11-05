// src/data/scenarios.js
import { Trophy, CloudRain, Clock, Users, GraduationCap, Sun, Moon, Music, Globe } from 'lucide-react';

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
    targetZones: ['farEast', 'farWest'], // FIXED: Target LEAST crowded zones (18, 14)
    excludeZones: ['east', 'west'], // FIXED: Exclude MOST crowded zones (35, 45)
    weatherMessage: "Covered waiting areas available at platform ends",
    nudgingReason: "Heavy east/west clustering detected + weather factor",
    trainCarriages: 3,
    trainConfig: "Class 387 - 3 carriages"
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
    nudgingReason: "Well-balanced distribution detected - no intervention needed",
    trainCarriages: 3,
    trainConfig: "Class 387 - 3 carriages"
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
    targetZones: ['farEast', 'farWest'], // FIXED: Target LEAST crowded zones (12, 8)
    excludeZones: ['east', 'central'], // FIXED: Exclude MOST crowded zones (58, 41)
    weatherMessage: "Covered areas available throughout platform - move to far zones for shorter queues",
    nudgingReason: "Weather-driven overcrowding in sheltered zones",
    trainCarriages: 3,
    trainConfig: "Class 387 - 3 carriages"
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
    nudgingReason: "Low density + safety considerations - allowing natural clustering",
    trainCarriages: 3,
    trainConfig: "Class 387 - 3 carriages"
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
    targetZones: ['farEast', 'farWest'], // FIXED: Target LEAST crowded zones (25, 28)
    excludeZones: ['central', 'east'], // FIXED: Exclude MOST crowded zones (67, 48)
    weatherMessage: "",
    nudgingReason: "High-density event crowd with severe central bottlenecking",
    trainCarriages: 3,
    trainConfig: "Class 387 - 3 carriages"
  },
  {
    name: "Taylor Swift Concert + Football",
    icon: [Music, Trophy],
    context: "Taylor Swift concert ending + Arsenal match nearby + Heavy crowds",
    date: "2024-10-19",
    confidence: 92,
    effectiveness: "Very High",
    baseline: "Massive multi-event convergence, 52% platform imbalance",
    weather: "clear",
    timeOfDay: "evening",
    event: "multi_event",
    webScrapedContext: "Web scraping: Taylor Swift concert at Emirates Stadium ended 21:30, Arsenal vs Chelsea at nearby ground 21:45 finish",
    platformData: { farEast: 45, east: 89, central: 112, west: 67, farWest: 31, total: 344 },
    needsNudging: true,
    zonalNudging: true,
    targetZones: ['farEast', 'farWest'], // FIXED: Target LEAST crowded zones (45, 31)
    excludeZones: ['central', 'east'], // FIXED: Exclude MOST crowded zones (112, 89)
    weatherMessage: "",
    nudgingReason: "Dual major event convergence causing severe central bottlenecking",
    trainCarriages: 5,
    trainConfig: "Class 800 - 5 carriages"
  },
  {
    name: "Champions League + Rain",
    icon: [Trophy, CloudRain, Globe],
    context: "Champions League final viewing + Heavy rain + International crowds",
    date: "2024-05-28",
    confidence: 89,
    effectiveness: "High",
    baseline: "Weather + major sporting event clustering",
    weather: "heavyRain",
    timeOfDay: "evening",
    event: "international_sport",
    webScrapedContext: "Web scraping: Champions League Final broadcast at nearby fan zones, 45,000+ attendees expected. Heavy rain warning issued by Met Office",
    platformData: { farEast: 23, east: 67, central: 89, west: 78, farWest: 19, total: 276 },
    needsNudging: true,
    zonalNudging: true,
    targetZones: ['farEast', 'farWest'], // FIXED: Target LEAST crowded zones (23, 19)
    excludeZones: ['central', 'east', 'west'], // FIXED: Exclude MOST crowded zones (89, 67, 78)
    weatherMessage: "Covered boarding available at platform ends",
    nudgingReason: "International event + severe weather creating extreme shelter-seeking",
    trainCarriages: 6,
    trainConfig: "Class 802 - 6 carriages"
  },
  {
    name: "University Graduation",
    icon: [GraduationCap, Sun],
    context: "University graduation ceremonies + Clear weather + Family groups",
    date: "2024-07-15",
    confidence: 86,
    effectiveness: "Medium",
    baseline: "Large groups with luggage, slower movement patterns",
    weather: "clear",
    timeOfDay: "afternoon",
    event: "graduation",
    webScrapedContext: "Web scraping: University of Bristol graduation ceremonies 14:00-17:00, estimated 8,000 graduates + families",
    platformData: { farEast: 34, east: 42, central: 67, west: 38, farWest: 29, total: 210 },
    needsNudging: true,
    zonalNudging: true,
    targetZones: ['farEast', 'farWest'], // FIXED: Target LEAST crowded zones (34, 29)
    excludeZones: ['central'], // FIXED: Exclude MOST crowded zone (67)
    weatherMessage: "",
    nudgingReason: "Family groups clustering centrally, need distribution for luggage space",
    trainCarriages: 4,
    trainConfig: "Class 387 - 4 carriages"
  }
];

export const getTrainLoadForScenario = (scenarioIndex) => {
  const baseLoads = [
    { carriage1: 28, carriage2: 35, carriage3: 19 }, // Rugby (3 cars)
    { carriage1: 31, carriage2: 29, carriage3: 33 }, // Rush hour (3 cars)
    { carriage1: 22, carriage2: 41, carriage3: 18 }, // School (3 cars)
    { carriage1: 15, carriage2: 18, carriage3: 12 }, // Night (3 cars)
    { carriage1: 45, carriage2: 52, carriage3: 38 }, // Concert (3 cars)
    { carriage1: 52, carriage2: 67, carriage3: 71, carriage4: 58, carriage5: 44 }, // Taylor Swift (5 cars)
    { carriage1: 48, carriage2: 62, carriage3: 69, carriage4: 61, carriage5: 52, carriage6: 43 }, // Champions League (6 cars)
    { carriage1: 41, carriage2: 48, carriage3: 55, carriage4: 39 }, // Graduation (4 cars)
  ];
  
  return baseLoads[scenarioIndex] || baseLoads[0];
};