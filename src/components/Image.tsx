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

export const ImageBox = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  min-height: 300px;
  max-height: 300px;
  min-width: 350px;
  max-width: 60vw;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;

  @media screen and (max-width: 575px) {
    min-height: 250px;
    max-height: 250px;
    min-width: 250px;
    max-width: 90vw;
  }

  ${props => props.className};
`;
