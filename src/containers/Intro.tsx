import {Container, Image, ImageBox, Text} from '../components';
import {css} from 'styled-components';
import {theme} from '../theme';
import cx from 'classnames';
import me from '../containers/EducationAndHobby/me.jpg';

export type IntroProps = {};

export const Intro = ({}: IntroProps) => {
  return (
    <Container className={wrapperCss}>
      <Text variant="h1" className={marginCss}>
        Chernyshov Nikita
      </Text>

      <Text variant="h3" className={marginCss}>
        Software developer
      </Text>

      <ImageBox className={cx(photoCss)}>
        <Image isDisabled src={me} />
      </ImageBox>
    </Container>
  );
};

const marginCss = css`
  margin-bottom: 2rem;
`;

const wrapperCss = css`
  flex-direction: column;
  border: 1px solid ${theme.colors.bg};
`;

const photoCss = css`
  min-height: 30vw;
  max-height: 30vw;
  min-width: 40vw;
  max-width: 40vw;

  @media screen and (max-width: 575px) {
    min-height: 30vw;
    max-height: 30vw;
    min-width: 40vw;
    max-width: 40vw;
  }
`;
