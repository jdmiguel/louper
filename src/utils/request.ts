import { ERROR_MESSAGE } from './literals';

export const API_BASE_URL = 'https://api.github.com';

const getErrorMessage = (errorStatus: number): string => {
  if (errorStatus === 403) {
    return ERROR_MESSAGE.max;
  }

  if (errorStatus === 404) {
    return ERROR_MESSAGE.noUser;
  }

  return ERROR_MESSAGE.generic;
};

export const formatRequest = (response: Response) => {
  if (!response.ok) {
    const errorMessage = getErrorMessage(response.status);
    throw Error(errorMessage);
  }
  return response.json();
};
