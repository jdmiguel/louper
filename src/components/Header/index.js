import React from 'react';

/* core */
import GithubIcon from '../core/GithubIcon';

/* styles */
import './styles.css';

const Header = () => (
  <div className="header">
    <h1>Github</h1>
    <div className="subtitleContainer">
      <h2>Finder</h2>
      <GithubIcon />
    </div>
  </div>
);

export default Header;
