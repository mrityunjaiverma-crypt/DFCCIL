import React, { useState } from 'react';
import { Home, ChevronDown } from 'lucide-react';
import './Navbar.css';

const navItems = [
  { id: 'about', label: 'About Us', hasDropdown: true },
  { id: 'projects', label: 'Projects', hasDropdown: true },
  { id: 'dashboard', label: 'DFCCIL Dashboard', hasDropdown: false },
  { id: 'business', label: 'Business Development', hasDropdown: true },
  { id: 'operations', label: 'Operations & Safety', hasDropdown: true },
  { id: 'tender', label: 'Tender', hasDropdown: true },
  { id: 'careers', label: 'Careers', hasDropdown: true },
  { id: 'info', label: 'Other Info', hasDropdown: true },
  { id: 'personnel', label: 'For DFCCIL Personnel', hasDropdown: true },
  { id: 'media', label: 'Media', hasDropdown: true },
  { id: 'sanchar', label: 'GatiShakti Sanchar Portal', hasDropdown: true },
  { id: 'payment', label: 'Payment Gateway', hasDropdown: false, isSpecial: true }
];

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <nav className="navbar">
      <div className="container">
        <ul className="nav-list flex items-center">
          <li className="nav-item home-icon">
            <a href="/"><Home size={18} color="white" /></a>
          </li>
          
          {navItems.map((item) => (
            <li 
              key={item.id} 
              className={`nav-item ${item.isSpecial ? 'special-item' : ''}`}
              onMouseEnter={() => setActiveDropdown(item.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a href={`#${item.id}`} className="nav-link flex items-center">
                {item.label} {item.hasDropdown && <ChevronDown size={14} className="ml-1" />}
              </a>
              
              {item.hasDropdown && activeDropdown === item.id && (
                <div className="dropdown-menu fade-in">
                  <ul>
                    <li><a href={`#${item.id}-1`}>Sub Item 1</a></li>
                    <li><a href={`#${item.id}-2`}>Sub Item 2</a></li>
                    <li><a href={`#${item.id}-3`}>Sub Item 3</a></li>
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
