import Corner from './Corner';
import Search from './Search';
import Globe from './Globe';
import Footer from '@/components/shared/Footer';
import { StyledRoot, StyledCornerWrapper, StyledMain } from './styles';

const HomePage = () => (
  <StyledRoot>
    <StyledCornerWrapper>
      <Corner />
    </StyledCornerWrapper>
    <StyledMain>
      <Search />
      <Globe />
    </StyledMain>
    <Footer />
  </StyledRoot>
);

export default HomePage;
