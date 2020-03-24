const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    // Start timeout again every each time user press any key,
    // so finally it waits until last key press to start fetching data
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
