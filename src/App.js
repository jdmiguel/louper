import React, { Component, Fragment } from 'react';
import Intro from './components/Intro';
import Content from './components/Content';
import Footer from './components/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      intro: true
    };
  }

  onSetUserData = userData => {
    this.setState({
      userData,
      intro: false
    });
  };

  onBackIntro = () => {
    this.setState({
      intro: true,
      userData: null
    });
  };

  render() {
    const { intro, userData } = this.state;

    return (
      <Fragment>
        {intro ? (
          <Intro data-test="app-intro" setUserData={this.onSetUserData} />
        ) : (
          <Content
            data-test="app-content"
            userData={userData}
            backIntro={this.onBackIntro}
          />
        )}
        <Footer data-test="app-footer" />
      </Fragment>
    );
  }
}

export default App;
