import styled, {css} from 'styled-components';
import {theme} from '../theme';

type TextProps = {
  variant: 'h1' | string;
  children: React.ReactNode;
};

const common = css`
  color: ${theme.colors.font};
  font-family: 'Oswald', Roboto, 'Raleway', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
`;

const H1 = styled.span`
  ${common}
  font-size: calc(24px + (72 - 24) * (100vw -400px) / (1600 -400));
`;

export const Text = ({variant, children}: TextProps) => {
  switch (variant) {
    case 'h1':
      return <H1>{children}</H1>;

    default:
      return <span>{children}</span>;
  }
};
