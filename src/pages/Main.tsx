import { styled } from '@linaria/react';
import {
  //Intro,
  Stack,
  Projects,
  Experience,
  EducationAndHobby,
  Spline,
} from '../containers';
import { memo, useLayoutEffect, useRef, useCallback } from 'react';
import { useInView } from '../hooks/useInView';

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Components = [Spline, Stack, Experience, Projects, EducationAndHobby];

export const Main = memo(() => {
  const { components, subscribeComponent } = useInView();
  console.log('Main', components);
  const componentRefs = useRef<any>(Array(Components.length));

  const addRefElement = useCallback((element: HTMLElement, index: number) => {
    componentRefs.current[index] = element;
  }, []);

  useLayoutEffect(() => {
    console.log('MAIN', componentRefs);
    componentRefs?.current?.map(subscribeComponent);
  }, [subscribeComponent]);

  return (
    <Column>
      {Components.map((Component, index) => (
        <div
          key={index}
          data-index={index}
          ref={(element) => element && addRefElement(element, index)}
        >
          <Component />
        </div>
      ))}
    </Column>
  );
});

/*
  <Intro />

  <Stack />

  <Experience />

  <Projects />

  <EducationAndHobby />
*/
