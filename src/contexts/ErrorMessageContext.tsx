import { ReactNode, createContext, useState, useContext } from 'react';

const ErrorMessageContext = createContext({
  errorMessage: '',
  shouldDisplayErrorMessage: false,
  updateErrorMessage: (_: string) => {},
  displayErrorMessage: () => {},
  hideErrorMessage: () => {},
});

type Props = {
  children: ReactNode;
};

const ErrorMessageContextProvider = ({ children }: Props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [shouldDisplayErrorMessage, setShouldDisplayErrorMessage] = useState(false);

  const updateErrorMessage = (currentErrorMessage: string) => setErrorMessage(currentErrorMessage);
  const displayErrorMessage = () => setShouldDisplayErrorMessage(true);
  const hideErrorMessage = () => setShouldDisplayErrorMessage(false);

  const errorMessageContextValue = {
    errorMessage,
    shouldDisplayErrorMessage,
    updateErrorMessage,
    displayErrorMessage,
    hideErrorMessage,
  };

  return (
    <ErrorMessageContext.Provider value={errorMessageContextValue}>
      {children}
    </ErrorMessageContext.Provider>
  );
};

const useErrorMessage = () => useContext(ErrorMessageContext);

export { ErrorMessageContextProvider, useErrorMessage };

export default ErrorMessageContext;
