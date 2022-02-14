export const theme = {
  colors: {
    primary: '#111',
    secondary: '#2b2b2b',
    success: '#4caf50',
    danger: '#f44336 ',

    bg: '#fff',
    bg50: 'rgba(215,215,215,0.40)',
    font: '#111',
    fontHover: '#555',
  },

  media: {
    extraLarge: '(max-width: 1140px)',
    large: '(max-width: 960px)',
    medium: '(max-width: 720px)',
    small: '(max-width: 540px)',
  },

  // in px
  sizes: {
    nav: {height: 78},
    header: {height: 56},
    container: {width: 1200},
    footer: {height: 128},
    modal: {width: 540},
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
