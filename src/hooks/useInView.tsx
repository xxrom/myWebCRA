import { useEffect, useState, useCallback } from 'react';

export type UseInView = {
  [key: string]: {
    ref: HTMLDivElement;
    offsetTop: number;
    componentHeight: number;
    isInView: boolean;
  };
};

function useInView() {
  const [components, setComponents] = useState<UseInView>({});

  console.log('useInView', components);

  const getElementData = useCallback((ref: HTMLDivElement) => {
    const offsetTop = ref?.getBoundingClientRect()?.top || 0;
    const componentHeight = ref.clientHeight;
    const isInView = Math.abs(offsetTop) < componentHeight;

    return {
      ref,
      offsetTop,
      componentHeight,
      isInView,
    };
  }, []);

  const onScroll = useCallback(() => {
    console.log('SCROLL');
    setComponents((state) => {
      const s = { ...state };
      console.log('New state', s);

      Object.keys(s).forEach((key) => {
        s[key] = getElementData(s[key].ref);
      });

      return s;
    });
  }, [getElementData]);

  useEffect(() => {
    document.addEventListener('scroll', onScroll, true);
    return () => document.removeEventListener('scroll', onScroll, true);
  }, [onScroll]);

  const subscribeComponent = useCallback(
    (ref: HTMLDivElement | null, componentName: string | number) => {
      console.log('SUBSCRIBE !!!', componentName);

      if (!ref) {
        return;
      }

      setComponents((state) => {
        const s = { ...state };

        s[componentName] = getElementData(ref);
        return s;
      });
    },
    [getElementData]
  );

  return { components, subscribeComponent };
}

export { useInView };
