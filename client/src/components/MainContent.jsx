import React from 'react';
import './MainContent.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MainContent = () => {
  return (
    <div className="main-content flex">
      {/* Left side Slider */}
      <div className="hero-slider">
        <img src="/hero.jpg" alt="DFCCIL Housing Landscape" className="hero-image" />
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
            {/* Reusing event1 as placeholder for the second block, or we can use generic color block */}
            <img src="/event1.jpg" alt="Managing Directors" style={{filter: 'hue-rotate(90deg)'}} />
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
