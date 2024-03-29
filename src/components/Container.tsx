import { styled } from '@linaria/react';
import { css, cx } from '@linaria/core';
import { mobile, tablet, desktop, theme } from '../theme';

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
  <Wrapper className={cx(className, isEnabledPaddingBottom && marginBottomCss)}>
    {children}
  </Wrapper>
);

const marginBottomCss = css`
  margin-bottom: ${theme?.margin?.block};
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  ${desktop(`
    margin: 1rem 3rem;
  `)};

  ${tablet(`
    margin: 1rem 2rem;
  `)};

  ${mobile(`
    margin: 1rem 1rem;
  `)};
`;
