import { css } from '@linaria/core';

export const commonMdCss = css`
  p {
    margin: 0.5rem 0;
  }

  b,
  strong {
    font-weight: 400;
  }

  ul {
    list-style-type: none;
    margin: 0.5rem 0;
    padding-left: 1rem;

    & li {
      margin: 0.5rem 0;
    }
  }
`;
