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

/* types */
import { User } from '../../utils/types';

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
  onClose: () => void;
  severity: AlertColor;
}

interface ResponseError extends Error {
  code: number;
}

enum ErrorMsg {
  MAX = 'You have excedeed the maximum allowed request. Please, wait for a while',
  NO_USER = 'Please, choose an available user',
}

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <HomeAlert elevation={4} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'Alert';

type Props = {
  onFetchUser: (user: User) => void;
};

const HomePage = ({ onFetchUser }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const fetchUser = (userName: string) => {
    setIsLoading(true);

    getUserData(userName)
      .then((user: User) => {
        onFetchUser({
          login: user.login,
          avatar_url: user.avatar_url,
          created_at: user.created_at,
          name: user.name,
          bio: user.bio,
          email: user.email,
          location: user.location,
          blog: user.blog,
          company: user.company,
          html_url: user.html_url,
          public_repos: user.public_repos,
          followers: user.followers,
          following: user.following,
        });
      })
      .catch((error: ResponseError) => {
        let errorMsg = '';

        switch (error.code) {
          case 403:
            errorMsg = ErrorMsg.MAX;
            break;
          case 404:
          default:
            errorMsg = ErrorMsg.NO_USER;
            break;
        }

        setIsErrorAlertOpen(true);
        setErrorMsg(errorMsg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onClose = () => setIsErrorAlertOpen(false);

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

export default HomePage;
