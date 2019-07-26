import React, {Component} from 'react';

/* core */
import Grid from '@material-ui/core/Grid';
import Btn from '../core/Btn';
import Loader from '../core/Loader';

/* services */
import { getFollowers } from '../../services/github';

/* utils */
import {externalLink} from '../../utils/externalLink';

/* styles */
import './styles.css';

class UserFollowers extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            data: null,
            isLoading: true
        };
    }

    componentDidMount(){
        getFollowers(this.props.user)
        .then(data => {
            this.setState({
                data
            }); 
        })
        .catch(error => {
            throw error; 
        })
        .finally( ()=> {
            this.setState({
                isLoading: false
            });  
        });
    }

    render(){
        const {isLoading, data} = this.state;

        return isLoading ? <Loader /> : (
            <Grid container className='userFollowerContainer' spacing={16}>
                {
                    data.map( userFollower => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={userFollower.id}>
                            <div className='userFollowerDataContainer'>
                                <div className='userFollowerTxtContainer'>
                                    <h3>{userFollower.login}</h3>
                                    <Btn onClick={ () => externalLink(userFollower.html_url,'_blank') } 
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
    }
}    

export default UserFollowers;