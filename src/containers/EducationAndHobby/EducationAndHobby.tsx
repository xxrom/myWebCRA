import {css} from 'styled-components';
import {Container, Text, Image, ImageBox} from '../../components';
import {blockMarginCss} from '../../components/Text';
import cx from 'classnames';

import hexapod from './hexapod.png';
import snowboarding from './snowboarding.jpeg';
import {BorderContainer} from '../../components/BorderContainer';
import {theme} from '../../theme';

export type EducationAndHobbyProps = {};

export const EducationAndHobby = ({}: EducationAndHobbyProps) => {
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
          <Text variant="h3">Snowboarding</Text>
        </BorderContainer>

        <ImageBox className={cx(photoCss, blockMarginCss)}>
          <Image isDisabled src={snowboarding} />
        </ImageBox>
      </Container>
    </div>
  );
};

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

const photoCss = css`
  min-height: 60vw;
  max-height: 60vw;
  min-width: 80vw;
  max-width: 80vw;

  @media screen and (max-width: 575px) {
    min-height: 60vw;
    max-height: 60vw;
    min-width: 80vw;
    max-width: 80vw;
  }
`;
