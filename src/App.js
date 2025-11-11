// src/App.js
import React, { useState } from 'react';
// FIX #1: Correctly import from the LandingPage.js file
import LandingPage from './components/Landing/LandingPage'; 
import TrainDwellDashboard from './components/TrainDwellDashboard';
// FIX #2: The file is named ThemeContext.js, not ThemeProvider
import { ThemeProvider } from './contexts/ThemeContext'; 

const App = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleLaunch = () => setShowDashboard(true);
  const handleGoBack = () => setShowDashboard(false);

  return (
    // Wrap the entire application with ThemeProvider
    <ThemeProvider>
      {showDashboard ? (
        <TrainDwellDashboard onGoBack={handleGoBack} />
      ) : (
        <LandingPage onLaunch={handleLaunch} />
      )}
    </ThemeProvider>
  );
};

export default App;