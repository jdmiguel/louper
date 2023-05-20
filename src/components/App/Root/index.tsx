import { useView } from '@/contexts/ViewContext';
import { useErrorMessage } from '@/contexts/ErrorMessageContext';
import Home from '../../Home';
import User from '../../User';
import Toast from '../../shared/Toast';
import { StyledRoot } from './styles';

const Root = () => {
  const { view } = useView();
  const { errorMessage, shouldDisplayErrorMessage, hideErrorMessage } = useErrorMessage();
  return (
    <StyledRoot>
      {view === 'home' ? <Home /> : <User />}
      <Toast isOpen={shouldDisplayErrorMessage} msg={errorMessage} onClose={hideErrorMessage} />
    </StyledRoot>
  );
};

export default Root;
