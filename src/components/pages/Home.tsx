import { forwardRef, useState, ReactNode } from 'react';

/* material-ui */
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import { AlertColor } from '@mui/material/Alert';

/* atoms */
import GithubCorner from '../atoms/GithubCorner';
import GithubIcon from '../atoms/GithubIcon';

/* molecules */
import Finder from '../molecules/Finder';
import Footer from '../molecules/Footer';

/* services */
import { getUserData } from '../../services/github';

/* utils */
import { errorLiterals } from '../../utils';

/* styles */
import {
  HomeRoot,
  HomeAlert,
  HomeCorner,
  HomeHeading,
  HomeSubtitle,
  HomeIconWrapper,
} from './styles';

interface AlertProps {
  children?: ReactNode;
  onClose: any;
  severity: AlertColor;
}

const { maximumRequest, unavailableUser } = errorLiterals;

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <HomeAlert
    elevation={4}
    ref={ref as React.RefObject<HTMLDivElement>}
    variant="filled"
    {...props}
  />
));

Alert.displayName = 'Alert';

const Home = ({ onFetchUser }: { onFetchUser: (userData: any) => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const fetchUser = (userName: string) => {
    setIsLoading(true);

    getUserData(userName)
      .then((user: any) => {
        onFetchUser({
          login: user.login,
          avatarUrl: user.avatar_url,
          createdAt: user.created_at,
          name: user.name,
          bio: user.bio,
          email: user.email,
          location: user.location,
          url: user.url,
          blog: user.blog,
          company: user.company,
          htmlUrl: user.html_url,
          repos: user.public_repos,
          followers: user.followers,
          following: user.following,
        });
      })
      .catch((error: any) => {
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

        setIsErrorAlertOpen(true);
        setErrorMsg(errorMsg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onClose = (_event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsErrorAlertOpen(false);
  };

  return (
    <HomeRoot>
      <HomeCorner>
        <GithubCorner />
      </HomeCorner>
      <main>
        <HomeHeading>
          <Typography variant="h1">Github</Typography>
          <HomeSubtitle>
            <Typography variant="h2">Finder</Typography>
            <HomeIconWrapper>
              <GithubIcon />
            </HomeIconWrapper>
          </HomeSubtitle>
        </HomeHeading>
        <Finder onFetchUser={fetchUser} isLoading={isLoading} />
      </main>
      <Footer />
      <Snackbar
        open={isErrorAlertOpen}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        autoHideDuration={3000}
        onClose={onClose}
      >
        <Alert onClose={onClose} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>
    </HomeRoot>
  );
};

export default Home;
