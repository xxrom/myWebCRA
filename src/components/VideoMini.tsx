import { FC } from "react";
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import cx from "classnames";
import { theme } from "../theme";

export type SizeType = "small" | "normal" | "full";

export interface VideoMiniProps {
  src: string;
  size?: SizeType;
  marginTopBottom?: boolean;
}

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
};

const getSizeCss = (size: SizeType) => sizesCss[size] || sizesCss.normal;

const marginTopBottomCss = css`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  @media screen and (max-width: 575px) {
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
  }
`;

export const VideoMini: FC<VideoMiniProps> = ({
  src,
  size = "normal",
  marginTopBottom = true,
}) => {
  return (
    <Video
      autoPlay
      muted
      playsInline
      loop
      className={cx(getSizeCss(size), marginTopBottom && marginTopBottomCss)}
    >
      <source src={src} type="video/mp4" />
    </Video>
  );
};

const Video = styled.video`
  ${(props) => props.className || ""};

  width: 100%;
  object-fit: cover;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border-radius: ${theme.sizes.borderRadius};

  @media screen and (max-width: 575px) {
    margin-left: 0.1rem;
    margin-right: 0.1rem;
  }
`;
