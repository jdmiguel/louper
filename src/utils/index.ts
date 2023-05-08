import { Timer } from './types';

export const debounce = (fn: any, delay: number) => {
  let timer: Timer;

  return (...args: unknown[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
