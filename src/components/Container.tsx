import styled, {css, FlattenSimpleInterpolation} from 'styled-components';
import cx from 'classnames';
import {theme} from '../theme';

export type ContainerProps = {
  children: React.ReactNode;
  className?: FlattenSimpleInterpolation;
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
  min-height: 500px;
  overflow: hidden;

  ${props => props.className};
`;
const paddingBottomCss = css`
  padding-bottom: 7rem;
`;

const Border = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  margin: 2rem 4rem;

  ${theme.media.set1140(`
  margin: 1.5rem 4.5rem;
  `)};
  ${theme.media.set768(`
  margin: 1rem 2.5rem;
  `)};
  ${theme.media.set575(`
  margin: 0.5rem 1.5rem;
  `)};

  ${props => props.className};
`;
