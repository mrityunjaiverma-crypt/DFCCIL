import React, { useEffect, useState } from 'react';
import './NewsTicker.css';

const NewsTicker = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // In a real app, this would fetch from the backend:
    // fetch('http://localhost:5000/api/news').then(res => res.json()).then(setNews)
    
    // For now, we simulate the fetch with dummy data
    setNews([
      { _id: '1', title: 'Reply to Pre Bid Queries', isNew: true },
      { _id: '2', title: 'Congratulatory Message from the Chairman & CEO, Railway Board', isNew: true },
      { _id: '3', title: "MD's Message on Republic Day 2026", isNew: true },
      { _id: '4', title: "MD's New Year Message", isNew: true }
    ]);
  }, []);

  return (
    <div className="ticker-wrapper">
      <div className="ticker-content">
        {news.map((item, index) => (
          <span key={item._id} className="ticker-item">
            {item.isNew && <span className="badge-new">New!</span>}
            <a href="#">{item.title}</a>
            {index < news.length - 1 && <span className="ticker-separator">|</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
