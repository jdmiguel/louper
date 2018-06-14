import React, { Component } from 'react';
import './Intro.css';
import GithubHeader from '../../components/GithubHeader/GithubHeader';
import GithubInput from '../../components/GithubInput/GithubInput';
import GithubBtn from '../../components/GithubBtn/GithubBtn';
import { getRepos,getUserData } from '../../controllers/github-api';
import storeInstance from '../../store/Store';
import { observer } from 'mobx-react';
import GithubLoader from '../../components/GithubLoader/GithubLoader';

class Intro extends Component {

    state = {
        isInputEmpty: false,
        userSelected: '',
        isLoaderVisible: false
    }

    getInputValue = (e) => {
        let isEmpty = e.target.value ? true : false;

        this.setState({
            isInputEmpty: isEmpty,
            userSelected: e.target.value
        });
    }

    clickBtnHandler = () => {
        let userSelected = this.state.userSelected;

        this.setState({
            isLoaderVisible: true
        });

        this.fetchData(userSelected);
    }

    fetchData = async (data) => {
        await getUserData(data).then( result => storeInstance.setUserData( result.user ) );
        //await getRepos(data).then( result => { console.log('initResult',result); storeInstance.setUserRepos( Array.of(result) ) });
        await getRepos(data).then( result => storeInstance.setUserRepos( result) );
        //await this.checkData();
        await this.entryApp();
    }

    checkData = () => {
        let user = storeInstance.getUserData();
        let repos = storeInstance.getUserRepos();
        console.log('user: ', user.name);
        console.log('repos: ', repos);
    }

    entryApp = () => {
        this.setState({
            isLoaderVisible: false
        });
    }

    render() {
        const btn = this.state.isInputEmpty ? <GithubBtn onClickBtn={this.clickBtnHandler}/> : null;
        const loader = this.state.isLoaderVisible ? <GithubLoader/> : null;

        return (
            <div className='intro'>
                <GithubHeader/>
                <GithubInput changeUserHandler={this.getInputValue}/>
                {btn}
                {loader}
            </div>
        );
    }
}

export default observer(Intro);