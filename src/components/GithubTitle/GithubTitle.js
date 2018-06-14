import React from 'react';
import './GithubTitle.css';
import PropTypes from 'prop-types';

const GithubTitle = (props) => (
    <div className='titleContainer'>
        <h1>{props.txt}</h1>
    </div>
);

GithubTitle.propTypes = {
    txt: PropTypes.string.isRequired
};

export default GithubTitle;