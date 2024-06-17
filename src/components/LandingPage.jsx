import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  // Style object for the background image and overall landing page styling
  const backgroundImageStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/land.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
  };

  return (
    <div style={backgroundImageStyle} className="landing-page">
      {/* Main Heading */}
      <h1>Welcome to TaskMasterPro</h1>

      {/* Subheading */}
      <p>
        Effortlessly assign, track, and complete tasks with ease. <br /> 
        Say goodbye to chaos and hello to productivity. Get started today!
      </p>

      {/* Navigation Links */}
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
};

export default LandingPage;
