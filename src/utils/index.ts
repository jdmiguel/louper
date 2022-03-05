enum ErrorMessage {
  Max = 'You have excedeed the maximum allowed request. Please, wait for a while',
  NoUser = 'Please, choose an available user',
  Generic = 'Sorry! there was an error on the server side.',
}

export const getErrorMessage = (errorStatus: number): string => {
  if (errorStatus === 403) {
    return ErrorMessage.Max;
  }

  if (errorStatus === 404) {
    return ErrorMessage.NoUser;
  }

  return ErrorMessage.Generic;
};

export const debounce = (fn: any, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: unknown[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
