import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { 
    userDataModel, 
    repoDataModel, 
    followingDataModel,
    followersDataModel,
    starredDataModel
} from '../../../utils/models';
import Menu from '../Menu';
import UserData from '../UserData';
import UserRepos from '../UserRepos';
import UserFollowing from '../UserFollowing';
import UserFollowers from '../UserFollowers';
import UserStarred from '../UserStarred';
import FloatBtn from '../../core/FloatBtn';
class Content extends Component {
    constructor(props){
        super(props);

        const availableSectionsUpdated = 
            Object.values(props).reduce( (total,acc) => {
                if(acc.length > 0){
                    total.push(acc);
                }

                return total;
            }, []);

        this.state = {
            itemActive: 0,
            availableSections: availableSectionsUpdated
        }
    }

    menuHandler = index => {
        this.setState({
            itemActive: index
        });
    }

    backIntroHandler = () => {
        const { onIntro } = this.props;

        onIntro();
    }

    render(){
        const { userData } = this.props;

        const userDataComponent = userData[0].length 
                                    ? <UserData data={userData[0]}/>
                                    : null;         
        const ReposComponent = userData[1].length 
                                    ? <UserRepos data={userData[1]}/>
                                    : null; 
        const FollowingComponent = userData[2].length 
                                    ? <UserFollowing data={userData[2]}/> 
                                    : null;                             
        const FollowersComponent = userData[3].length 
                                    ? <UserFollowers data={userData[3]}/> 
                                    : null;                                       
        const starredComponent = userData[4].length 
                                    ? <UserStarred data={userData[4]}/> 
                                    : null;                                     

        return(
            <Fragment>
                <Menu onClick={this.menuHandler} />
                <FloatBtn onClick={this.backIntroHandler}/>
                { userDataComponent }
                { ReposComponent }
                { FollowersComponent }
                { FollowingComponent }
                { starredComponent }
            </Fragment>
        )
    }
}

Content.propTypes = {
    userData: userDataModel,
    userRepos: repoDataModel,
    userFollowing: followingDataModel,
    userFollowers: followersDataModel,
    userStarred: starredDataModel,
    onIntro: PropTypes.func.isRequired,
};

export default Content;