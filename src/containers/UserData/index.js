import React from 'react';
import storeInstance from '../../store/Store';
/* import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper'; */
import Map from '@material-ui/icons/Map';
import Email from '@material-ui/icons/Email';
//import AccountMultiple from '@material-ui/icons/AccountMultiple';
import Btn from '../../components/Btn';
import './styles.css';

//const userData = storeInstance.getUserData();

const clickBtnHandler = () => {
    window.open(storeInstance.getUserData().html_url,'_blank');
};

const UserData = () => (
    
    <div className='userDataContainer'>
    {console.log(storeInstance.getUserData())}
        <div className='dataContainer'>
            <img alt="user image"
                 src={storeInstance.getUserData().avatar_url}
                 className='userAvatar'/>
            <div className='txtContainer'>
                <h1>{storeInstance.getUserData().name}</h1>
                <h2>{storeInstance.getUserData().bio}</h2>
                <div className='subUserInfo'>
                    <p><Email/>{storeInstance.getUserData().email}</p>
                    <p><Map/>{storeInstance.getUserData().location}</p>
                    <p>{storeInstance.getUserData().blog}</p>
                </div>
                <Btn onClickBtn={this.clickBtnHandler} type="forward" txt="VISIT PROFILE"/>
            </div>
        </div>
    </div>
);

export default UserData;