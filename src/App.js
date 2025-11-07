// src/App.js
import React, { useState } from 'react';
import LandingPage from './components/Landing/LandingPage';
import TrainDwellDashboard from './components/TrainDwellDashboard'; 

const App = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleLaunch = () => {
    setShowDashboard(true);
  };

  // NEW: Function to go back to the landing page
  const handleGoBack = () => {
    setShowDashboard(false);
  };

  return (
    <>
      {showDashboard ? (
        // UPDATED: Pass the new function as a prop
        <TrainDwellDashboard onGoBack={handleGoBack} />
      ) : (
        <LandingPage onLaunch={handleLaunch} />
      )}
    </>
  );
};

export default App;