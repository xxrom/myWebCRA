import styled, {css, FlattenSimpleInterpolation} from 'styled-components';
import {theme} from '../theme';
import cx from 'classnames';

export type Variant = 'h1' | 'h3' | 'h5' | 'link-h3' | 'link-h5';

type TextProps = {
  variant: Variant;
  children?: React.ReactNode;
  className?: FlattenSimpleInterpolation;
  href?: string;
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

const h3FontSize = css`
  font-size: 1.5rem;
  font-size: calc(12px + (48 - 12) * (100vw -400px) / (1600 -400));
`;
const H3 = styled.span`
  ${fontCommon};
  ${h3FontSize};
  ${props => props.className};
`;

const h5FontSize = css`
  font-size: 1rem;
  font-size: calc(12px + (24 - 12) * (100vw -400px) / (1600 -400));
`;
const H5 = styled.span`
  ${fontCommon};
  ${h5FontSize};
  ${props => props.className};
`;

const linkCommon = css`
  text-decoration: underline;
  text-decoration-thickness: 1px;

  &:hover {
    color: ${theme.colors.fontHover};
  }
`;
const LinkH3 = styled.a`
  ${fontCommon};
  ${h3FontSize};
  ${linkCommon};
  ${props => props.className};
`;
const LinkH5 = styled.a`
  ${fontCommon};
  ${h5FontSize};
  ${linkCommon};
  ${props => props.className};
`;

export const Text = ({variant, children, className, ...other}: TextProps) => {
  switch (variant) {
    case 'h1':
      return <H1 className={cx(className)}>{children}</H1>;
    case 'h3':
      return <H3 className={cx(className)}>{children}</H3>;
    case 'h5':
      return <H5 className={cx(className)}>{children}</H5>;

    case 'link-h3':
      return (
        <LinkH3 href={other.href} className={cx(className)}>
          {children}
        </LinkH3>
      );
    case 'link-h5':
      return (
        <LinkH5 href={other.href} className={cx(className)}>
          {children}
        </LinkH5>
      );

    default:
      return <span className={cx(className)}>{children}</span>;
  }
};
