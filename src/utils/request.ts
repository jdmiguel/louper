export const API_BASE_URL = 'https://api.github.com';

export const ErrorMessage = {
  Max: 'You have excedeed the maximum allowed request. Please, wait for a while',
  NoUser: 'Please, choose an available user',
  MinChars: 'Please, type three chars at least',
  Generic: 'Sorry! there was an error on the server side.',
};

const getErrorMessage = (errorStatus: number): string => {
  if (errorStatus === 403) {
    return ErrorMessage.Max;
  }

  if (errorStatus === 404) {
    return ErrorMessage.NoUser;
  }

  return ErrorMessage.Generic;
};

export const formatRequest = (response: Response) => {
  if (!response.ok) {
    const errorMessage = getErrorMessage(response.status);
    throw Error(errorMessage);
  }
  return response.json();
};
