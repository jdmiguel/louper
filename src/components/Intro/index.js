import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/* components */
import Header from '../Header';

/* core */
import Loader from '../core/Loader';
import GithubCorner from '../core/GithubCorner';
import Input from '../core/Input';
import Btn from '../core/Btn';
import ErrorModal from '../core/ErrorModal';

/* services */
import { getUserData } from '../../services/github';

/* utils */
import { errorLiterals } from '../../utils/errorLiterals';

/* styles */
import './styles.css';

class Intro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userSelected: '',
      isLoading: false,
      errorMsg: '',
      onErrorModal: false
    };
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onKeyUpHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeyUpHandler);
  }

  onChangeHandler = e => {
    const { value } = e.target;

    this.setState({
      userSelected: value
    });
  };

  sendUserData = () => {
    const { userSelected } = this.state;

    this.setState({
      isLoading: true
    });

    this.fetchData(userSelected);
  };

  fetchData = user => {
    const { setUserData } = this.props;
    const { maximumRequest, unavailableUser } = errorLiterals;

    this.setState({
      isLoading: true
    });

    getUserData(user)
      .then(userData => {
        setUserData(userData);
      })
      .catch(error => {
        let errorMsg = '';

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
          onErrorModal: true,
          errorMsg,
          isLoading: false
        });
      });
  };

  onKeyUpHandler = event => {
    const { userSelected } = this.state;

    if (userSelected && event.keyCode === 13) {
      this.sendUserData();
    }
  };

  render() {
    const { isLoading, onErrorModal, userSelected, errorMsg } = this.state;

    return (
      <Fragment>
        <GithubCorner data-test="intro-githubCorner" />
        <div className="intro" data-test="intro-container">
          <Header data-test="intro-header" />
          <Input
            data-test="intro-input"
            onChange={this.onChangeHandler}
            value={userSelected}
          />
          {userSelected && (
            <div className="intro-btn-container">
              <Btn
                data-test="intro-btn"
                onClick={this.sendUserData}
                type="forward"
                txt="GO AHEAD"
              />
            </div>
          )}
          {isLoading && <Loader data-test="intro-loader" />}
          {onErrorModal && (
            <ErrorModal
              data-test="intro-errorModal"
              isErrorModalOpen={onErrorModal}
              onClick={() => this.setState({ onErrorModal: false })}
              msg={errorMsg}
            />
          )}
        </div>
      </Fragment>
    );
  }
}

Intro.propTypes = {
  setUserData: PropTypes.func.isRequired
};

export default Intro;
