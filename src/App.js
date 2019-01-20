import React, {Component, Fragment} from 'react';
import Intro from './components/containers/Intro/';
import Content from './components/containers/Content/';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            userData: '',
            userRepos: '',
            userFollowing: '',
            intro: true
        }
    }

    setUserDataHandler = userData => {
        this.setState({
            userData
        })
    }

    setUserReposHandler = userRepos => {
        this.setState({
            userRepos
        })
    }

    setUserFollowingHandler = userFollowing => {
        this.setState({
            userFollowing
        })
    }

    onIntroHandler = () => {
        this.setState({
            intro: true
        })
    }

    outIntroHandler = () => {
        this.setState({
            intro: false
        })
    }

    render(){
        const { 
                intro,
                userData, 
                userRepos, 
                userFollowing
            } = this.state;

        return(
            <Fragment>
                { intro 
                    ? <Intro 
                        setUserExists={this.setUserExistsHandler}
                        setUserData={this.setUserDataHandler}
                        setUserRepos={this.setUserReposHandler}
                        setUserFollowing={this.setUserFollowingHandler}
                        outIntro={this.outIntroHandler}
                        /> 
                    : <Content 
                        userData={userData}
                        userRepos={userRepos}
                        userFollowing={userFollowing}
                        onIntro={this.onIntroHandler}
                    />
                }
            </Fragment>
        )
    }
}

export default App;