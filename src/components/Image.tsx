import styled from 'styled-components';
import {theme} from '../theme';

export const Image = styled.img`
  position: relative;
  top: 0;
  left: 0;

  min-height: 100%;
  width: 100%;

  object-fit: cover;

  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: ${theme.sizes.borderRadius};

  &:hover {
    transform: scale(1.05);
  }
`;
