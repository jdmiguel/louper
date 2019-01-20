import React from 'react';
import { followingDataModel } from '../../../utils/models';
import Grid from '@material-ui/core/Grid';
import Btn from '../../core/Btn';
import './styles.css';

const UserFollowing = ({ data }) => (
        <Grid container className='userFollowingContainer' spacing={16}>
            {
                data.map( userFollowing => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={userFollowing.id}>
                        <div className='userFollowingDataContainer'>
                            <div className='userFollowingTxtContainer'>
                                <h3>{userFollowing.login}</h3>
                                <Btn onClick={ () => window.open(userFollowing.html_url,'_blank') } 
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

UserFollowing.propTypes = {
    data: followingDataModel
};

export default UserFollowing;