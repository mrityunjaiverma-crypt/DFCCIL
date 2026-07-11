import React, { useState, useEffect } from 'react';
import { Mail, LogIn, LogOut } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('adminToken'));
    const handleStorageChange = () => setIsLoggedIn(!!localStorage.getItem('adminToken'));
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('storage'));
    window.location.href = '/';
  };

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
        
        <div className="header-actions flex">
          <button className="btn-contact flex items-center">
            <Mail size={16} className="mr-2" /> Contact Us
          </button>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn-login flex items-center" style={{ background: '#d32f2f', border: 'none' }}>
              <LogOut size={16} className="mr-2" /> Logout
            </button>
          ) : (
            <a href="/login" className="btn-login flex items-center" style={{ textDecoration: 'none' }}>
              <LogIn size={16} className="mr-2" /> Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
