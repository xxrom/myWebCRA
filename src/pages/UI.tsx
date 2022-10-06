import { styled } from '@linaria/react';
import { Text } from '../components';

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UI = () => (
  <Column>
    <Text variant="h1">H1</Text>
    <Text variant="h3">H3</Text>
    <Text variant="h5">H5</Text>
  </Column>
);
