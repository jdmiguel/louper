import React from 'react';
import Title from '../../components/IntroTitle';
import Subtitle from '../../components/IntroSubtitle';
import './styles.css';

const txt = {
    title: 'Github',
    subtitle: 'Finder'
}

const Header = (props) => (
    <div className='header'>
        <Title txt={txt.title}/>
        <Subtitle txt={txt.subtitle}/> 
    </div>
);

export default Header;