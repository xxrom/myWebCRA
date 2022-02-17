import styled, {css} from 'styled-components';
import {Container, Text} from '../components';
import {blockMarginCss} from '../components/Text';
import {theme} from '../theme';

export type StackProps = {};

export const Stack = ({}: StackProps) => {
  return (
    <Container className={containerCss}>
      <Text variant="h3" className={blockMarginCss}>
        Stack:
      </Text>

      <Skills>
        <Text variant="h3">JavaScript/ TypeScript</Text>
        <Text variant="h3">React/ GraphQL/ WebSockets</Text>
        <Text variant="h3">Python/ Node</Text>
        <Text variant="h3">k8s/ k3s/ AWS/ Heroku</Text>
      </Skills>
    </Container>
  );
};

const containerCss = css`
  flex-direction: column;
`;

const Skills = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${theme.margin.content};
  border: 1px solid ${theme.colors.bg50};

  & > * {
    margin-bottom: 1rem;
  }
`;
