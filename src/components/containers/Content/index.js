import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { dataModel } from '../../../utils/models';
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

        const { data } = props;
        let availableDataSections = { userSection: true };

        data.forEach( (item,index) => {
            switch (index) {
                case 1:
                default:
                    availableDataSections.reposSection = !!item.length;    
                    break;
                case 2:
                    availableDataSections.followingSection = !!item.length;
                    break;
                case 3:
                    availableDataSections.followersSection = !!item.length;
                    break;
                case 4:
                    availableDataSections.starredSection = !!item.length;
                    break;    
            }
        });

        const availableSections = [];
        const allSections = [];
        
        for (const key in availableDataSections) {
            if(availableDataSections[key] === true) {
                availableSections.push(`${key}`);
            }

            allSections.push(`${key}`);
        };
        

        this.state = {
            activeSection: 'userSection',
            availableDataSections,
            availableSections,
            allSections
        }
    }

    menuHandler = index => {
        const { availableSections } = this.state;
        const activeSection = availableSections[index];

        this.setState({
            activeSection
        });
    }

    backIntroHandler = () => {
        const { onIntro, resetData } = this.props;
        
        onIntro();
        resetData();
    }

    render(){
        const { data } = this.props;
        const { activeSection , 
                availableDataSections, 
                allSections 
        } = this.state;

        const [
            userSection,
            reposSection,
            followingSection,
            followersSection,
            starredSection
        ] = allSections; 

        const [
            userData,
            reposData,
            followingData,
            followersData,
            starredData
        ] = data;  

        return(
            <Fragment>
                <Menu onClick={this.menuHandler} tabs={availableDataSections}/>
                <FloatBtn onClick={this.backIntroHandler}/>
                { activeSection === userSection && <UserData data={userData}/> }
                { activeSection === reposSection && <UserRepos data={reposData}/> }
                { activeSection === followingSection && <UserFollowing data={followingData}/>  }
                { activeSection === followersSection && <UserFollowers data={followersData}/> }
                { activeSection === starredSection && <UserStarred data={starredData}/> }
            </Fragment>
        )
    }
}

Content.propTypes = {
    data: dataModel,
    onIntro: PropTypes.func.isRequired,
    resetData: PropTypes.func.isRequired
};

export default Content;