import React from 'react';
import './styles.css';
import GithubTitle from '../GithubTitle';
import GithubSubtitle from '../GithubSubtitle';

const txt = {
    title: 'Github',
    subtitle: 'Finder'
}

const GithubHeader = (props) => (
    <div className='header'>
        <GithubTitle txt={txt.title}/>
        <GithubSubtitle txt={txt.subtitle}/> 
    </div>
);

export default GithubHeader;