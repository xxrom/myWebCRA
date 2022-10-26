import { css, cx } from '@linaria/core';
import { Container, Text, Image, ImageBox } from '../../components';
import { blockMarginCss } from '../../theme';
import activesoul from './activesoul.png';

export type ProjectsProps = {};

const activeSoulUrl = 'https://active-soul.netlify.app/';

export const Projects = ({}: ProjectsProps) => {
  const items = [
    {
      title: 'ActiveSoul',
      url: activeSoulUrl,
      src: activesoul,
    },
  ];

  return (
    <Container>
      <Text variant="h1" className={blockMarginCss}>
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
  min-height: 30vw;
  max-height: 500px;
  min-width: 30vw;
  max-width: 500px;

  @media screen and (max-width: 575px) {
    min-height: 250px;
    height: 70vw;
    max-height: 500px;
    min-width: 250px;
    width: 70vw;
    max-width: 500px;
  }
`;
