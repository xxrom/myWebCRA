import { styled } from '@linaria/react';
import {
  //Intro,
  Stack,
  Projects,
  Experience,
  EducationAndHobby,
  Spline,
} from '../containers';
import { ScrollProvider } from '../context';
import { memo } from 'react';

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

// TODO: scaling mobile
// TODO: add Projects
export const Main = memo(() => {
  return (
    <ScrollProvider>
      <Column>
        <Spline />

        <Stack />

        <Experience />

        <Projects />

        <EducationAndHobby />
      </Column>
    </ScrollProvider>
  );
});
/*

        <Intro />

        <Stack />

        <Experience />

        <Projects />

        <EducationAndHobby />

*/
