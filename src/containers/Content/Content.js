import React, { Component } from 'react';
import './Content.css';
import storeInstance from '../../store/Store';
import GithubTabs from '../../components/GithubTabs/GithubTabs'

class Content extends Component {
    componentDidMount(){
        let user = storeInstance.getUserData();
        let repos = storeInstance.getUserRepos();
        console.log('user: ', user);
        console.log('repos: ', repos);
    }

    render() {
        return (
            <div>
                <GithubTabs/>
            </div>
        );
    }
}

export default Content;