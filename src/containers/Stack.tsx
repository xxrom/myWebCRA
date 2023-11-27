import { css } from '@linaria/core';
import { Container, Text, BorderContainer } from '../components';
import { blockMarginCss } from '../theme';
import { ComponentsCommonTypes } from './Spline';

export type StackProps = ComponentsCommonTypes;

export const Stack = ({ index }: StackProps) => {
  return (
    <Container data-compontent-index={index} className={containerCss}>
      <Text variant="h1" className={blockMarginCss}>
        Stack:
      </Text>

      <BorderContainer>
        <Text variant="h3" className={textBoldCss}>
          <b>TypeScript</b> / JavaScript
        </Text>

        <Text variant="h3" className={textBoldCss}>
          <b>React</b> / GraphQL / WebSockets
        </Text>

        <Text variant="h3">Python / Koa</Text>

        <Text variant="h3" className={textBoldCss}>
          <b>k3s/k8s</b> / AWS / GCP / Heroku
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
