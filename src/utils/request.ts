import { getErrorMessage } from './index';

export const BASE_URL = 'https://api.github.com';

export const handleErrors = (response: Response) => {
  if (!response.ok) {
    const errorMessage = getErrorMessage(response.status);
    throw Error(errorMessage);
  }
  return response.json();
};
