import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../core/Loader';
import Header from '../Header';
import GithubCorner from '../../core/GithubCorner/';
import Input from '../../core/IntroInput';
import Btn from '../../core/Btn';
import ErrorModal from '../../core/ErrorModal';
import { 
    getRepos,
    getUserData,
    getUserFollowing } from '../../../services/github-api';
import './styles.css';

class Intro extends Component {
    constructor(props){
        super(props);
        this.state = {
            isInputEmpty: true,
            userSelected: '',
            isLoaderVisible: false,
            onErrorModal: false
        }
    }

    getInputValue = (e) => {
        const isEmpty = e.target.value ? false : true;

        this.setState({
            isInputEmpty: isEmpty,
            userSelected: e.target.value
        });
    }

    sendUserData = () => {
        const userSelected = this.state.userSelected;

        this.setState({
            isLoaderVisible: true
        });

        this.fetchData(userSelected);
    }

    errorModalCloseHandler = () => {
        const inputHTML = document.querySelector('input');
        
        inputHTML.value = '';
        inputHTML.focus();

        this.setState({onErrorModal: false});
    }

    fetchData = async (user) => {
        const { setUserData, setUserRepos, setUserFollowing } = this.props;
        let userName = '';

        getUserData(user)
            .then( result => {
                setUserData( result.user )
                userName = result.user.login;
               // console.log('userName: ',userName);
            })
            .catch( error => {
                this.setState({
                    isLoaderVisible: false,
                    onErrorModal: true
                });

                console.log('error from getUserData in Intro', error);
            }
        );

        await getRepos(user)
                .then( result => setUserRepos( result) );
        await getUserFollowing(userName)
                .then( result => setUserFollowing( result) );
        await this.goContent();
    }

    goContent = () => {
        const { outIntro } = this.props;
        
        outIntro();
    }

    onKeyDown = event => {
        if(!this.state.isInputEmpty && event.keyCode === 13) this.sendUserData();
    }

    componentDidMount(){
        document.addEventListener('keydown',this.onKeyDown);
    }

    componentWillUnmount(){
        document.removeEventListener('keydown',this.onKeyDown);
    } 

    render() {
        const { isInputEmpty, isLoaderVisible, onErrorModal } = this.state;

        return (
            <Fragment>
                <GithubCorner />
                <div className='intro'>
                    <Header/>
                    <Input changeUserHandler={this.getInputValue} />
                    { !isInputEmpty && 
                        <Btn onClick={this.sendUserData} 
                            type="forward"
                            txt="GO AHEAD"/> }
                    { isLoaderVisible && <Loader/> }
                    { onErrorModal && 
                            <ErrorModal isErrorModalOpen={this.state.onErrorModal}
                                        clickErrorModalBtnHandler={this.errorModalCloseHandler}
                            /> }
                </div>
            </Fragment>
        );
    }
}

Intro.propTypes = {
    setUserData: PropTypes.func.isRequired,
    setUserRepos: PropTypes.func.isRequired,
    setUserFollowing: PropTypes.func.isRequired,
    outIntro: PropTypes.func.isRequired
};

export default Intro;