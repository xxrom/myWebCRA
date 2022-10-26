import { css, cx } from '@linaria/core';
import {
  Container,
  BorderContainer,
  Text,
  Image,
  ImageBox,
  VideoMini,
} from '../../components';

import hexapod from './hexapod.png';
import { blockMarginCss, theme } from '../../theme';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import circleVideo from './circle_1.mp4';
import slicesVideo from './slices_1.mp4';
import roundSlicesVideo from './round_slices_1.mp4';
import rombVideo from './romb_1.mp4';

export type EducationAndHobbyProps = {};

export const EducationAndHobby = ({}: EducationAndHobbyProps) => {
  const videos = [
    <VideoMini className={carouselItemCss} src={circleVideo} size="normal" />,
    <VideoMini
      className={carouselItemCss}
      src={roundSlicesVideo}
      size="normal"
    />,
    <VideoMini className={carouselItemCss} src={rombVideo} size="normal" />,
    <VideoMini className={carouselItemCss} src={slicesVideo} size="normal" />,
  ];

  return (
    <>
      <Container>
        <Text variant="h1" className={blockMarginCss}>
          Education:
        </Text>

        <BorderContainer margin={theme.margin.content}>
          <Text variant="h3">
            Bauman Moscow State Technical University (Russia):
          </Text>

          <Text variant="h5">
            School of Robotic Technologies and Complex Automatization
          </Text>

          <Text variant="h3">-</Text>
          <Text variant="h3">Glyndwr University (UK):</Text>
          <Text variant="h5">Computer Science, Master’s degree</Text>
        </BorderContainer>
      </Container>

      <Container>
        <Text variant="h1" className={blockMarginCss}>
          Hobbies:
        </Text>

        <BorderContainer margin={theme.margin.content}>
          <Text variant="h3">Robots</Text>
          <Text variant="h5">
            Hexapod, balance robot (arduino, raspberry pi)
          </Text>

          <Text variant="h3">---</Text>
          <Text variant="h3">3D printing / Inventor(CAD)</Text>
          <Text variant="h5">Creating and printing different models</Text>
        </BorderContainer>

        <ImageBox className={cx(photoFullWidthCss, blockMarginCss)}>
          <Image isDisabled src={hexapod} />
        </ImageBox>
      </Container>

      <Container>
        <BorderContainer margin={theme.margin.content}>
          <Text variant="h3">Blender</Text>
        </BorderContainer>

        <div className={carouselCss}>
          <AliceCarousel
            animationType="fadeout"
            autoPlay={true}
            autoPlayInterval={3000}
            animationDuration={500}
            disableButtonsControls
            disableDotsControls
            autoWidth
            infinite
            items={videos}
            mouseTracking
          />
        </div>
      </Container>
    </>
  );
};

const carouselItemCss = css`
  min-width: 400px;
  max-width: 80vw;
  min-height: 400px;
  max-height: 400px;
  padding: 2rem 1rem;
  overflow: hidden;
`;
const carouselCss = css`
  position: relative;
  width: 100%;
  max-width: 1000px;
  padding: 0 -2rem;
  margin-left: -1rem;

  & .alice-carousel__stage {
    display: flex;
    align-items: center;
  }
`;

const photoFullWidthCss = css`
  min-height: 40vw;
  max-height: 60vw;
  min-width: 50vw;
  max-width: 80vw;
`;
