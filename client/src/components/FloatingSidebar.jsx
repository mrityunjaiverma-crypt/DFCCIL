import React from 'react';
import { X, PlayCircle, Mail, Map, Users } from 'lucide-react';
import './FloatingSidebar.css';

const FloatingSidebar = () => {
  return (
    <div className="floating-sidebar">
      <div className="sidebar-icon close-icon">
        <X size={20} />
      </div>
      <div className="sidebar-icon play-icon" title="Video">
        <PlayCircle size={20} />
      </div>
      <div className="sidebar-icon mail-icon" title="Contact">
        <Mail size={20} />
      </div>
      <div className="sidebar-icon map-icon" title="Locations">
        <Map size={20} />
      </div>
      <div className="sidebar-icon users-icon" title="Team">
        <Users size={20} />
      </div>
    </div>
  );
};

export default FloatingSidebar;
