import { styled } from '@linaria/react';
import {
  Intro,
  Stack,
  Projects,
  Experience,
  EducationAndHobby,
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
        <Intro />

        <Stack />

        <Projects />

        <Experience />

        <EducationAndHobby />
      </Column>
    </ScrollProvider>
  );
};
