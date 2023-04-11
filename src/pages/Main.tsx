import { styled } from '@linaria/react';
import {
  Intro,
  Stack,
  Projects,
  Experience,
  EducationAndHobby,
} from '../containers';
import { ScrollProvider } from '../context';
import { Spline } from '../containers/Spline';

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

        <Intro />

        <Stack />

        <Experience />

        <Projects />

        <EducationAndHobby />
      </Column>
    </ScrollProvider>
  );
};
