export const API_BASE_URL = 'https://api.github.com';

export const ERROR_MESSAGE = {
  max: 'You have excedeed the maximum allowed request. Please, wait for a while',
  noUser: 'Please, choose an available user',
  minChars: 'Please, type three chars at least',
  generic: 'Sorry! there was an error on the server side.',
};

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
