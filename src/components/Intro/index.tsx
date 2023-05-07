import { useState } from 'react';
import Corner from './Corner';
import Search from './Search';
import Globe from './Globe';
import Footer from '@/components/shared/Footer';
import Toast from '@/components/shared/Toast';
import { UserData } from '@/utils/types';
import { StyledRoot, StyledCornerWrapper, StyledMain } from './styles';

type Props = {
  onFetchUser: (userData: UserData) => void;
};

const HomePage = ({ onFetchUser }: Props) => {
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <StyledRoot>
      <StyledCornerWrapper data-testid="header-intro">
        <Corner />
      </StyledCornerWrapper>
      <StyledMain>
        <Search
          onFetchUser={onFetchUser}
          onRequestError={(errorMsg: string) => {
            setErrorMessage(errorMsg);
            setIsErrorToastOpen(true);
          }}
        />
        <Globe />
      </StyledMain>
      <Footer />
      <Toast
        isOpen={isErrorToastOpen}
        msg={errorMessage}
        onClose={() => setIsErrorToastOpen(false)}
      />
    </StyledRoot>
  );
};

export default HomePage;
