import React from 'react';
import './styles.css';

const Title = (props) => (
    <div className='titleContainer'>
        <h1>{props.txt}</h1>
    </div>
);

export default Title;