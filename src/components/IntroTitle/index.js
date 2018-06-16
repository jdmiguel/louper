import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Title = (props) => (
    <div className='titleContainer'>
        <h1>{props.txt}</h1>
    </div>
);

Title.propTypes = {
    txt: PropTypes.string.isRequired
};

export default Title;