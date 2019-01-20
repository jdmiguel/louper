import React from 'react';
import GithubIcon from '../../components/GithubIcon';
import './styles.css';

const Header = () => (
    <div className="header" data-test="component-header">
        <h1>Github</h1>
        <div className="subtitleContainer">
            <h2>Finder</h2>
            <GithubIcon/>
        </div>
    </div>
);

export default Header;