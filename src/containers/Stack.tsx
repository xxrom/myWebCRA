import styled, {css} from 'styled-components';
import {Container, Text} from '../components';
import {blockMarginCss} from '../components/Text';
import {theme} from '../theme';

export type StackProps = {};

/*
import MD from 'react-markdown';
const stackMD = `
- **JavaScript** / TypeScript
- **React** / *GraphQL* / WebSockets 
- *Python* / Node
- *k8s* / **k3s** / AWS / Heroku
`;
        <Text variant="h3" isColumn={true}>
          <MD>{stackMD}</MD>
        </Text>
 */

export const Stack = ({}: StackProps) => {
  return (
    <Container className={containerCss}>
      <Text variant="h1" className={blockMarginCss}>
        Stack:
      </Text>

      <Skills>
        <Text variant="h3">
          <b>JavaScript</b> / TypeScript
        </Text>
        <Text variant="h3">
          <b>React</b> / GraphQL / WebSockets
        </Text>
        <Text variant="h3">Python / Node</Text>
        <Text variant="h3">
          k8s / <b>k3s</b> / AWS / Heroku
        </Text>
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
  border-radius: ${theme.sizes.borderRadius};

  & > * {
    margin-bottom: 1rem;
  }
`;
