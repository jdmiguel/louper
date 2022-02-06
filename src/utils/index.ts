export const debounce = (fn: any, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: any) => {
    console.log({ timer });
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
