import React from 'react';
import GithubIcon from '../GithubIcon';
import PropTypes from 'prop-types';
import './styles.css';

const Subtitle = (props) => (
    <div className='subtitleContainer'>
        <h2>{props.txt}</h2>
        <GithubIcon/>
    </div>
);

Subtitle.propTypes = {
    txt: PropTypes.string.isRequired
};

export default Subtitle;