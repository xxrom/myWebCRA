import styled, {css, FlattenSimpleInterpolation} from 'styled-components';
import {theme} from '../theme';
import cx from 'classnames';

export type Variant = 'h1' | 'h3' | 'h4' | 'h5' | 'link-h3' | 'link-h5';

type TextProps = {
  // Style Variants for text view
  variant: Variant;
  children?: React.ReactNode;
  className?: FlattenSimpleInterpolation | string;
  // Is column block view ?
  isColumn?: boolean;
  // href for links
  href?: string;
};

export const fontCommon = css`
  color: ${theme.colors.font};
  text-align: center;
  font-weight: 300;
  font-family: 'Oswald', Roboto, 'Raleway', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
`;

/*
 * font-size in rem - for mobile firefox view
 * 24 min, 64(72) max
 */
const H1 = styled.span`
  ${fontCommon};
  font-size: 2rem;
  font-size: calc(24px + (64 - 24) * (100vw -400px) / (1600 -400));
  ${props => props.className};
`;

// 16 min, 40(48) max
const h3FontSize = css`
  font-size: 1.5rem;
  font-size: calc(16px + (40 - 12) * (100vw -400px) / (1600 -400));
`;
const H3 = styled.span`
  ${fontCommon};
  ${h3FontSize};
  ${props => props.className};
`;

// 14 min, 30 max
const h4FontSize = css`
  font-size: 1.25rem;
  font-size: calc(14px + (30 - 12) * (100vw -400px) / (1600 -400));
`;
const H4 = styled.span`
  ${fontCommon};
  ${h4FontSize};
  ${props => props.className};
`;

// 12 min, 24 max
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

export const Text = ({
  variant,
  children,
  className,
  isColumn = false,
  ...other
}: TextProps) => {
  const commonClassName = cx(className, isColumn && isColumnCss);

  switch (variant) {
    case 'h1':
      return <H1 className={commonClassName}>{children}</H1>;
    case 'h3':
      return <H3 className={commonClassName}>{children}</H3>;
    case 'h4':
      return <H4 className={commonClassName}>{children}</H4>;
    case 'h5':
      return <H5 className={commonClassName}>{children}</H5>;

    case 'link-h3':
      return (
        <LinkH3 href={other?.href} className={commonClassName}>
          {children}
        </LinkH3>
      );
    case 'link-h5':
      return (
        <LinkH5 href={other?.href} className={commonClassName}>
          {children}
        </LinkH5>
      );

    default:
      return <span className={commonClassName}>{children}</span>;
  }
};

export const blockMarginCss = css`
  margin-bottom: ${theme.margin.block};
`;

const isColumnCss = css`
  display: flex;
  flex-direction: column;
  text-align: left;
`;
