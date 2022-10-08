import {
  Container,
  Image,
  ImageBox,
  Text,
  BackgroundVideo,
} from '../../components';
import { css, cx } from '@linaria/core';
import { theme } from '../../theme';
import me from './me.jpg';
import surfVideo from '../EducationAndHobby/surf_1.mp4';

export type IntroProps = {};

export const Intro = ({}: IntroProps) => {
  return (
    <Container className={wrapperCss}>
      <BackgroundVideo src={surfVideo}>
        <Text variant="h1" className={marginCss}>
          Chernyshov Nikita GCP
        </Text>

        <Text variant="h3" className={marginCss}>
          Software developer
        </Text>

        <ImageBox className={cx(photoCss, marginCss)}>
          <Image isDisabled src={me} aria-label="me" alt="me" />
        </ImageBox>
      </BackgroundVideo>
    </Container>
  );
};

const marginCss = css`
  margin-top: 0.5rem;
  margin-bottom: 2rem;
`;

const wrapperCss = css`
  flex-direction: column;

  @media screen and (min-width: 768px) {
    border: 4px solid ${theme.colors.bg};
  }
`;

const photoCss = css`
  min-height: 400px;
  max-height: 70vh;
  min-width: 50vw;
  max-width: 700px;
  border-radius: ${theme.sizes.borderRadius};

  @media screen and (max-width: 575px) {
    min-height: 150px;
    height: 80vw;
    max-height: 80vw;
    min-width: 200px;
    width: 80vw;
    max-width: 80vw;
    border: 3px solid white;
  }
`;
