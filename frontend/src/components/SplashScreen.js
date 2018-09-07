import React from 'react';
import './css/SplashScreen.css';
import logo from '../images/kanslojagboken-logo.png';

function SplashScreen() {
  return (
    <div className="splash-screen">
      <img src={logo} alt="Känslojagboken logo" />
    </div>
  );
}

export default SplashScreen;
