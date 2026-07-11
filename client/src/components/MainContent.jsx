import React, { useState, useEffect } from 'react';
import './MainContent.css';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

const slides = [
  {
    image: '/main-building.jpg',
    title: 'Welcome to DFCCIL Housing Society',
    subtitle: 'Redefining Modern Living with Excellence and Harmony'
  },
  {
    image: '/slide2.jpg',
    title: 'Experience Premium Luxury',
    subtitle: 'State-of-the-art interiors designed for comfort and elegance'
  },
  {
    image: '/slide3.jpg',
    title: 'Next-Generation Connectivity',
    subtitle: 'Seamlessly connected with advanced magnetic levitation transit systems'
  }
];

const MainContent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="main-content flex">
      {/* Left side Slider */}
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.title} className="hero-image" />
            
            <div className="hero-overlay-content">
              <div className="glass-panel">
                <h2 className="welcome-title">{slide.title}</h2>
                <p className="welcome-subtitle">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="slider-controls">
          <button className="slider-btn prev" onClick={prevSlide}><ChevronLeft size={24} /></button>
          <button className="slider-btn next" onClick={nextSlide}><ChevronRight size={24} /></button>
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
