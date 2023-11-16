import { css } from '@linaria/core';

export const theme = {
  colors: {
    primary: '#111',
    primaryInverted: '#eee',
    secondary: '#2b2b2b',
    success: '#4caf50',
    danger: '#f44336 ',
    ghost: '#eee',

    bg: '#fff',
    bgInverted: '#111',
    bg50: 'rgba(215,215,215,0.60)',

    font: '#111',
    fontInverted: '#eee',
    fontHover: '#666',
  },

  media: {
    desktop: (css: string) => `@media screen and (min-width: 768px) { ${css} }`,
    tablet: (css: string) => `@media screen and (max-width: 768px) { ${css} }`,
    mobile: (css: string) => `@media Screen and (max-width: 575px) { ${css} }`,
  },

  // in px
  sizes: {
    nav: { height: 54 },
    header: { height: 56 },
    container: { width: 1200 },
    footer: { height: 128 },
    modal: { width: 540 },
    borderRadius: '4px',
    paddingSmall: '8px',
    paddingNormal: '10px 16px',
  },

  margin: {
    block: '4rem',
    content: '2rem 1rem',
  },

  // in ms
  durations: {
    ms300: 300,
  },

  // z-index
  order: {
    header: 50,
    modal: 100,
  },
};

export const desktop = theme?.media.desktop;
export const tablet = theme?.media.tablet;
export const mobile = theme?.media.mobile;

export const blockMarginCss = css`
  margin-bottom: 3rem;

  ${mobile(`
    margin-bottom: 2rem;
  `)}
`;
