import React, { PureComponent } from 'react';
import './css/SplashScreen.css';
import logo from '../images/kanslojagboken-logo.png';
// Function for outputting the splash screen on page load
function SplashScreen() {
  return (
    <div className="splash-screen">
      <img src={logo} alt="Känslojagboken logo" />
    </div>
  );
}

export default SplashScreen;
