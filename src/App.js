import React, { Component, Fragment } from 'react';

/* components */
import Intro from './components/Intro';
import UserContent from './components/UserContent';
import Footer from './components/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      intro: true,
    };
  }

  onSetUserData = (userData) => {
    this.setState({
      userData,
      intro: false,
    });
  };

  onBackIntro = () => {
    this.setState({
      intro: true,
      userData: null,
    });
  };

  render() {
    const { intro, userData } = this.state;

    return (
      <>
        {intro ? (
          <Intro data-test="app-intro" setUserData={this.onSetUserData} />
        ) : (
          <UserContent
            data-test="app-userContent"
            userData={userData}
            backIntro={this.onBackIntro}
          />
        )}
        <Footer data-test="app-footer" />
      </>
    );
  }
}

export default App;
