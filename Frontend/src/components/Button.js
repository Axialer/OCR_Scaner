// components/Button.js
import React from 'react';
import '../styles/button.css';

const Button = ({ text, icon, onClick }) => (
  <button className="scan-button" onClick={onClick}>
    <div className="text-container">
      <h2>{text}</h2>
      <p>{text === 'Load' ? 'Upload a photo from the gallery' : 'Take a picture of the document'}</p>
    </div>
    <img src={icon} alt={`${text} Icon`} className="button-icon" />
  </button>
);

export default Button;