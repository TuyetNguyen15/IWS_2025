import React from "react";
import './styles.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="element">
        <i className="fas fa-phone"></i>
        Hotline: 1800-1234
      </div>

      <div className="element">
        © Created by Mercy Company | All rights reserved.
      </div>

      <div className="element">
        <i className="fas fa-map-marker-alt"></i>
        Số 10, Quận Cầu Giấy, Hà Nội
      </div>
    </div>
  )
}

export default Footer;

