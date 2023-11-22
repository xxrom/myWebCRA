import { useCallback, useEffect, useState } from 'react';

export type UseScroll = {
  values: {
    scrollY: number;
  };
};

const initValues = {
  scrollY: 0,
};

export const useScroll = () => {
  const [values, setValues] = useState<UseScroll['values']>(initValues);

  const updatePosition = useCallback((scrollY: number) => {
    setValues((state) => ({
      ...state,
      scrollY,
    }));
  }, []);

  const onScroll = useCallback(
    (_e: Event) => {
      //console.log('scroll', e, window.scrollY, window.scrollX);
      updatePosition(window.scrollY);
    },
    [updatePosition]
  );

  useEffect(() => {
    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return values;
};
