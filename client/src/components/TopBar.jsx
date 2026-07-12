import React, { useState } from 'react';
import './TopBar.css';

const TopBar = () => {
  const [fontSize, setFontSize] = useState(100);

  const changeFontSize = (step) => {
    let newSize = step === 0 ? 100 : fontSize + step;
    if (newSize > 120) newSize = 120;
    if (newSize < 80) newSize = 80;
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const toggleContrast = (isHigh) => {
    if (isHigh) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  };

  const handleLanguageToggle = () => {
    alert('Hindi Translation feature initialized. Real implementation requires Google Translate API integration.');
  };

  return (
    <div className="topbar">
      <div className="container flex justify-between items-center">
        <div className="topbar-left">
          {/* Removed links per request */}
        </div>
        <div className="topbar-right">
          <a href="#main-content" className="skip-link cursor-pointer text-white hover:text-gray-300">Skip to Main Content</a>
          <span className="divider">|</span>
          <div className="text-size">
            <span onClick={() => changeFontSize(10)} title="Increase font size" className="cursor-pointer">A+</span>
            <span onClick={() => changeFontSize(0)} title="Reset font size" className="cursor-pointer">A</span>
            <span onClick={() => changeFontSize(-10)} title="Decrease font size" className="cursor-pointer">A-</span>
          </div>
          <span className="divider">|</span>
          <div className="contrast-toggles">
            <span onClick={() => toggleContrast(false)} className="contrast-light cursor-pointer" title="Standard Contrast">A</span>
            <span onClick={() => toggleContrast(true)} className="contrast-dark cursor-pointer" title="High Contrast">A</span>
          </div>
          <span className="divider">|</span>
          <span onClick={handleLanguageToggle} className="language cursor-pointer hover:text-gray-300" title="Translate to Hindi">अ</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
