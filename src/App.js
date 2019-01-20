import React from 'react';
import { HashRouter  as Router , Route } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import Intro from './components/containers/Intro/';
import Content from './components/containers/Content/';
import UserData from './components/containers/UserData';
import UserRepos from './components/containers/UserRepos';
import UserFollowing from './components/containers/UserFollowing';

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
      <Route history={history} 
          path="/user/following" 
          component={UserFollowing}
      />
    </div>
  </Router>
);

export default App;