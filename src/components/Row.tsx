import { styled } from '@linaria/react';
import { css, cx } from '@linaria/core';

export type RowProps = {
  children: React.ReactNode;
  className?: string;
  isEnabledPaddingBottom?: boolean;
};

export const Row = ({ children, className }: RowProps) => (
  <Wrapper className={className}>{children}</Wrapper>
);

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
