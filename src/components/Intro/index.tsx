import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Corner from './Corner';
import Search from './Search';
import InteractiveGlobe from './Globe';
import Footer from 'src/components/shared/Footer';
import Toast from 'src/components/shared/Toast';
import { UserData } from 'src/utils/types';

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  position: 'relative',
  '@media (min-width: 768px)': {
    justifyContent: 'center',
  },
});

const CornerWrapper = styled('header')({
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'absolute',
  top: 0,
  width: '100%',
});

const Main = styled('main')({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 20,
  '@media (min-width: 768px)': {
    marginBottom: 50,
  },
  '@media (min-width: 992px)': {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 0,
  },
  '@media (min-width: 1440px)': {
    justifyContent: 'center',
  },
});

type Props = {
  onFetchUser: (userData: UserData) => void;
};

const HomePage = ({ onFetchUser }: Props) => {
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Root>
      <CornerWrapper data-testid="header-intro">
        <Corner />
      </CornerWrapper>
      <Main data-testid="main-intro">
        <Search
          onFetchUser={onFetchUser}
          onRequestError={(errorMsg: string) => {
            setErrorMessage(errorMsg);
            setIsErrorToastOpen(true);
          }}
        />
        <InteractiveGlobe />
      </Main>
      <Footer />
      <Toast
        isOpen={isErrorToastOpen}
        msg={errorMessage}
        onClose={() => setIsErrorToastOpen(false)}
      />
    </Root>
  );
};

export default HomePage;
