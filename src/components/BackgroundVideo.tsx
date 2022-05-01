import {useEffect, useRef} from 'react';
import styled from 'styled-components';

export interface BackgroundVideoProps {
  src: string;
  playbackRate?: number;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  src,
  children,
  playbackRate = 0.5,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <>
      <VideoBlock ref={videoRef} autoPlay muted loop playsInline poster="">
        <source src={src} type="video/mp4" />
      </VideoBlock>
      {children}
    </>
  );
};

const VideoBlock = styled.video`
  /** Simulationg background-size: cover */
  object-fit: cover;
  height: 100%;
  width: 100%;

  position: absolute;
  top: 0;
  left: 0;

  z-index: -100;
  filter: brightness(1.4);
`;
