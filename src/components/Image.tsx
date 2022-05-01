import styled, {css} from 'styled-components';
import {theme} from '../theme';

type ImageProps = {
  isDisabled?: boolean;
};

const pulseColor = 150;

const pulseCss = css`
  box-shadow: 0 0 0 0 rgba(${pulseColor}, ${pulseColor}, ${pulseColor}, 1);
  transform: scale(1);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(${pulseColor}, ${pulseColor}, ${pulseColor}, 0.7);
    }

    70% {
      box-shadow: 0 0 0 20px
        rgba(${pulseColor}, ${pulseColor}, ${pulseColor}, 0);
    }

    100% {
      box-shadow: 0 0 0 0 rgba(${pulseColor}, ${pulseColor}, ${pulseColor}, 0);
    }
  }
`;

export const Image = styled.img<ImageProps & {pulse?: boolean}>`
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

  ${props => props.pulse && pulseCss};
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
