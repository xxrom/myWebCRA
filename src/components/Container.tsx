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
  display: flex;
  width: 100%;
  max-width: 100vw;
  min-height: 500px;
  overflow: hidden;
`;
const paddingBottomCss = css`
  padding-bottom: 0rem;
`;

//TODO mobile,tablet,desktop renaming !
const Border = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  margin: 2rem 4rem;

  ${desktop(`
  margin: 0rem 4.5rem;
  `)};
  ${tablet(`
  margin: 0rem 2.5rem;
  `)};
  ${mobile(`
  margin: 0rem 1.5rem;
  `)};
`;
