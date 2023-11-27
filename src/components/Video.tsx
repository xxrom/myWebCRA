import { styled } from '@linaria/react';

export type VideoProps = {
  src: string;
};
export const Video = ({ src }: VideoProps) => {
  return (
    <VideoBlock autoPlay muted loop playsInline poster="">
      <source src={src} type="video/mp4" />
    </VideoBlock>
  );
};

const VideoBlock = styled.video`
  object-fit: cover;
  max-width: 60px;
  margin-right: 0.5rem;
  border-radius: 100%;

  @media screen and (max-width: 575px) {
    margin-right: 0.1rem;
    max-width: 45px;
  }
`;
