import { useState } from 'react';

/* material-ui */
import { makeStyles } from '@material-ui/core/styles';

/* pages */
import Home from './pages/Home';
import User from './pages/User';

/* molecules */
import Footer from './molecules/Footer';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100vh',
    position: 'relative',
  },
});

const App = () => {
  const classes = useStyles();

  const [userData, setUserData] = useState(null);
  const [hasSelectedUser, setHasSelectedUser] = useState(false);

  return (
    <div className={classes.wrapper}>
      {hasSelectedUser ? (
        <User
          data-test="app-userContent"
          data={userData}
          onBackFinder={() => {
            setUserData(null);
            setHasSelectedUser(false);
          }}
        />
      ) : (
        <Home
          data-test="app-finder"
          onFetchUser={(data) => {
            setUserData(data);
            setHasSelectedUser(true);
          }}
        />
      )}
      <Footer data-test="app-footer" />
    </div>
  );
};

export default App;
