import React from 'react';
import './MainContent.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MainContent = () => {
  return (
    <div className="main-content flex">
      {/* Left side Slider */}
      <div className="hero-slider">
        <img src="/main-building.jpg" alt="DFCCIL Housing Model" className="hero-image" />
        
        <div className="hero-overlay-content">
          <div className="glass-panel">
            <h2 className="welcome-title">Welcome to DFCCIL Housing Society</h2>
            <p className="welcome-subtitle">Redefining Modern Living with Excellence and Harmony</p>
          </div>
        </div>

        <div className="slider-controls">
          <button className="slider-btn prev"><ChevronLeft size={24} /></button>
          <button className="slider-btn next"><ChevronRight size={24} /></button>
        </div>
      </div>

      {/* Right side Events */}
      <div className="events-section">
        <div className="event-card">
          <div className="event-image-wrapper">
            <img src="/event1.jpg" alt="Foundation Day" />
            <div className="event-overlay">
              <p>DFCCIL commemorates its 20th Foundation Day at Bharat Mandapam, New Delhi, on 31st October 2026</p>
            </div>
          </div>
        </div>
        <div className="event-card mt-2">
           <div className="event-image-wrapper">
            <img src="/ceo-message.jpg" alt="Managing Directors" />
            <div className="event-overlay">
              <p>Message from Managing Directors and CEO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
