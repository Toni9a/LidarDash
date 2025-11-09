// src/components/landing/LandingPage.js
import React, { useState, useRef } from 'react';
import { Cpu, Users, FileText, PlayCircle, Zap, ScanLine, Lightbulb, CheckCircle, ShieldAlert, ChevronLeft, ChevronRight } from 'lucide-react';

// Reusable Modal Component (remains unchanged)
const ImageModal = ({ images, onClose }) => {
  if (!images || images.length === 0) return null;
  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-lg p-4 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl">&times;</button>
        </div>
        <div className="space-y-4">
          {images.map((src, index) => (
            <div key={index} className="bg-white rounded-lg p-2 sm:p-4">
              <img src={src} alt={`Detail view ${index + 1}`} className="w-full h-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// MODIFIED: Reusable Carousel Component to handle mixed media (images/videos)
const Carousel = ({ title, media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? media.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === media.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const currentMedia = media[currentIndex];
  // Check if the current slide is the special tall image
  const isTallSlide = currentMedia.src.includes('mobileapp2.png');

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 flex flex-col">
      {/* Container with dynamic height */}
      <div 
        className={`w-full rounded-md bg-black relative group transition-[height] duration-500 ease-in-out ${isTallSlide ? 'h-96' : 'h-64'}`}
      >
        {/* Conditional rendering for image vs video */}
        {currentMedia.type === 'video' ? (
          <video 
            key={currentMedia.src} // Key is important to force re-render on slide change
            src={currentMedia.src} 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-contain rounded-md"
          />
        ) : (
          <div
            style={{ backgroundImage: `url(${currentMedia.src})` }}
            className="w-full h-full rounded-md bg-center bg-contain bg-no-repeat duration-500"
          ></div>
        )}
        
        {/* Arrows */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-y-1/2 left-2 text-2xl rounded-full p-1 bg-black/40 text-white cursor-pointer">
          <ChevronLeft onClick={prevSlide} size={24} />
        </div>
        <div className="hidden group-hover:block absolute top-[50%] -translate-y-1/2 right-2 text-2xl rounded-full p-1 bg-black/40 text-white cursor-pointer">
          <ChevronRight onClick={nextSlide} size={24} />
        </div>
      </div>
      <p className="text-center mt-3 text-sm text-slate-300">{title}</p>
    </div>
  );
};


const LandingPage = ({ onLaunch }) => {
  // ... (State and handlers remain unchanged)
  const [modalImages, setModalImages] = useState([]);
  const [isLidarHovered, setIsLidarHovered] = useState(false);
  const lidarVideoRef = useRef(null);
  const openModal = (images) => setModalImages(images);
  const closeModal = () => setModalImages([]);
  const handleLidarHover = (hovering) => {
    setIsLidarHovered(hovering);
    if (lidarVideoRef.current) {
      if (hovering) {
        lidarVideoRef.current.play();
      } else {
        lidarVideoRef.current.pause();
        lidarVideoRef.current.currentTime = 0;
      }
    }
  };

  return (
    <>
      <ImageModal images={modalImages} onClose={closeModal} />
      <div className="min-h-screen bg-slate-900 text-white">
        {/* Hero Section */}
        <div 
          className="relative text-center py-20 px-4 overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/images/hero-background.jpg')" }}
        >
          {/* ... (Hero section content remains unchanged) ... */}
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-none"></div>
          <div className="relative z-10">
            <div className="flex justify-center items-center gap-8 mb-8">
              <img src="/assets/images/cranfieldlogo.png" alt="Cranfield University Logo" className="h-12 w-auto opacity-50 mix-blend-luminosity" />
              <img src="/assets/images/rssblogo.jpg" alt="RSSB Logo" className="h-12 w-auto opacity-50 mix-blend-luminosity" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 mb-4">
              Facilitating Rail Dwell Time Improvement
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-slate-300 mb-8">
              A Demonstration of how machine vision, behavioural nudging (Displays, Audio, Mobile notifications), and AI context can optimize passenger flow and enhance railway efficiency.
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={onLaunch} className="px-8 py-3 bg-sky-600 hover:bg-sky-700 rounded-lg font-semibold transition-transform transform hover:scale-105 flex items-center gap-2">
                <PlayCircle className="w-5 h-5" /> Launch Interactive Demo
              </button>
              <a href="/assets/pdf/research-draft.pdf" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-transform transform hover:scale-105 flex items-center gap-2">
                <FileText className="w-5 h-5" /> Read The Research
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-8 space-y-20">
          {/* The Problem & The Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Dwell Time Bottleneck - Inverse Hover */}
            <div>
              <h2 className="text-3xl font-bold mb-4 text-sky-300">The Dwell Time Bottleneck</h2>
              <div className="relative group h-64 rounded-lg overflow-hidden bg-white p-4">
                <img src="/assets/images/dwell-diagram.png" alt="Dwell Time Components" className="absolute inset-0 w-full h-full object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-50" />
                <div className="absolute inset-0 p-6 flex flex-col justify-center bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-slate-300 leading-relaxed text-center">
                    Train dwell time—the period a train is stopped at a platform—is a critical operational bottleneck. Even minor delays can cascade through the network, causing significant disruption. While a metro service like the Thameslink is timed for a 60-second stop, longer-distance Intercity trains require at least 2-3 minutes. Passenger distribution and boarding rate is tackled to reduce said dwell time- by means of nudging.
                  </p>
                </div>
              </div>
            </div>
            {/* An Intelligent Solution - Inverse Hover */}
            <div>
              <h2 className="text-3xl font-bold mb-4 text-amber-300">An Intelligent Solution</h2>
              <div className="relative group h-64 rounded-lg overflow-hidden">
                <img src="/assets/images/intelsolpic.png" alt="Intelligent Solution Diagram" className="absolute inset-0 w-full h-full object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-50" />
                <div className="absolute inset-0 p-6 flex flex-col justify-center bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-slate-300 leading-relaxed text-center">
                    The research conducted was modelling the impact of differing Nudge compliance rates. In this system, real-time data APC data is used to actively guide passengers. By fusing static train load data with live platform crowding information from LiDAR sensors, an AI model recommends and executes targeted behavioural "nudges" to balance passenger distribution before the train arrives, directly addressing the root cause of inefficient boarding.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-sky-500 transition-all relative overflow-hidden"
              onMouseEnter={() => handleLidarHover(true)}
              onMouseLeave={() => handleLidarHover(false)}
            >
              <video ref={lidarVideoRef} loop muted playsInline className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isLidarHovered ? 'opacity-20' : 'opacity-0'}`} src="/assets/videos/lidarsense.mp4"></video>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <ScanLine className="w-8 h-8 text-sky-400" />
                  <h3 className="text-xl font-semibold">Advanced Sensing with LiDAR</h3>
                </div>
                <p className="text-sm text-slate-400">
                  LiDAR is a proven technology, trusted in critical applications like autonomous vehicles, for anonymously tracking crowd flow. This project's simulation model was grounded in real-world LiDAR data provided by **Createc** from their trial at Bristol Temple Meads, enabling the identification of passenger archetypes (e.g., cyclists, wheelchair users) to dynamically adjust boarding rate calculations. Furthermore a baseline of walking behaviour can help establish behavioural archetypes as modelled in the research.
                </p>
              </div>
            </div>
            <div className="relative group bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-amber-500 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-8 h-8 text-amber-400" />
                <h3 className="text-xl font-semibold">Nudge Effectiveness & Behavior</h3>
              </div>
              <p className="text-sm text-slate-400">
              The research was modeled using agent-based simulation in AnyLogic, drawing on passenger pyschology, movement patterns, station design and crowding huersitcs. Main focus was to determine if nudging the population would decrease dwell time & crowding for safety. It revealed a non-linear relationship between nudge compliance and dwell time. Optimal performance (a ~15% boarding time reduction) was achieved at an around 80% compliance rate. A 100% "perfect" nudge was counter-productive, creating a new bottleneck. In practice to nudge a population to 80% compliance multiple methods (LEDs, audio, Mobile notifications) examples shown below are used.
              </p>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[200%] max-w-lg p-2 bg-slate-700/50 backdrop-blur-md rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                <div className="space-y-2 bg-white rounded-md p-2">
                  <img src="/assets/images/boardingraph.png" alt="Boarding Time Graph" className="rounded-sm w-full h-auto object-cover" />
                  <img src="/assets/images/imbalancegraph.png" alt="Imbalance Index Graph" className="rounded-sm w-full h-auto object-cover" />
                </div>
              </div>
            </div>
            <div className="relative group bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-green-500 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <Cpu className="w-8 h-8 text-green-400" />
                <h3 className="text-xl font-semibold">AI Decision Engine</h3>
              </div>
              <p className="text-sm text-slate-400">
                In the Demo- ML is used to combine historical data, as well as live web crawling for context on events around the station (concerts/school holidays/ public holidays), this informs the likely platform movement patterns. Its primary goal is to balance the 'Combined Load'—a fusion of the train's known passenger count (APC data) and the platform's live density (LiDAR data). Aiming to increase boarding rate across all available carriage doors.
              </p>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-full max-w-sm p-2 bg-slate-700/50 backdrop-blur-md rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                <img src="/assets/images/combnudge-pic.png" alt="Nudge Algorithm Diagram" className="rounded-md w-full h-auto object-cover" />
              </div>
            </div>
          </div>

          {/* MODIFIED: System in Action Section - now a 2x2 grid */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-8 text-sky-300">System in Action</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Carousel 
                title="Anonymized LiDAR Visualisations"
                media={[
                  { type: 'image', src: '/assets/images/lidarpic2.png' },
                  { type: 'image', src: '/assets/images/lidarpic3.png' },
                  { type: 'image', src: '/assets/images/lidarpic1.png' },
                  { type: 'image', src: '/assets/images/lidarpic4.png' },
                ]}
              />
              <Carousel 
                title="Mobile App Nudge Visualisations"
                media={[
                  { type: 'image', src: '/assets/images/mobileapp1.png' },
                  { type: 'image', src: '/assets/images/mobileapp2.png' },
                  { type: 'video', src: '/assets/videos/mobileappvid1.mov' },
                  { type: 'video', src: '/assets/videos/mobileappvid2.mov' },
                  { type: 'image', src: '/assets/images/mobileapp3.png' },
                  { type: 'image', src: '/assets/images/mobileapp4.png' },
                ]}
              />
              <Carousel 
                title="Existing Nudging Technologies"
                media={[
                  { type: 'image', src: '/assets/images/exnudge1.png' },
                  { type: 'image', src: '/assets/images/exnudge2.png' },
                  { type: 'image', src: '/assets/images/exnudge3.png' },
                  { type: 'image', src: '/assets/images/exnudge4.png' },
                ]}
              />
              {/* NEW: Physical Implementation Carousel */}
              <Carousel 
                title="Physical Implementation Concepts"
                media={[
                  { type: 'image', src: '/assets/images/imp1.png' },
                  { type: 'image', src: '/assets/images/imp2.png' },
                  { type: 'image', src: '/assets/images/imp3.png' },
                ]}
              />
            </div>
          </div>
          
          {/* Usefulness to Operators Section */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-8 text-amber-300">Usefulness to Operators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                {/* ... (Unchanged) ... */}
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <ShieldAlert className="w-8 h-8 mx-auto mb-3 text-orange-400" />
                    <h4 className="font-semibold text-orange-300">Enhanced Safety</h4>
                    <p className="text-xs text-slate-400">Alerts for passengers near the platform edge on long, less visible platforms.</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <Zap className="w-8 h-8 mx-auto mb-3 text-green-400" />
                    <h4 className="font-semibold text-green-300">Automated Nudging</h4>
                    <p className="text-xs text-slate-400">Automatic nudging via audio, LED & mobile notifications reduces manual intervention.</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <Lightbulb className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                    <h4 className="font-semibold text-yellow-300">Effective Response</h4>
                    <p className="text-xs text-slate-400">In case of manual override or emergency, data provides better situational awareness.</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <CheckCircle className="w-8 h-8 mx-auto mb-3 text-sky-400" />
                    <h4 className="font-semibold text-sky-300">Passenger Autonomy</h4>
                    <p className="text-xs text-slate-400">Provides clear information, giving passengers more autonomy over their positioning.</p>
                </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-slate-800">
          <p className="text-slate-400">Oluwatoni Esan - MSc Applied Artificial Intelligence, Cranfield University 2025</p>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;