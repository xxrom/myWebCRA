import { styled } from '@linaria/react';
import { css, cx } from '@linaria/core';

type ImageProps = {
  isDisabled?: boolean;
  pulse?: boolean;
};

const pulseColor = 150;

export const pulseCss = css`
  box-shadow: 0 0 0 0 rgba(${pulseColor}, ${pulseColor}, ${pulseColor}, 1);
  transform: scale(1);
  animation: pulse 4s infinite;

  @keyframes pulse {
    0% {
      box-shadow: 4px 2px 1px 1px
        rgba(${pulseColor}, ${pulseColor}, ${pulseColor}, 0.6);
    }

    50% {
      box-shadow: 10px 10px 3px 4px
        rgba(${pulseColor}, ${pulseColor}, ${pulseColor}, 0.4);
    }

    100% {
      box-shadow: 4px 2px 1px 1px
        rgba(${pulseColor}, ${pulseColor}, ${pulseColor}, 0.6);
    }
  }
`;
/*
    20% {
      box-shadow: 4px 8px 1px 4px rgba(${pulseColor}, ${pulseColor}, ${pulseColor}, 0.1);
    }


    100% {
      box-shadow: 0 0 0 0 rgba(${pulseColor}, ${pulseColor}, ${pulseColor}, 0);
    }
*/

export type Image2Props = {
  src: string;
  fallback: string;
  isDisabled?: boolean;
  type?: string;
  alt?: string;
};
export const Image2 = ({
  type = 'image/webp',
  alt = 'img',
  isDisabled = false,
  src,
  fallback,
  ...rest
}: Image2Props) => (
  <picture className={cx(imageCss, isDisabled && 'disabled')}>
    <source className={imageCss} srcSet={src} type={type} />
    <img className={imageCss} src={fallback} alt={alt} {...rest} />
  </picture>
);

const imageCss = css`
  position: relative;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  object-fit: cover;

  transition: all 0.3s ease;
  border-radius: 4px;

  &:hover {
    transform: scale(1.05);
  }
  cursor: pointer;

  .disabled {
    cursor: default;
    &:hover {
      transform: scale(1);
    }
  }
`;

export const Image = styled.img<ImageProps>`
  position: relative;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
  border-radius: 4px;
  cursor: ${(props) => (props?.isDisabled ? 'default' : 'pointer')};

  &:hover {
    transform: scale(${(props) => (props?.isDisabled ? 1.0 : 1.05)});
  }

  &.pulse {
    ${pulseCss};
  }
`;

export const ImageBox = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  min-height: 300px;
  max-height: 350px;
  min-width: 360px;
  max-width: 30vw;
  margin-bottom: 0rem;
  transition: all 0.3s ease;

  @media screen and (max-width: 575px) {
    min-height: 150px;
    max-height: 250px;
    min-width: 150px;
    max-width: 90vw;
  }
`;
