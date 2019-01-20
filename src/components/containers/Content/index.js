import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { 
    userDataModel, 
    repoDataModel, 
    followingDataModel } from '../../../utils/models';
import Menu from '../../core/Menu';
import FloatBtn from '../../core/FloatBtn';
import UserData from '../UserData';
import UserRepos from '../UserRepos';
import UserFollowing from '../UserFollowing';
import './styles.css';
class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            isUserDataActive: true,
            isUserReposActive: false,
            isUserFollowingActive: false
        }
    }

    menuHandler = index => {
        switch(index){
            default:
            case 0:
                this.setState({
                    isUserDataActive: true,
                    isUserReposActive: false,
                    isUserFollowingActive: false
                });
            break;
            case 1:
                this.setState({
                    isUserDataActive: false,
                    isUserReposActive: true,
                    isUserFollowingActive: false
                });
            break;
            case 2:
                this.setState({
                    isUserDataActive: false,
                    isUserReposActive: false,
                    isUserFollowingActive: true
                });
            break;
        }
    }

    backIntroHandler = () => {
        const { onIntro } = this.props;

        onIntro();
    }

    render(){
        const { isUserDataActive, isUserReposActive, isUserFollowingActive } = this.state;
        const { userData, userRepos, userFollowing } = this.props;

        return(
            <Fragment>
                <Menu onClick={this.menuHandler}/>
                <FloatBtn onClick={this.backIntroHandler}/>
                { isUserDataActive && <UserData data={userData}/> }
                { isUserReposActive && <UserRepos data={userRepos}/> }
                { isUserFollowingActive && <UserFollowing data={userFollowing}/> }
            </Fragment>
        )
    }
}

Content.propTypes = {
    userData: userDataModel,
    userRepos: repoDataModel,
    userFollowing: followingDataModel,
    onIntro: PropTypes.func.isRequired
};

export default Content;