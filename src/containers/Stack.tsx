import { css } from '@linaria/core';
import { Container, Text, BorderContainer } from '../components';
import { blockMarginCss } from '../theme';
import { ComponentsCommonTypes } from './Spline';

export type StackProps = ComponentsCommonTypes;

export const Stack = ({ index }: StackProps) => {
  return (
    <Container data-component-index={index} className={containerCss}>
      <Text variant="h1" className={blockMarginCss}>
        Stack:
      </Text>

      <BorderContainer>
        <Text variant="h3" className={textBoldCss}>
          <b>TypeScript</b> / <span>JavaScript</span>
        </Text>

        <Text variant="h3" className={textBoldCss}>
          <span>React</span> / <b>Next.js</b> / <span>GraphQL</span> /{' '}
          <span>WebSockets</span> / <span>CRUD API</span>
        </Text>

        <Text variant="h3" className={textBoldCss}>
          <span>Python</span> / <span>Vite</span> / <span>Nest.js</span> /{' '}
          <span>Fastify</span>
        </Text>

        <Text variant="h3" className={textBoldCss}>
          <b>DigitalOcean</b>/<span>AWS</span>/<span>GCP</span>/
          <span>Heroku</span>
        </Text>

        <Text variant="h3" className={textBoldCss}>
          <b>k3s/k8s</b> / <span>Proxmox</span> / <span>Ansible</span> /{' '}
          <span>Traefik</span> / <span>Harbor</span>
        </Text>

        <Text variant="h3" className={textBoldCss}>
          <span>Agile</span> / <b>JIRA</b> / <span>CI/CD</span> /{' '}
          <span>Docker</span> / <span>Storybook</span>
        </Text>

        <Text variant="h3" className={textBoldCss}>
          <b>Leadership</b> / <span>Mentoring</span> /{' '}
          <span>Performance Optimization</span>{' '}
        </Text>

        <Text variant="h3" className={textBoldCss}>
          <b>Solidity</b> / <span>Ethers.js</span> / <span>Web3.js</span>
        </Text>
      </BorderContainer>
    </Container>
  );
};

const containerCss = css`
  flex-direction: column;
`;

const textBoldCss = css`
  display: flex;
  flex-flow: wrap;
  b {
    font-weight: 400;
  }
  b,
  span {
    padding: 0 0.5rem;
  }
`;
