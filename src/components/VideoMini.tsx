import { FC } from 'react';
import { styled } from '@linaria/react';
import { css, cx } from '@linaria/core';
import { mobile, theme } from '../theme';

export type SizeType = 'small' | 'normal' | 'full' | 'null';

export type VideoMiniProps = {
  src: string;
  size?: SizeType;
  marginTopBottom?: boolean;
  className?: string;
};

const sizesCss: { [K in SizeType]: string } = {
  small: css`
    max-width: 60px;
    max-height: 60px;

    @media screen and (max-width: 575px) {
      max-width: 50px;
    }
  `,
  normal: css`
    max-width: 50vw;
    max-height: 50vw;
  `,

  full: css`
    max-width: 720px;
    max-height: 720px;
  `,
  null: css`
    display: flex;
    flex: 1;
    margin: 0;
    height: 100%;
    max-height: 100%;
    min-width: 100%;
  `,
};

const getSizeCss = (size: SizeType) => sizesCss[size] || sizesCss.normal;

const marginTopBottomCss = css`
  margin-top: 0rem;
  margin-bottom: 0rem;

  ${mobile(` 
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    `)};
`;

export const VideoMini: FC<VideoMiniProps> = ({
  src,
  size = 'normal',
  marginTopBottom = true,
  className = '',
}) => {
  return (
    <Video
      autoPlay
      muted
      playsInline
      loop
      className={cx(
        getSizeCss(size),
        marginTopBottom && marginTopBottomCss,
        className
      )}
    >
      <source src={src} type="video/mp4" />
    </Video>
  );
};

const Video = styled.video`
  position: relative;
  object-fit: cover;
  border-radius: ${theme.sizes.borderRadius};
`;
