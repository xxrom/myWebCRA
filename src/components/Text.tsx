import { css, cx } from '@linaria/core';
import { styled } from '@linaria/react';
import { theme } from '../theme';

type FlattenSimpleInterpolation = string;

export type Variant = 'h1' | 'h3' | 'h4' | 'h5' | 'link-h3' | 'link-h5';

type TextProps = {
  // Style Variants for text view
  variant: Variant;
  children?: React.ReactNode;
  className?: FlattenSimpleInterpolation | string;
  // Is column block view ?
  isColumn?: boolean;
  onClick?: ({ ...props }: any) => any;
  style?: { [key: string]: any };
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

const isColumnCss = css`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

/*
 * font-size in rem - for mobile firefox view
 * 24 min, 64(72) max
 */
const h1FontSize = css`
  font-size: 2rem;
  font-size: calc(24px + (64 - 24) * (100vw -400px) / (1600 -400));
`;

// 16 min, 40(48) max
const h3FontSize = css`
  font-size: 1.5rem;
  font-size: calc(16px + (40 - 12) * (100vw -400px) / (1600 -400));
`;

// 14 min, 30 max
const h4FontSize = css`
  font-size: 1.25rem;
  font-size: calc(14px + (30 - 12) * (100vw -400px) / (1600 -400));
`;

// 12 min, 24 max
const h5FontSize = css`
  font-size: 1rem;
  font-size: calc(12px + (24 - 12) * (100vw -400px) / (1600 -400));
`;

const linkCommon = css`
  text-decoration: underline;
  text-decoration-thickness: 1px;

  &:hover {
    color: ${theme.colors.fontHover};
  }
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
      return (
        <span
          className={cx(commonClassName, fontCommon, h1FontSize)}
          {...other}
        >
          {children}
        </span>
      );
    case 'h3':
      return (
        <span
          className={cx(commonClassName, fontCommon, h3FontSize)}
          {...other}
        >
          {children}
        </span>
      );
    case 'h4':
      return (
        <span
          className={cx(commonClassName, fontCommon, h4FontSize)}
          {...other}
        >
          {children}
        </span>
      );
    case 'h5':
      return (
        <span
          className={cx(commonClassName, fontCommon, h5FontSize)}
          {...other}
        >
          {children}
        </span>
      );

    case 'link-h3':
      return (
        <a
          href={other?.href}
          className={cx(commonClassName, fontCommon, h3FontSize, linkCommon)}
          {...other}
        >
          {children}
        </a>
      );
    case 'link-h5':
      return (
        <a
          href={other?.href}
          className={cx(commonClassName, fontCommon, h5FontSize, linkCommon)}
          {...other}
        >
          {children}
        </a>
      );

    default:
      return (
        <span className={commonClassName} {...other}>
          {children}
        </span>
      );
  }
};

export const blockMarginCss = css`
  margin-bottom: 1rem;
`;
