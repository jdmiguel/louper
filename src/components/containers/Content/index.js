import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { 
    userDataModel, 
    repoDataModel, 
    followingDataModel,
    followersDataModel } from '../../../utils/models';
import Menu from '../Menu';
import UserData from '../UserData';
import UserRepos from '../UserRepos';
import UserFollowing from '../UserFollowing';
import UserFollowers from '../UserFollowers';
import StarredProjects from '../StarredProjects';
import FloatBtn from '../../core/FloatBtn';
import './styles.css';
class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            isUserDataActive: true,
            isUserReposActive: false,
            isUserFollowingActive: false,
            isUserFollowersActive: false,
            isStarredProjectsActive: false,
        }
    }

    menuHandler = index => {
        switch(index){
            case 1:
                this.setState({
                    isUserDataActive: false,
                    isUserReposActive: true,
                    isUserFollowingActive: false,
                    isUserFollowersActive: false,
                    isStarredProjectsActive: false
                });
            break;
            case 2:
                this.setState({
                    isUserDataActive: false,
                    isUserReposActive: false,
                    isUserFollowingActive: true,
                    isUserFollowersActive: false,
                    isStarredProjectsActive: false
                });
            break;
            case 3:
                this.setState({
                    isUserDataActive: false,
                    isUserReposActive: false,
                    isUserFollowingActive: false,
                    isUserFollowersActive: true,
                    isStarredProjectsActive: false
                });
            break;
            case 4:
                this.setState({
                    isUserDataActive: false,
                    isUserReposActive: false,
                    isUserFollowingActive: false,
                    isUserFollowersActive: false,
                    isStarredProjectsActive: true
                });
            break;
            default:
            case 0:
                this.setState({
                    isUserDataActive: true,
                    isUserReposActive: false,
                    isUserFollowingActive: false,
                    isUserFollowersActive: false,
                    isStarredProjectsActive: false
                });
            break;
        }
    }

    backIntroHandler = () => {
        const { onIntro } = this.props;

        onIntro();
    }

    render(){
        const { isUserDataActive, 
            isUserReposActive,  
            isUserFollowingActive,
            isUserFollowersActive,
            isStarredProjectsActive
        } = this.state;
        const { userData, 
            userRepos, 
            userFollowing,
            userFollowers,
            starredProjects
         } = this.props

        return(
            <Fragment>
                <Menu onClick={this.menuHandler}/>
                <FloatBtn onClick={this.backIntroHandler}/>
                { isUserDataActive && <UserData data={userData}/> }
                { isUserReposActive && <UserRepos data={userRepos}/> }
                { isUserFollowingActive && <UserFollowing data={userFollowing}/> }
                { isUserFollowersActive && <UserFollowers data={userFollowers}/> }
                { isStarredProjectsActive && <StarredProjects data={starredProjects}/> }
            </Fragment>
        )
    }
}

Content.propTypes = {
    userData: userDataModel,
    userRepos: repoDataModel,
    userFollowing: followingDataModel,
    userFollowers: followersDataModel,
    starredProjects: followersDataModel,
    onIntro: PropTypes.func.isRequired,
};

export default Content;