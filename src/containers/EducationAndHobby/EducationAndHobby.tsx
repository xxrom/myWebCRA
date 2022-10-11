import { css, cx } from '@linaria/core';
import { Container, Text, Image, ImageBox, VideoMini } from '../../components';
import { blockMarginCss } from '../../components/Text';

import hexapod from './hexapod.png';
import snowboarding from './snowboarding.jpeg';
import { BorderContainer } from '../../components/BorderContainer';
import { theme } from '../../theme';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import circleVideo from './circle_1.mp4';
import slicesVideo from './slices_1.mp4';
import rombVideo from './romb_1.mp4';

export type EducationAndHobbyProps = {};

export const EducationAndHobby = ({}: EducationAndHobbyProps) => {
  const videos = [
    <VideoMini className={carouselItemCss} src={circleVideo} size="normal" />,
    <div className={carouselItemWrapperCss}>
      <VideoMini className={carouselItemCss} src={rombVideo} size="normal" />
    </div>,
    <VideoMini className={carouselItemCss} src={slicesVideo} size="normal" />,
  ];

  return (
    <div>
      <Container>
        <Text variant="h1" className={blockMarginCss}>
          Education:
        </Text>

        <BorderContainer>
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

          <Text variant="h3">-</Text>
          <Text variant="h3">3D printing/ Inventor(CAD)</Text>
          <Text variant="h5">Creating and printing different models</Text>
        </BorderContainer>
        <ImageBox className={cx(photoFullWidthCss, blockMarginCss)}>
          <Image isDisabled src={hexapod} />
        </ImageBox>
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
    </div>
  );
};

const carouselItemWrapperCss = css`
  height: 100%;
`;
const carouselItemCss = css`
  min-width: 80vw;
  padding: 2rem 1rem;
`;
const carouselCss = css`
  position: relative;
  max-width: 100vw;
  overflow: hidden;

  & .alice-carousel__stage {
    display: flex;
    align-items: center;
  }
`;

const photoFullWidthCss = css`
  min-height: 40vw;
  max-height: 60vw;
  min-width: 90%;
  max-width: 90%;

  @media screen and (max-width: 575px) {
    min-height: 40vw;
    max-height: 60vw;
    min-width: 90%;
    max-width: 90%;
  }
`;
