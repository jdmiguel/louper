import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  });

  const buildWindowSize = () => {
    setWindowSize({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    buildWindowSize();

    window.addEventListener('resize', buildWindowSize);

    return () => {
      window.removeEventListener('resize', buildWindowSize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
