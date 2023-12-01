//import { css } from '@linaria/core';
import {
  Container,
  BorderContainer,
  Text,
  ImageBox,
  //Image,
  //ImageBox,
  VideoMini,
} from '../../components';

//import hexapod from './hexapod.png';
import { blockMarginCss, theme } from '../../theme';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import circleVideo from './circle_1.mp4';
import slicesVideo from './slices_1.mp4';
import roundSlicesVideo from './round_slices_1.mp4';
import rombVideo from './romb_1.mp4';
import { ComponentsCommonTypes } from '../Spline';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

export type CarouselAliceProps = ComponentsCommonTypes;

export const CarouselAlice = ({ index }: CarouselAliceProps) => {
  const videos = [
    <VideoMini key={0} src={circleVideo} size="null" />,
    <VideoMini key={1} src={roundSlicesVideo} size="null" />,
    <VideoMini key={2} src={rombVideo} size="null" />,
    <VideoMini key={3} src={slicesVideo} size="null" />,
  ];

  return (
    <div data-component-index={index}>
      <Container>
        <Text variant="h1" className={blockMarginCss}>
          Hobbies:
        </Text>

        {/*
        <ImageBox className={cx(photoFullWidthCss, blockMarginCss)}>
          <Image isDisabled src={hexapod} />
        </ImageBox>
      */}
      </Container>

      <Container>
        <BorderContainer margin={theme.margin.content}>
          <Text variant="h3">Blender</Text>
        </BorderContainer>

        <Container>
          {videos.map((video, index) => (
            <VideoWrapper key={index}>{video}</VideoWrapper>
          ))}
        </Container>

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

const VideoWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 400px;
  max-width: 400px;
  min-height: 400px;
  max-height: 400px;
  overflow: hidden;
`;

const _carouselItemCss = css`
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

const _photoFullWidthCss = css`
  min-height: 40vw;
  max-height: 60vw;
  min-width: 50vw;
  max-width: 80vw;
  min-width: 50vw;
  max-width: 80vw;
`;
