import { useView } from '@/contexts/ViewContext';
import Home from '../../Home';
import User from '../../User';
import { StyledRoot } from './styles';

const Root = () => {
  const { view } = useView();
  return <StyledRoot>{view === 'home' ? <Home /> : <User />}</StyledRoot>;
};

export default Root;
