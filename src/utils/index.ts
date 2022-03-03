enum ErrorMessage {
  MAX = 'You have excedeed the maximum allowed request. Please, wait for a while',
  NO_USER = 'Please, choose an available user',
  GENERIC = 'Sorry! there was an error on the server side.',
}

export const getErrorMessage = (errorStatus: number): string => {
  if (errorStatus === 403) {
    return ErrorMessage.MAX;
  }

  if (errorStatus === 404) {
    return ErrorMessage.NO_USER;
  }

  return ErrorMessage.GENERIC;
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
