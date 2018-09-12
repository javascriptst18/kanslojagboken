import React from 'react';
import './css/SplashScreen.css';
import logo from '../images/kanslojagboken-logo.png';
import LoadingAnimation from './LoadingAnimation';
// Function for outputting the splash screen on page load
function SplashScreen() {
  return (
    <div className="splash-screen">
      <img src={logo} alt="Känslojagboken logo" />
      <LoadingAnimation />
    </div>
  );
}

export default SplashScreen;
