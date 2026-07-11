import React, { useState, useEffect } from 'react';
import { Home, ChevronDown, Edit2 } from 'lucide-react';
import './Navbar.css';

const navItems = [
  { 
    id: 'about', 
    label: 'About Us', 
    hasDropdown: true,
    subItems: ['Society Overview', 'History', 'Management', 'Corporate Office', 'Field Units', 'Board of Directors']
  },
  { 
    id: 'projects', 
    label: 'Projects', 
    hasDropdown: true,
    subItems: ['Ongoing Projects', 'Completed Projects']
  },
  { 
    id: 'dashboard', 
    label: 'DFCCIL Dashboard', 
    hasDropdown: false 
  },
  { 
    id: 'business', 
    label: 'Business Development', 
    hasDropdown: true,
    subItems: ['Tenders', 'Opportunities', 'Partnerships']
  },
  { 
    id: 'media', 
    label: 'Media', 
    hasDropdown: true,
    subItems: ['Press Releases', 'Photo Gallery', 'News']
  },
  { 
    id: 'payment', 
    label: 'Payment Gateway', 
    hasDropdown: false,
    isSpecial: true
  }
];

const getSubItemHref = (categoryId, subItem, index) => {
    if (subItem === 'Press Releases') return '/press-releases';
    const slug = subItem.toLowerCase().replace(/ /g, '-');
    return `/page/${slug}`;
};

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('adminToken'));
    // Listen for storage changes in case of login/logout in same tab
    const handleStorageChange = () => setIsAdmin(!!localStorage.getItem('adminToken'));
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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
                    {item.subItems.map((subItem, index) => (
                      <li key={index}>
                        <a 
                          href={getSubItemHref(item.id, subItem, index)} 
                          className="flex justify-between items-center w-full"
                        >
                          <span>{subItem}</span>
                          {isAdmin && (
                            <Edit2 
                              size={14} 
                              className="ml-2 text-gray-400 hover:text-white cursor-pointer" 
                              title="Edit item"
                            />
                          )}
                        </a>
                      </li>
                    ))}
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
