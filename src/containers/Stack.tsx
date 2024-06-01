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
          <b>TypeScript</b> / JavaScript
        </Text>

        <Text variant="h3" className={textBoldCss}>
          React / <b>Next.js</b> / GraphQL / WebSockets / CRUD API
        </Text>

        <Text variant="h3" className={textBoldCss}>
          Python / Vite / <b>Nest.js</b> / Fastify
        </Text>

        <Text variant="h3" className={textBoldCss}>
          <b>DigitalOcean</b> / AWS / GCP / Heroku
        </Text>

        <Text variant="h3" className={textBoldCss}>
          <b>k3s/k8s</b> / Proxmox / Ansible / Traefik / Harbor
        </Text>

        <Text variant="h3" className={textBoldCss}>
          Agile / <b>JIRA</b> / CI/CD / Docker / Storybook
        </Text>

        <Text variant="h3" className={textBoldCss}>
          <b>Leadership</b> / Mentoring / Performance Optimization
        </Text>

        <Text variant="h3" className={textBoldCss}>
          <b>Solidity</b> / Ethers.js / Web3.js
        </Text>
      </BorderContainer>
    </Container>
  );
};

const containerCss = css`
  flex-direction: column;
`;

const textBoldCss = css`
  b {
    font-weight: 400;
  }
`;
