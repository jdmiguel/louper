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

  render() {
    const { intro, userData } = this.state;

    return (
      <Fragment>
        {intro ? (
          <Intro
            setUserData={userData => {
              this.setState({
                userData,
                intro: false
              });
            }}
          />
        ) : (
          <Content
            userData={userData}
            backIntro={() => {
              this.setState({
                intro: true,
                userData: null
              });
            }}
          />
        )}
        <Footer />
      </Fragment>
    );
  }
}

export default App;
