// components/ProPower.js
import React from 'react';
import '../styles/proPower.css';
import crown from '../assets/crown-crop.gif'; // Проверьте путь к изображению

const ProPower = () => (
  <div className="pro-power">
    {/* Левая секция с текстом, ценой и кнопкой */}
    <div className="left-section">
      <h2>Unlock Pro Power</h2>
      <div className="price-container">
        <span className="dollar">$</span>
        <span className="amount">1.81</span>
      </div>
      <button className="buy-button">Buy Now</button>
    </div>

    {/* Корона справа */}
    <img src={crown} alt="Crown" className="crown" />
  </div>
);

export default ProPower;