import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import './Footer.css'; // Import the CSS file for styling

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-container">
        <div className="left-section">
          <span className="logo">SmartWalls</span>
          <span className="copy-right">
            &copy; {currentYear} SmartWalls. All rights reserved.
          </span>
        </div>
        <div className="right-section">
          <span className="contact-info">
            Instagram: 
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-link"
            >
              <FaInstagram className="instagram-icon" />
            </a>
          </span>
          <span className="contact-info">Telefon: +381 66 42 11 48</span>
        </div>
      </div>
    </footer>
  );
}