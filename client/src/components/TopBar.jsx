import React from 'react';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="container flex justify-between items-center">
        <div className="topbar-left">
          {/* Removed links per request */}
        </div>
        <div className="topbar-right">
          <span>Skip to Main Content</span>
          <span className="divider">|</span>
          <div className="text-size">
            <span>A+</span>
            <span>A</span>
            <span>A-</span>
          </div>
          <span className="divider">|</span>
          <div className="contrast-toggles">
            <span className="contrast-light">A</span>
            <span className="contrast-dark">A</span>
          </div>
          <span className="divider">|</span>
          <span className="language">अ</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
