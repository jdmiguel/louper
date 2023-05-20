import { useState } from 'react';
import Corner from './Corner';
import Search from './Search';
import Globe from './Globe';
import Footer from '@/components/shared/Footer';
import Toast from '@/components/shared/Toast';
import { StyledRoot, StyledCornerWrapper, StyledMain } from './styles';

const HomePage = () => {
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <StyledRoot>
      <StyledCornerWrapper>
        <Corner />
      </StyledCornerWrapper>
      <StyledMain>
        <Search
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
