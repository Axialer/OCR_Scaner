// components/Header.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/header.css';
import logo from '../assets/logo.svg';

const Header = () => {
  const history = useHistory();

  const handleUserProfileClick = () => {
    history.push('/edit-profile');
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Neuro Scan</h1>
      </div>
      <div className="user-profile" onClick={handleUserProfileClick} style={{ cursor: 'pointer' }}>
        <img src="https://avatars.mds.yandex.net/get-yapic/45131/jeHxDmSIYkL3brTDgwBwGFsAOI-1/orig" alt="User Avatar" className="avatar" />
        <span>Aboba</span>
      </div>
    </header>
  );
};

export default Header;