import { styled } from '@linaria/react';
import {
  //Experience,
  Intro,
  //Projects,
  //Stack,
  //EducationAndHobby,
} from '../containers';
import { ScrollProvider } from '../context';

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Main = () => {
  return (
    <ScrollProvider>
      <Column>
        <Intro />

        {/*
        <Stack />

        <Experience />

        <Projects />

        <EducationAndHobby />
        */}
      </Column>
    </ScrollProvider>
  );
};
