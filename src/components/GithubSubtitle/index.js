import React from 'react';
import './styles.css';
import GithubIcon from '../GithubIcon/index';
import PropTypes from 'prop-types';

const GithubSubtitle = (props) => (
    <div className='subtitleContainer'>
        <h2>{props.txt}</h2>
        <GithubIcon/>
    </div>
);

GithubSubtitle.propTypes = {
    txt: PropTypes.string.isRequired
};

export default GithubSubtitle;