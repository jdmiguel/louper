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
    getUserFollowing,
    getUserFollowers,
    getUserStarred
 } from '../../../services/github';
import { errorLiterals } from '../../../utils/errorLiterals';   
import './styles.css';

class Intro extends Component {
    constructor(props){
        super(props);

        this.state = {
            userSelected: '',
            isLoaderVisible: false,
            errorMsg: '',
            onErrorModal: false
        }
    }

    onChangeHandler = (e) => {
        const value = e.target.value;

        this.setState({
            userSelected: value
        });
    }

    sendUserData = () => {
        const { userSelected } = this.state;

        this.setState({
            isLoaderVisible: true
        });

        this.fetchData(userSelected);
    }

    errorModalHandler = () => {
        this.setState({onErrorModal: false});
    }

    fetchData = async (user) => {
        const { setData } = this.props;
        const { maximumRequest, unavailableUser } = errorLiterals; 

        let userName = '';

        await getUserData(user)
            .then( response => {
                setData(response);
                userName = response.login;
            })
            .catch(error => {
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
                .then( response => setData(response) );

        await getUserFollowing(userName)
                .then( response => setData(response) );        

        await getUserFollowers(userName)
                .then( response => setData(response) );  

        await getUserStarred(userName)
                .then( response => setData(response) );  

        await this.goContent();
    }

    goContent = () => {
        const { outIntro } = this.props;
        
        outIntro();
    }

    onKeyUpHandler = event => {
        const { userSelected } = this.state;

        if(userSelected && event.keyCode === 13) this.sendUserData();
    }

    render() {
        const { isLoaderVisible, 
                onErrorModal, 
                userSelected,
                errorMsg } = this.state;

        return (
            <Fragment>
                <GithubCorner data-test="intro-githubCorner"/>
                <div className='intro' 
                    data-test="intro-container" 
                    onKeyUp={this.onKeyUpHandler}>
                    <Header data-test="intro-header"/>
                    <Input data-test="intro-input" 
                        onChange={this.onChangeHandler} 
                        value={userSelected} />
                    <div className='intro-btn-container'>    
                    { userSelected && 
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
    setData: PropTypes.func.isRequired,
    outIntro: PropTypes.func.isRequired
};

export default Intro;