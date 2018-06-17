import React from 'react';
import storeInstance from '../../store/Store';
/* import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper'; */
import Email from '@material-ui/icons/Email';
import Home from '@material-ui/icons/Home';
import Link from '@material-ui/icons/Link';
import Contacts from '@material-ui/icons/Contacts';
import Btn from '../../components/Btn';
import './styles.css';

const clickBtnHandler = () => {
    window.open(storeInstance.getUserData().html_url,'_blank');
};

const UserData = () => {
    console.log(storeInstance.getUserData())
    const data = storeInstance.getUserData();
    const location = data.location ? <p><Home className='userDataIcon'/>{data.location}</p> : null;
    const company = data.company ? <p><Contacts className='userDataIcon'/>{data.company}</p> : null;
    const email = data.email ? <p><Email className='userDataIcon'/><a href={data.email} target='_blank'>{data.email}</a></p> : null;
    const url = data.blog ? <p><Link className='userDataIcon'/><a href={data.blog} target='_blank'>{data.blog}</a></p> : null;

    return (
        <div className='userDataContainer'>
            <img alt="user image"
                src={data.avatar_url}
                className='userAvatar'/>
            <div className='txtContainer'>
                <h1>{data.name}</h1>
                <h2>{data.bio}</h2>
                <div className='subUserInfo'>
                    {email}
                    {location}
                    {url}
                    {company}
                </div>
                <Btn onClickBtn={() => clickBtnHandler()}
                        type="forward"
                        txt="VISIT PROFILE" />
            </div>
        </div>
    )
};

export default UserData;