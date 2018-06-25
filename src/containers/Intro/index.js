import React, { Component } from 'react';
import Loader from '../../components/Loader';
import Header from '../Header';
import Input from '../../components/IntroInput';
import Btn from '../../components/Btn';
import ErrorModal from '../../components/ErrorModal';
import { getRepos,getUserData,getUserFollowing } from '../../controllers/github-api';
import storeInstance from '../../store/Store';
import { observer } from 'mobx-react';
import './styles.css';

class Intro extends Component {

    state = {
        isInputEmpty: true,
        userSelected: '',
        isLoaderVisible: false,
        onErrorModal: false
    }

    getInputValue = (e) => {
        let isEmpty = e.target.value ? false : true;

        this.setState({
            isInputEmpty: isEmpty,
            userSelected: e.target.value
        });
    }

    sendUserData = () => {
        let userSelected = this.state.userSelected;

        this.setState({
            isLoaderVisible: true
        });

        this.fetchData(userSelected);
    }

    errorModalCloseHandler = () => {
        this.setState({onErrorModal: false});
        
        let inputHTML = document.querySelector('input');
        inputHTML.value = '';
        inputHTML.focus();
    }

    fetchData = async (user) => {
        let userName = '';

        getUserData(user)
            .then( result => {
                storeInstance.setUserData( result.user )
                userName = result.user.login;
                //console.log('userName: ',userName);
            })
            .catch( error => {
                this.setState({
                    isLoaderVisible: false,
                    onErrorModal: true
                });

                console.log('error from getUserData in Intro', error);
            }
        );

        await getRepos(user).then( result => storeInstance.setUserRepos( result) );
        await getUserFollowing(userName).then( result => storeInstance.setUserFollowing( result) );
        await this.entryApp();
    }

    entryApp = () => {
        storeInstance.setUserExists();
        this.props.history.push('/user/data');
    }

    onKeyDown = event => {
        if(!this.state.isInputEmpty && event.keyCode === 13) this.sendUserData();
    }

    componentDidMount(){
        document.addEventListener('keydown',this.onKeyDown);
    }

    render() {
        const btn = !this.state.isInputEmpty ? <Btn onClickBtn={this.sendUserData} 
                                                   type="forward"
                                                   txt="GO AHEAD"/> 
                                              : null;

        const loader = this.state.isLoaderVisible ? <Loader/> : null;

        const errorModal = this.state.onErrorModal ? <ErrorModal isErrorModalOpen={this.state.onErrorModal}
                                                                 clickErrorModalBtnHandler={this.errorModalCloseHandler}/> 
                                                     : null;

        return (
            <div className='intro'>
                <Header/>
                <Input changeUserHandler={this.getInputValue} />
                {btn}
                {loader}
                {errorModal}
            </div>
        );
    }
}

export default observer(Intro);