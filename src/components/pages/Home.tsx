import { forwardRef, useState, ReactNode } from 'react';

/* material-ui */
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAlert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
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

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100vh',
});

const StyledAlert = styled(MuiAlert)({
  '& .MuiAlert-icon': {
    padding: '9px 0',
  },
  '& .MuiAlert-message': {
    padding: '12px 0',
  },
  '& .MuiAlert-action': {
    svg: {
      height: '1.4rem',
      width: '1.4rem',
    },
  },
});

const IconWrapper = styled('div')(({ theme }) => ({
  '& svg': {
    width: 44,
    marginLeft: 4,
    '& path': {
      fill: theme.palette.secondary.contrastText,
    },
    '@media (min-width: 768px)': {
      width: 64,
      marginLeft: 12,
    },
  },
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiTouchRipple-root': {
    color: theme.palette.primary.main,
  },
  '& .MuiSwitch-thumb': {
    color: theme.palette.primary.main,
  },
  '& .MuiSwitch-track': {
    backgroundColor: theme.palette.primary.main,
    opacity: 0.5,
  },
}));

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <StyledAlert elevation={4} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'Alert';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

type Props = {
  onFetchUser: (user: User) => void;
  changeTheme: (isLightTheme: boolean) => void;
};

const HomePage = ({ onFetchUser, changeTheme }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(true);

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

  const onChangeTheme = (event: any) => {
    const isLightTheme = event.target.checked;

    setIsLightTheme(isLightTheme);
    changeTheme(isLightTheme);
  };

  return (
    <Root>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <GithubCorner />
      </Box>
      <Stack component="main" spacing={5} alignItems="center" justifyContent="center">
        <Typography variant="h1">Github</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h2">Finder</Typography>
          <IconWrapper>
            <GithubIcon />
          </IconWrapper>
        </Stack>
        <Finder onFetchUser={fetchUser} isLoading={isLoading} />
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body1" sx={{ fontWeight: isLightTheme ? 300 : 700 }}>
            Dark theme
          </Typography>
          <StyledSwitch {...label} defaultChecked onChange={onChangeTheme} />
          <Typography variant="body1" sx={{ fontWeight: isLightTheme ? 700 : 300 }}>
            Light theme
          </Typography>
        </Stack>
      </Stack>
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
    </Root>
  );
};

export default HomePage;
