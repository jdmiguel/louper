import React from 'react';
import { followersDataModel } from '../../../utils/models';
import Grid from '@material-ui/core/Grid';
import Btn from '../../core/Btn';
import './styles.css';

const UserFollowers = ({ data }) => (
        <Grid container className='userFollowerContainer' spacing={16}>
            {
                data.map( userFollower => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={userFollower.id}>
                        <div className='userFollowerDataContainer'>
                            <div className='userFollowerTxtContainer'>
                                <h3>{userFollower.login}</h3>
                                <Btn onClick={ () => window.open(userFollower.html_url,'_blank') } 
                                    type="account_circle"
                                    txt="VISIT PROFILE" />
                            </div>
                            <img alt="user follower avatar"
                                src={userFollower.avatar_url}
                                className='userFollowerAvatar'/>
                        </div>
                    </Grid>
                ))
            }
      </Grid>
    );

UserFollowers.propTypes = {
    data: followersDataModel
};

export default UserFollowers;