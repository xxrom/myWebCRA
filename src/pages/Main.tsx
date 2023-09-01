import { styled } from '@linaria/react';
import {
  Intro,
  Stack,
  Projects,
  Experience,
  EducationAndHobby,
  Spline,
} from '../containers';
import { ScrollProvider } from '../context';

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

// TODO: scaling mobile
// TODO: add Projects
export const Main = () => {
  return (
    <ScrollProvider>
      <Column>
        <div>Hello</div>
        <Spline />
        <div>Hello</div>
      </Column>
    </ScrollProvider>
  );
};
/*

        <Intro />

        <Stack />

        <Experience />

        <Projects />

        <EducationAndHobby />

*/
