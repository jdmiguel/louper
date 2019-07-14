import React from 'react';
import './styles.css';

const Footer = () => {
  return (
    <div className="footer">
      <h3>
        Created by
        <a
          href="https://jcoder.eu"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View source on GitHub"
        >
          {' '}
          jcoder
        </a>
      </h3>
    </div>
  );
};

export default Footer;
