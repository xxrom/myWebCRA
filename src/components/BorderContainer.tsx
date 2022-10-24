import { styled } from '@linaria/react';
import { theme } from '../theme';

export type BorderContainerProps = {
  margin?: string;
};

export const BorderContainer = styled.div<BorderContainerProps>`
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${theme.colors.font};

  padding: 0 1rem;
  margin: ${(props) => props.margin || 0};

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
