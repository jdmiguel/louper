import React from 'react';
import storeInstance from '../../../store/Store';
import Grid from '@material-ui/core/Grid';
import Btn from '../../core/Btn';
import './styles.css';

const clickBtnHandler = url => window.open(url,'_blank');

const UserFollowing = () => {
    const data = storeInstance.getUserFollowing();
    //console.log('userFollowingData: ',data);

    return (
        <Grid container className='userFollowingContainer' spacing={16}>
            {
                data.map( userFollowing => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={userFollowing.id}>
                        <div className='userFollowingDataContainer'>
                            <div className='userFollowingTxtContainer'>
                                <h1>{userFollowing.login}</h1>
                                <Btn onClickBtn={ () => clickBtnHandler(userFollowing.html_url) }
                                    type="account_circle"
                                    txt="VISIT PROFILE" />
                            </div>
                            <img alt="user following avatar"
                                src={userFollowing.avatar_url}
                                className='userFollowingAvatar'/>
                        </div>
                    </Grid>
                ))
            }
      </Grid>
    );
};

export default UserFollowing;