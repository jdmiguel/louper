import React from 'react';
import './GithubHeader.css';
import GithubTitle from '../GithubTitle/GithubTitle';
import GithubSubtitle from '../GithubSubtitle/GithubSubtitle';

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