import { FallbackProps } from 'react-error-boundary';
import { ERROR_MESSAGE_HEADING } from '@/utils/literals';
import { StyledFallbackAppRoot, StyledErrorMessage } from './styles';

const FallbackApp = ({ error }: FallbackProps) => (
  <StyledFallbackAppRoot>
    <p>{ERROR_MESSAGE_HEADING}</p>
    <StyledErrorMessage>{error.message}</StyledErrorMessage>
  </StyledFallbackAppRoot>
);

export default FallbackApp;
