import { css, cx } from '@linaria/core';
import { Container, Text, Image, ImageBox, Image2 } from '../../components';
import { blockMarginCss } from '../../theme';
import activeSoulSrc from './activesoul.png';
import band3Src from './band3.jpg';
import legoJsonSrc from './legoJson.png';
import uniswapSrc from './uniswap.png';
import genSrc from './gen.png';
import solidityTodoSrc from './solidity-todo.png';
import { ComponentsCommonTypes } from '../Spline';
import { containerWrapCss } from '../Experience/Experience';
import { useCallback } from 'react';

export type ProjectsProps = ComponentsCommonTypes;

export const Projects = ({ index }: ProjectsProps) => {
  const projects = [
    {
      title: 'OpenAI Component Generation',
      url: 'http://178.128.195.181:5050/',
      src: genSrc,
      fallback: genSrc,
    },
    {
      title: 'Uniswap Ether / Solidity Web3',
      url: 'https://unswap-nik.netlify.app/',
      src: uniswapSrc,
      fallback: uniswapSrc,
    },
    {
      title: 'Solidity TODO / Ehter Solidity Web3',
      url: 'https://solidity-todo-nik.netlify.app/',
      src: solidityTodoSrc,
      fallback: solidityTodoSrc,
    },
    {
      title: 'Xiaomi Band 3',
      url: 'https://band3.netlify.app/',
      src: band3Src,
      fallback: band3Src,
    },
    {
      title: 'NPM: JSON Viewer',
      url: 'https://lego-react-json-view.netlify.app/',
      src: legoJsonSrc,
      fallback: legoJsonSrc,
    },
    {
      title: 'ActiveSoul',
      url: 'https://active-soul.netlify.app/',
      src: activeSoulSrc,
      fallback: activeSoulSrc,
    },
  ];

  const onClickSendStats = useCallback(
    (url: string) => () => {
      window?.tracker?.track('chernyshov.app', 'projects', 'link', 'open', url);
    },
    []
  );

  return (
    <Container data-component-index={index}>
      <Text variant="h1" className={blockMarginCss}>
        Projects:
      </Text>

      <Container isEnabledPaddingBottom={false} className={containerWrapCss}>
        {projects.map(({ title, url, src, fallback }) => (
          <Container isEnabledPaddingBottom={false} key={`${title}${url}`}>
            {/* TODO: Image add wrapper with settings for scale and height/width */}
            <a
              href={url}
              onClick={onClickSendStats(url)}
              target="_blank"
              rel="noreferrer"
            >
              <ImageBox className={imageCss}>
                <Image2 src={src} fallback={fallback} />
              </ImageBox>
            </a>

            <Text
              variant="link-h3"
              target="_blank"
              rel="noreferrer"
              className={linkCss}
              onClick={onClickSendStats(url)}
              href={url}
            >
              {title}
            </Text>
          </Container>
        ))}
      </Container>
    </Container>
  );
};

const linkCss = css`
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const imageCss = css`
  min-height: 30vw;
  max-height: 300px;
  min-width: 30vw;
  max-width: 300px;

  @media screen and (min-width: 575px) {
    min-height: 20vw;
    max-height: 400px;
    min-width: 20vw;
    max-width: 400px;
  }

  @media screen and (min-width: 768px) {
    min-height: 20vw;
    max-height: 300px;
    min-width: 20vw;
    max-width: 300px;
  }

  @media screen and (min-width: 1024px) {
    min-height: 20vw;
    max-height: 400px;
    min-width: 20vw;
    max-width: 400px;
  }
`;
