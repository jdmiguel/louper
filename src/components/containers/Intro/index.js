import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../core/Loader';
import Header from '../Header';
import GithubCorner from '../../core/GithubCorner/';
import Input from '../../core/Input';
import Btn from '../../core/Btn';
import ErrorModal from '../../core/ErrorModal';
import { 
    getRepos,
    getUserData,
    getUserFollowers,
    getUserFollowing } from '../../../services/github';
import { errorLiterals } from '../../../utils/errorLiterals';   
import './styles.css';

class Intro extends Component {
    constructor(props){
        super(props);
        this.state = {
            isInputEmpty: true,
            userSelected: '',
            isLoaderVisible: false,
            errorMsg: '',
            onErrorModal: false
        }
    }

    getInputValue = (e) => {
        const value = e.target.value;
        const isEmpty = !value;

        this.setState({
            isInputEmpty: isEmpty,
            userSelected: value
        });
    }

    sendUserData = () => {
        const userSelected = this.state.userSelected;

        this.setState({
            isLoaderVisible: true
        });

        this.fetchData(userSelected);
    }

    errorModalHandler = () => {
        const inputHTML = document.querySelector('input');
        
        inputHTML.value = '';
        inputHTML.focus();

        this.setState({onErrorModal: false});
    }

    fetchData = async (user) => {
        const { setUserData, 
            setUserRepos, 
            setUserFollowers, 
            setUserFollowing } = this.props;
        const { maximumRequest, unavailableUser } = errorLiterals; 

        let userName = '';

        await getUserData(user)
            .then( response => {
                setUserData( response )
                userName = response.login;
            })
            .catch( error => {
                let errorMsg = '';

                console.log(error.code)

                switch (error.code) {
                    case 403:
                        errorMsg = maximumRequest;
                        break;
                    case 404:
                    default:
                        errorMsg = unavailableUser;
                        break;
                }

                this.setState({
                    isLoaderVisible: false,
                    onErrorModal: true,
                    errorMsg
                });
            }
        );

        await getRepos(user)
                .then( response => setUserRepos(response) );
        await getUserFollowers(userName)
                .then( response => setUserFollowers(response))        
        await getUserFollowing(userName)
                .then( response => setUserFollowing(response) );
        await this.goContent();
    }

    goContent = () => {
        const { outIntro } = this.props;
        
        outIntro();
    }

    onKeyDown = event => {
        const { isInputEmpty } = this.props;

        if(!isInputEmpty && event.keyCode === 13) this.sendUserData();
    }

    componentDidMount(){
        document.addEventListener('keydown',this.onKeyDown);
    }

    componentWillUnmount(){
        document.removeEventListener('keydown',this.onKeyDown);
    } 

    render() {
        const { isInputEmpty, 
                isLoaderVisible, 
                onErrorModal, 
                errorMsg } = this.state;

        return (
            <Fragment>
                <GithubCorner data-test="intro-githubCorner"/>
                <div className='intro' data-test="intro-container">
                    <Header data-test="intro-header"/>
                    <Input data-test="intro-input" 
                        changeUserHandler={this.getInputValue} />
                    <div className='intro-btn-container'>    
                    { !isInputEmpty && 
                        <Btn data-test="intro-btn"
                            onClick={this.sendUserData} 
                            type="forward"
                            txt="GO AHEAD"/> }
                    </div>        
                    { isLoaderVisible && <Loader data-test="intro-loader"/> }
                    { onErrorModal && 
                            <ErrorModal data-test="intro-errorModal"
                                isErrorModalOpen={onErrorModal}
                                onClick={this.errorModalHandler}
                                msg={errorMsg}
                            /> }
                </div>
            </Fragment>
        );
    }
}

Intro.propTypes = {
    setUserData: PropTypes.func.isRequired,
    setUserRepos: PropTypes.func.isRequired,
    setUserFollowers: PropTypes.func.isRequired,
    setUserFollowing: PropTypes.func.isRequired,
    outIntro: PropTypes.func.isRequired
};

export default Intro;