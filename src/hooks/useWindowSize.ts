import { useEffect, useState } from 'react';

interface IWindowSize {
  width: number;
  height: number;
}

export default function useWindowSize ():IWindowSize  {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if(typeof window === undefined) return

    const handler = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set size at the first client-side load
    handler();

    window.addEventListener('resize', handler);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return windowSize;
}

