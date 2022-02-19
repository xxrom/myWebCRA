import styled from 'styled-components';
import {theme} from '../theme';

type ImageProps = {
  isDisabled?: boolean;
};

export const Image = styled.img<ImageProps>`
  position: relative;
  top: 0;
  left: 0;

  min-height: 100%;
  width: 100%;

  object-fit: cover;

  transition: all 0.3s ease;
  cursor: ${props => (props?.isDisabled ? 'default' : 'pointer')};
  border-radius: ${theme.sizes.borderRadius};

  &:hover {
    transform: scale(${props => (props?.isDisabled ? 1.0 : 1.05)});
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
  max-width: 50vw;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;

  @media screen and (max-width: 575px) {
    min-height: 150px;
    max-height: 250px;
    min-width: 150px;
    max-width: 90vw;
  }

  ${props => props.className};
`;
