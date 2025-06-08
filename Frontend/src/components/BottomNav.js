// components/BottomNav.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/bottomNav.css';
import homeIcon from '../assets/home-icon.svg';
import historyIcon from '../assets/history-icon.svg';
import settingsIcon from '../assets/settings-icon.svg';

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        <img src={homeIcon} alt="Home" />
      </Link>
      <Link to="/history" className={`nav-item ${location.pathname === '/history' ? 'active' : ''}`}>
        <img src={historyIcon} alt="History" />
      </Link>
      <Link to="/settings" className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}>
        <img src={settingsIcon} alt="Settings" />
      </Link>
    </nav>
  );
};

export default BottomNav;