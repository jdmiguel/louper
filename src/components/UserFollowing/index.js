import React, {Component} from 'react';

/* core */
import Grid from '@material-ui/core/Grid';
import Btn from '../core/Btn';
import Loader from '../core/Loader';

/* services */
import { getFollowing } from '../../services/github';

/* utils */
import {externalLink} from '../../utils/externalLink';

/* styles */
import './styles.css';


class UserFollowing extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            data: null,
            isLoading: true
        };
    }

    componentDidMount(){
        getFollowing(this.props.user)
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
            <Grid container className='userFollowingContainer' spacing={16}>
                {
                    data.map( userFollowing => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={userFollowing.id}>
                            <div className='userFollowingDataContainer'>
                                <div className='userFollowingTxtContainer'>
                                    <h3>{userFollowing.login}</h3>
                                    <Btn onClick={ () => externalLink(userFollowing.html_url,'_blank') } 
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
        )
    }    
}

export default UserFollowing;