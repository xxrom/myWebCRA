import { styled } from '@linaria/react';
import {
  Stack,
  Projects,
  Experience,
  EducationAndHobby,
  Spline,
} from '../containers';
import { memo } from 'react';

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const ComponentsList = [Spline, Stack, Experience, Projects, EducationAndHobby];

export const Main = memo(() => {
  return (
    <Column>
      {ComponentsList.map((Component, index) => (
        <Component key={index} index={index} />
      ))}
    </Column>
  );
});
