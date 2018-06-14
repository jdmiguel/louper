import React, { Component } from 'react';
import Intro from './containers/Intro/Intro';
import Content from './containers/Content/Content';

class App extends Component {

  state = {
    inUserContent: false
  }

  offIntroHandler = () => {
    this.setState({
      inUserContent: true
    });
  }

  render() {
    const intro = !this.state.inUserContent ? <Intro offIntro={this.offIntroHandler}/> : null;
    const content = this.state.inUserContent ? <Content /> : null;

    return (
      <div className="App">
        {intro}
        {content}
      </div>
    );
  }
}

export default App;