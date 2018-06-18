import React from 'react';
import { HashRouter  as Router , Route } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import Intro from './containers/Intro/';
import Content from './containers/Content/';
import UserData from './containers/UserData';
import UserRepos from './containers/UserRepos';

const history = createHistory();

const App = () => (
  <Router >
    <div>
      <Route history={history} 
            exact 
            path="/" 
            component={Intro}
      />
      <Route history={history} 
          path="/user" 
          component={Content}
      />
      <Route history={history} 
          path="/user/data" 
          component={UserData}
      />
      <Route history={history} 
          path="/user/repos" 
          component={UserRepos}
      />
    </div>
  </Router>
);

export default App;