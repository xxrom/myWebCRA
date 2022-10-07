import { styled } from '@linaria/react';
import {
  Intro,
  Stack,
  Experience,
  Projects,
  EducationAndHobby,
} from '../containers';
import { ScrollProvider } from '../context';

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

// TODO: scaling mobile
export const Main = () => {
  return (
    <ScrollProvider>
      <Column>
        <Intro />

        <Stack />

        <Experience />

        <Projects />

        <EducationAndHobby />
      </Column>
    </ScrollProvider>
  );
};
