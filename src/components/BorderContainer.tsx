import styled from 'styled-components';
import {theme} from '../theme';

export type BorderContainerProps = {
  margin?: string;
};

export const BorderContainer = styled.div<BorderContainerProps>`
  display: flex;
  flex-direction: column;
  padding: ${theme.margin.content};
  border-left: 1px solid ${theme.colors.bg50};
  border-right: 1px solid ${theme.colors.bg50};
  border-radius: ${theme.sizes.borderRadius};

  margin-bottom: ${props => props.margin || 0};

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
