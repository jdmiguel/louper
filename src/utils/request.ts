import { getErrorMessage } from './index';

export const formatRequest = (response: Response) => {
  if (!response.ok) {
    const errorMessage = getErrorMessage(response.status);
    throw Error(errorMessage);
  }
  return response.json();
};
