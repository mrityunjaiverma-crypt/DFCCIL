import React from 'react';
import { Mail, LogIn } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container flex justify-between items-center py-4">
        <div className="logo-section flex items-center">
          <img src="/logo.jpg" alt="DFCCIL Logo" className="main-logo" />
          <div className="logo-text">
            <h1>DFCCIL Housing Society</h1>
            <p>A Govt. of India (Ministry of Railways) Enterprise</p>
          </div>
        </div>
        
        <div className="initiative-logos flex items-center">
          {/* Using text blocks or placeholder divs if images aren't all available, but we have logo.jpg for the main one */}
          <div className="g20-logo">G20</div>
          <div className="gatishakti-logo">PM GatiShakti</div>
          <div className="azadi-logo">Azadi Ka Amrit Mahotsav</div>
        </div>

        <div className="header-actions flex">
          <button className="btn-contact flex items-center">
            <Mail size={16} className="mr-2" /> Contact Us
          </button>
          <button className="btn-login flex items-center">
            <LogIn size={16} className="mr-2" /> Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
