import { styled } from '@linaria/react';
import { css, cx } from '@linaria/core';
import { mobile, tablet, desktop } from '../theme';

export type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  isEnabledPaddingBottom?: boolean;
};

export const Container = ({
  children,
  className,
  isEnabledPaddingBottom = true,
}: ContainerProps) => (
  <Wrapper className={cx(isEnabledPaddingBottom && paddingBottomCss)}>
    <Border className={cx(className)}>{children}</Border>
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;
const paddingBottomCss = css`
  padding-bottom: 0rem;
`;

const Border = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  margin: 2rem 4rem;

  ${desktop(`
  margin: 1rem 4.5rem;
  `)};
  ${tablet(`
  margin: 1rem 2.5rem;
  `)};
  ${mobile(`
  margin: 1rem 1.5rem;
  `)};
`;
