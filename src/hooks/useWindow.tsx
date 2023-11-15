import { useState, useEffect, useLayoutEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
  canvasScale: number;
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
    canvasScale: 1,
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        canvasScale: window.devicePixelRatio,
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  console.log('windowSize', windowSize);

  return windowSize;
};
