import { ResponseError } from './types';

enum ErrorMessage {
  MAX = 'You have excedeed the maximum allowed request. Please, wait for a while',
  NO_USER = 'Please, choose an available user',
  GENERIC = 'Sorry! there was an error on the server side.',
}

export const getErrorMessage = (error: ResponseError) => {
  if (error.status === 403) {
    return ErrorMessage.MAX;
  }

  if (error.status === 404) {
    return ErrorMessage.NO_USER;
  }

  return ErrorMessage.GENERIC;
};

export const debounce = (fn: any, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
