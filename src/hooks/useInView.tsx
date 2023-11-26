import { useEffect, useState, useCallback, useRef } from 'react';

export type UseInView = {
  [key: string]: {
    ref: HTMLDivElement;
    offsetTop: number;
    componentHeight: number;
    isInView: boolean;
  };
};

const useInView = () => {
  const initRef = useRef(0);
  const componentRefs = useRef([]);
  const [components, setComponents] = useState<UseInView>({});
  const [counter, setCounter] = useState(0);

  console.log('useInView', components);

  const getElementData2 = useCallback((element: HTMLDivElement) => {
    //console.log('Counter', counter);

    const offsetTop = element?.getBoundingClientRect()?.top || 0;
    const componentHeight = element.clientHeight;
    const isInView = Math.abs(offsetTop) < componentHeight;

    console.log('offsetTop', offsetTop);

    return {
      ref: element,
      offsetTop,
      componentHeight,
      isInView,
    };
  }, []);

  const getUpdatedComponents2 = useCallback(() => {
    console.log('New state', components, counter);

    const updatedComponents = componentRefs.current.reduce(
      (accumulate: any, element, index) => {
        accumulate[index] = getElementData2(element);

        return accumulate;
      },
      {}
    );
    console.log('up', updatedComponents);

    return updatedComponents;
  }, [components, counter, getElementData2]);

  useEffect(() => {
    console.log(
      'INIT SCROLL !!!',
      initRef.current,
      componentRefs.current.length
    );
    if (componentRefs.current.length === 0) {
      return;
    }
    //if (initRef.current) {
    //console.log('INIT SCROLL !!! EXIT');
    //return;
    //}

    initRef.current += 1;
    const getElementData = (element: HTMLDivElement) => {
      //console.log('Counter', counter);

      const offsetTop = element?.getBoundingClientRect()?.top || 0;
      const componentHeight = element.clientHeight;
      const isInView = Math.abs(offsetTop) < componentHeight;

      console.log('offsetTop', offsetTop);

      return {
        ref: element,
        offsetTop,
        componentHeight,
        isInView,
      };
    };

    const getUpdatedComponents = () => {
      const updatedComponents = componentRefs.current.reduce(
        (accumulate: any, element, index) => {
          accumulate[index] = getElementData(element);

          return accumulate;
        },
        {}
      );
      console.log('up', updatedComponents);

      return updatedComponents;
    };

    function onScroll() {
      console.log('SCROLL');
      const c = getUpdatedComponents();

      setComponents({ ...c });
    }

    const eventId = window.addEventListener('scroll', onScroll);

    return () => {
      console.log('DESTROY EVENTID', eventId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const subscribeComponents = useCallback(
    (
      //ref: HTMLDivElement | null,
      refs: any
      //componentName: string | number
    ) => {
      console.log('SUBSCRIBE !!!', refs);

      if (!refs) {
        return;
      }

      componentRefs.current = refs.current;
    },
    []
  );

  return { components, subscribeComponents };
};

export { useInView };
