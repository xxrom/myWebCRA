import styled, {css} from 'styled-components';
import {theme} from '../theme';

export type Variant = 'h1' | 'h3' | 'h5';

type TextProps = {
  variant: Variant;
  children: React.ReactNode;
};

export const fontCommon = css`
  color: ${theme.colors.font};
  font-weight: 300;
  font-family: 'Oswald', Roboto, 'Raleway', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
`;

const H1 = styled.span`
  ${fontCommon}
  font-size: calc(24px + (72 - 24) * (100vw -400px) / (1600 -400));
`;

const H3 = styled.span`
  ${fontCommon}
  font-size: calc(12px + (48 - 12) * (100vw -400px) / (1600 -400));
`;

const H5 = styled.span`
  ${fontCommon}
  font-size: calc(12px + (24 - 12) * (100vw -400px) / (1600 -400));
`;

export const Text = ({variant, children}: TextProps) => {
  switch (variant) {
    case 'h1':
      return <H1>{children}</H1>;
    case 'h3':
      return <H3>{children}</H3>;
    case 'h5':
      return <H5>{children}</H5>;

    default:
      return <span>{children}</span>;
  }
};
