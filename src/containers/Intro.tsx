import {Container, Text} from '../components';
import styled, {css} from 'styled-components';
import {theme} from '../theme';

export type IntroProps = {};

export const Intro = ({}: IntroProps) => {
  return (
    <Container className={wrapperCss}>
      <Text variant="h1" className={marginCss}>
        Chernyshov Nikita
      </Text>

      <Text variant="h3" className={marginCss}>
        Software developer
      </Text>
    </Container>
  );
};

const marginCss = css`
  margin-bottom: 2rem;
`;
const wrapperCss = css`
  flex-direction: column;
  border: 1px solid ${theme.colors.bg};
`;
