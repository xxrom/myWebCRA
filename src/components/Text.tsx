import styled, {css, FlattenSimpleInterpolation} from 'styled-components';
import {theme} from '../theme';
import cx from 'classnames';

export type Variant = 'h1' | 'h3' | 'h5';

type TextProps = {
  variant: Variant;
  children?: React.ReactNode;
  className?: FlattenSimpleInterpolation;
};

export const fontCommon = css`
  color: ${theme.colors.font};
  font-weight: 300;
  font-family: 'Oswald', Roboto, 'Raleway', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
`;

/*
 * font-size in rem - for mobile firefox view
 */
const H1 = styled.span`
  ${fontCommon};
  font-size: 2rem;
  font-size: calc(24px + (72 - 24) * (100vw -400px) / (1600 -400));
  ${props => props.className};
`;

const H3 = styled.span`
  ${fontCommon};
  font-size: 1.5rem;
  font-size: calc(12px + (48 - 12) * (100vw -400px) / (1600 -400));
  ${props => props.className};
`;

const H5 = styled.span`
  ${fontCommon};
  font-size: 1rem;
  font-size: calc(12px + (24 - 12) * (100vw -400px) / (1600 -400));
  ${props => props.className};
`;

export const Text = ({variant, children, className}: TextProps) => {
  switch (variant) {
    case 'h1':
      return <H1 className={cx(className)}>{children}</H1>;
    case 'h3':
      return <H3 className={cx(className)}>{children}</H3>;
    case 'h5':
      return <H5 className={cx(className)}>{children}</H5>;

    default:
      return <span className={cx(className)}>{children}</span>;
  }
};
