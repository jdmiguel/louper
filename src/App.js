import React, { Component, Fragment } from 'react';
import Intro from './components/Intro';
import Content from './components/Content';
import Footer from './components/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      remainingData: null,
      intro: true
    };
  }

  render() {
    const { intro, userData, remainingData } = this.state;

    return (
      <Fragment>
        {intro ? (
          <Intro
            setData={(userData, remainingData) => {
              this.setState({
                userData,
                remainingData,
                intro: false
              });
            }}
          />
        ) : (
          <Content
            userData={userData}
            remainingData={remainingData}
            onIntro={() => {
              this.setState({
                intro: true
              });
            }}
            resetData={() => {
              this.setState({
                userData: null,
                remainingData: null
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
