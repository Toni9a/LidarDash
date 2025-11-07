// src/data/scenarios.js
import { Trophy, CloudRain, Clock, Users, GraduationCap, Sun, Moon, Music, Globe } from 'lucide-react';

export const scenarios = [
  {
    name: "Rugby Match + Rain",
    icon: [Trophy, CloudRain],
    context: "Rugby match at Ashton Gate + Light rain + Evening peak",
    confidence: 87,
    effectiveness: "High",
    baseline: "Heavy clustering East zone, 23% imbalance",
    platformData: { farEast: 18, east: 35, central: 28, west: 45, farWest: 14, total: 140 },
    needsNudging: true,
    zonalNudging: true,
    targetZones: ['farEast', 'farWest'],
    excludeZones: ['east', 'west'],
    weatherMessage: "Covered waiting areas available at platform ends",
    nudgingReason: "Heavy east/west clustering detected + weather factor",
    trainConfig: {
      headCode: "1C28",
      operator: "GWR",
      class: "800",
      carriages: 5,
      destination: "LONDON PADDINGTON"
    }
  },
  {
    name: "Tuesday Rush Hour",
    icon: [Clock, Users],
    context: "Tuesday morning rush + Clear weather + Regular commuters",
    confidence: 94,
    effectiveness: "Medium", 
    baseline: "Balanced distribution, strategic planners dominant",
    platformData: { farEast: 22, east: 28, central: 31, west: 26, farWest: 19, total: 126 },
    needsNudging: false,
    zonalNudging: false,
    targetZones: [],
    excludeZones: [],
    weatherMessage: "",
    nudgingReason: "Well-balanced distribution detected - no intervention needed",
    trainConfig: {
      headCode: "1C08",
      operator: "GWR",
      class: "387",
      carriages: 4,
      destination: "LONDON PADDINGTON"
    }
  },
  {
    name: "School Hours + Rain",
    icon: [GraduationCap, CloudRain],
    context: "School finish time + Heavy rain + Mixed demographics",
    confidence: 82,
    effectiveness: "Very High",
    baseline: "Extreme shelter-seeking behavior, 45% imbalance",
    platformData: { farEast: 12, east: 58, central: 41, west: 19, farWest: 8, total: 138 },
    needsNudging: true,
    zonalNudging: true,
    targetZones: ['farEast', 'farWest'],
    excludeZones: ['east', 'central'],
    weatherMessage: "Covered areas available throughout platform - move to far zones for shorter queues",
    nudgingReason: "Weather-driven overcrowding in sheltered zones",
    trainConfig: {
      headCode: "1V62",
      operator: "CrossCountry",
      class: "221",
      carriages: 5,
      destination: "MANCHESTER PICCADILLY"
    }
  },
  {
    name: "Late Night Service",
    icon: [Moon, Users],
    context: "Late evening + Light crowd + Safety considerations",
    confidence: 91,
    effectiveness: "Low",
    baseline: "Natural clustering for safety, minimal intervention",
    platformData: { farEast: 8, east: 12, central: 18, west: 11, farWest: 6, total: 55 },
    needsNudging: false,
    zonalNudging: false,
    targetZones: [],
    excludeZones: [],
    weatherMessage: "",
    nudgingReason: "Low density + safety considerations - allowing natural clustering",
    trainConfig: {
      headCode: "1C34",
      operator: "GWR",
      class: "387",
      carriages: 4,
      destination: "LONDON PADDINGTON"
    }
  },
  {
    name: "Concert Event",
    icon: [Music, Sun],
    context: "Post-concert at Ashton Gate + Clear weather + High volume",
    confidence: 89,
    effectiveness: "High",
    baseline: "Massive central clustering, 38% imbalance",
    platformData: { farEast: 25, east: 48, central: 67, west: 42, farWest: 28, total: 210 },
    needsNudging: true,
    zonalNudging: true,
    targetZones: ['farEast', 'farWest'],
    excludeZones: ['central', 'east'],
    weatherMessage: "",
    nudgingReason: "High-density event crowd with severe central bottlenecking",
    trainConfig: {
      headCode: "1C32",
      operator: "GWR",
      class: "800",
      carriages: 9,
      destination: "LONDON PADDINGTON"
    }
  },
  {
    name: "Taylor Swift Concert + Football",
    icon: [Music, Trophy],
    context: "Major concert + Football match nearby + Extreme crowds",
    confidence: 92,
    effectiveness: "Very High",
    baseline: "Massive multi-event convergence, 52% platform imbalance",
    webScrapedContext: "Web scraping: Major concert at Ashton Gate Stadium ended 22:30, Bristol City match at nearby ground 21:45 finish",
    platformData: { farEast: 45, east: 89, central: 112, west: 67, farWest: 31, total: 344 },
    needsNudging: true,
    zonalNudging: true,
    targetZones: ['farEast', 'farWest'],
    excludeZones: ['central', 'east'],
    weatherMessage: "",
    nudgingReason: "Dual major event convergence causing severe central bottlenecking",
    trainConfig: {
      headCode: "1C36",
      operator: "GWR",
      class: "800",
      carriages: 9,
      destination: "LONDON PADDINGTON"
    }
  },
  {
    name: "Champions League + Rain",
    icon: [Trophy, CloudRain, Globe],
    context: "Champions League final viewing + Heavy rain + International crowds",
    confidence: 89,
    effectiveness: "High",
    baseline: "Weather + major sporting event clustering",
    webScrapedContext: "Web scraping: Champions League Final broadcast at fan zones, 45,000+ attendees. Heavy rain warning issued",
    platformData: { farEast: 23, east: 67, central: 89, west: 78, farWest: 19, total: 276 },
    needsNudging: true,
    zonalNudging: true,
    targetZones: ['farEast', 'farWest'],
    excludeZones: ['central', 'east', 'west'],
    weatherMessage: "Covered boarding available at platform ends",
    nudgingReason: "International event + severe weather creating extreme shelter-seeking",
    trainConfig: {
      headCode: "1V70",
      operator: "CrossCountry",
      class: "221",
      carriages: 5,
      destination: "EDINBURGH WAVERLEY"
    }
  },
  {
    name: "University Graduation",
    icon: [GraduationCap, Sun],
    context: "University graduation ceremonies + Clear weather + Family groups",
    confidence: 86,
    effectiveness: "Medium",
    baseline: "Large groups with luggage, slower movement patterns",
    webScrapedContext: "Web scraping: University of Bristol graduation ceremonies 14:00-17:00, estimated 8,000 graduates + families",
    platformData: { farEast: 34, east: 42, central: 67, west: 38, farWest: 29, total: 210 },
    needsNudging: true,
    zonalNudging: true,
    targetZones: ['farEast', 'farWest'],
    excludeZones: ['central'],
    weatherMessage: "",
    nudgingReason: "Family groups clustering centrally, need distribution for luggage space",
    trainConfig: {
      headCode: "1C26",
      operator: "GWR",
      class: "800",
      carriages: 5,
      destination: "LONDON PADDINGTON"
    }
  }
];

export const getTrainLoadForScenario = (scenarioIndex) => {
  const baseLoads = [
    { carriage1: 38, carriage2: 45, carriage3: 51, carriage4: 35, carriage5: 29 },
    { carriage1: 31, carriage2: 39, carriage3: 42, carriage4: 33 },
    { carriage1: 22, carriage2: 41, carriage3: 48, carriage4: 35, carriage5: 18 },
    { carriage1: 15, carriage2: 21, carriage3: 18, carriage4: 12 },
    { carriage1: 45, carriage2: 52, carriage3: 61, carriage4: 68, carriage5: 75, carriage6: 64, carriage7: 50, carriage8: 42, carriage9: 38 },
    { carriage1: 52, carriage2: 67, carriage3: 78, carriage4: 85, carriage5: 89, carriage6: 72, carriage7: 61, carriage8: 58, carriage9: 44 },
    { carriage1: 48, carriage2: 62, carriage3: 69, carriage4: 61, carriage5: 52 },
    { carriage1: 41, carriage2: 48, carriage3: 55, carriage4: 49, carriage5: 39 },
  ];
  
  return baseLoads[scenarioIndex] || baseLoads[0];
};