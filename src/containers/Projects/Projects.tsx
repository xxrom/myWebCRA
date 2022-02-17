import {css} from 'styled-components';
import {Container, Text, Image, ImageBox} from '../../components';
import activesoul from './activesoul.png';
import cx from 'classnames';
import {blockMarginCss} from '../../components/Text';

export type ProjectsProps = {};

const activeSoulUrl = 'https://active-soul.netlify.app/';

export const Projects = ({}: ProjectsProps) => {
  return (
    <Container>
      <Text variant="h3" className={blockMarginCss}>
        Projects:
      </Text>

      <Text variant="link-h3" className={linkCss} href={activeSoulUrl}>
        ActiveSoul
      </Text>

      {/* TODO: Image add wrapper with settings for scale and height/width */}
      <a href={activeSoulUrl}>
        <ImageBox className={cx(imageCss)}>
          <Image src={activesoul} />
        </ImageBox>
      </a>
    </Container>
  );
};

const linkCss = css`
  margin-bottom: 1rem;
`;

const imageCss = css`
  min-height: 250px;
  max-height: 50vw;
  min-width: 250px;
  max-width: 50vw;

  @media screen and (max-width: 575px) {
    min-height: 250px;
    height: 70vw;
    max-height: 600px;
    min-width: 250px;
    width: 70vw;
    max-width: 600px;
  }
`;
