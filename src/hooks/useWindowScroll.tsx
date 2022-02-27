import { useState, useEffect, useCallback } from 'react';
import { debounce } from '../utils/index';

interface ScrollEvent {
  target: { scrollingElement: HTMLElement };
}

const useWindowScroll = () => {
  const [scrollRatio, setScrollRatio] = useState(0);

  const handleScroll = (event: ScrollEvent) => {
    const scrollElement = event.target.scrollingElement;
    const scrollableHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
    const currentScrollRatio = scrollElement.scrollTop / scrollableHeight;

    setScrollRatio(currentScrollRatio);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleScroll = useCallback(debounce(handleScroll, 100), []);

  useEffect(() => {
    window.addEventListener('scroll', debouncedHandleScroll);

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  return scrollRatio;
};

export default useWindowScroll;
