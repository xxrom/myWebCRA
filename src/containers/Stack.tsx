import styled from 'styled-components';
import {Container, Text} from '../components';
import {theme} from '../theme';

export type StackProps = {};

export const Stack = ({}: StackProps) => {
  return (
    <Container>
      <Skills>
        <Text variant="h3">JS/ TS</Text>
        <Text variant="h3">Apollo/ GraphQL/ WS/ API</Text>
        <Text variant="h3">Python/ Node</Text>
        <Text variant="h3">k8s/ k3s/ AWS/ Heroku</Text>
      </Skills>
    </Container>
  );
};

const Skills = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid ${theme.colors.bg50};

  & > * {
    margin-bottom: 1rem;
  }
`;
