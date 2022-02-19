import styled from 'styled-components';
import {
  Experience,
  Intro,
  Projects,
  Stack,
  EducationAndHobby,
} from '../containers';
import {ScrollProvider} from '../Context';

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

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
