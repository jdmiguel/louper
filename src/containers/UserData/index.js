import React from 'react';
import storeInstance from '../../store/Store';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import GithubBtn from '../../components/GithubBtn';
import './styles.css';


//userData: storeInstance.getUserData(),
//userRepos: storeInstance.getUserRepos()

const userData = storeInstance.getUserData();

const clickBtnHandler = () => {
    window.open(storeInstance.getUserData().html_url,'_blank');
};

const UserData = () => (
    
    <div className='userDataContainer'>
    {console.log(storeInstance.getUserData())}
        <Paper elevation={4} className='dataContainer'>
            <div className='txtContainer'>
                <h1>{storeInstance.getUserData().name}</h1>
                <h2>{storeInstance.getUserData().bio}</h2>
                <GithubBtn onClickBtn={this.clickBtnHandler} type="forward" txt="VISIT PROFILE"/>
            </div>
            <Avatar
                alt="user image"
                src={storeInstance.getUserData().avatar_url
                }
                className='userAvatar'
            />
        </Paper>
    </div>
);

/* UserData.propTypes = {
    userData: PropTypes.func
}; */

export default UserData;