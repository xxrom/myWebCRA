import {useCallback, useState} from 'react';
import {ScrollContext} from '.';

export type ScrollProps = {
  scrollY: number;
  components: {
    [key: string]: {
      degree: number;
    };
  };
};

export const scrollInit: ScrollProps = {
  scrollY: 0,

  components: {},
};

export const ScrollProvider = ({children}: {children: React.ReactNode}) => {
  const [values, setValues] = useState<ScrollProps>(scrollInit);

  const updatePosition = useCallback(
    (scrollY: ScrollProps['scrollY']) => {
      setValues({
        ...values,
        scrollY,
      });
    },
    [values],
  );

  const onScroll = useCallback(
    e => {
      //console.log('scroll', e, window.scrollY, window.scrollX);
      //updatePosition(window.scrollY);
    },
    [updatePosition],
  );

  document.addEventListener('scroll', onScroll);

  return (
    <ScrollContext.Provider value={values}>{children}</ScrollContext.Provider>
  );
};
