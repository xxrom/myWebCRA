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
    fontHover: '#666',
  },

  media: {
    set1140: (css: string) =>
      `@media screen and (max-width: 1140px) { ${css} }`,
    set768: (css: string) => `@media screen and (max-width: 768px) { ${css} }`,
    set575: (css: string) => `@media Screen and (max-width: 575px) { ${css} }`,
  },

  // in px
  sizes: {
    nav: {height: 54},
    header: {height: 56},
    container: {width: 1200},
    footer: {height: 128},
    modal: {width: 540},
    borderRadius: '10px',
    paddingSmall: '8px',
  },

  margin: {
    block: '4rem',
    content: '2rem',
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
