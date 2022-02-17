import styled from 'styled-components';
import {
  Experience,
  Intro,
  Projects,
  Stack,
  EducationAndHobby,
} from '../containers';

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Main = () => {
  return (
    <Column>
      <Intro />

      <Stack />

      <Experience />

      <Projects />

      <EducationAndHobby />
    </Column>
  );
};
