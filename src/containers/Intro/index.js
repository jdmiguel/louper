import React, { Component } from 'react';
import './styles.css';
import GithubLoader from '../../components/GithubLoader';
import GithubHeader from '../../components/GithubHeader';
import GithubInput from '../../components/GithubInput';
import GithubBtn from '../../components/GithubBtn';
import { getRepos,getUserData } from '../../controllers/github-api';
import storeInstance from '../../store/Store';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

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
        await getRepos(data).then( result => storeInstance.setUserRepos( result) );
        await this.entryApp();
    }

    entryApp = () => {
        const userId = storeInstance.getUserData().id;
        this.props.history.push('/user/data');
    }

    render() {
        const btn = this.state.isInputEmpty ? <GithubBtn onClickBtn={this.clickBtnHandler} type="forward" txt="GO AHEAD"/> : null;
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

Intro.propTypes = {
    offIntro: PropTypes.func
};

export default observer(Intro);