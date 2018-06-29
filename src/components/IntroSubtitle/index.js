import React from 'react';
import GithubIcon from '../GithubIcon';
import './styles.css';

const Subtitle = ({txt}) => (
    <div className='subtitleContainer'>
        <h2>{txt}</h2>
        <GithubIcon/>
    </div>
);

export default Subtitle;