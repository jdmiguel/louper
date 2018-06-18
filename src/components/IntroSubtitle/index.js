import React from 'react';
import GithubIcon from '../GithubIcon';
import './styles.css';

const Subtitle = (props) => (
    <div className='subtitleContainer'>
        <h2>{props.txt}</h2>
        <GithubIcon/>
    </div>
);

export default Subtitle;