import { css, cx } from '@linaria/core';
import { Container, Text, Image, ImageBox } from '../../components';
import { blockMarginCss } from '../../theme';
import activesoulSrc from './activesoul.png';
import band3Src from './band3.jpg';
import legoJsonSrc from './legoJson.png';
import uniswapSrc from './uniswap.png';

export type ProjectsProps = {};

export const Projects = ({}: ProjectsProps) => {
  const projects = [
    {
      title: 'Uniswap Eth',
      url: 'https://unswap-nik.netlify.app/',
      src: uniswapSrc,
    },
    {
      title: 'Xiaomi Band 3',
      url: 'https://band3.netlify.app/',
      src: band3Src,
    },
    {
      title: 'NPM: JSON Viewer',
      url: 'https://lego-react-json-view.netlify.app/',
      src: legoJsonSrc,
    },
    {
      title: 'ActiveSoul',
      url: 'https://active-soul.netlify.app/',
      src: activesoulSrc,
    },
  ];

  return (
    <Container>
      <Text variant="h1" className={blockMarginCss}>
        Projects:
      </Text>

      <>
        {projects.map(({ title, url, src }) => (
          <>
            {/* TODO: Image add wrapper with settings for scale and height/width */}
            <a href={url} target="_blank" rel="noopener">
              <ImageBox className={cx(imageCss)}>
                <Image src={src} />
              </ImageBox>
            </a>

            <Text
              variant="link-h3"
              target="_blank"
              rel="noopener"
              className={linkCss}
              href={url}
            >
              {title}
            </Text>
          </>
        ))}
      </>
    </Container>
  );
};

const linkCss = css`
  margin-top: 2rem;
  margin-bottom: 4rem;
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
