import styled, {
  CSSProperties,
  FlattenSimpleInterpolation,
} from 'styled-components';
import {theme} from '../theme';
import cx from 'classnames';

export type ContainerProps = {
  children: React.ReactNode;
  className?: FlattenSimpleInterpolation;
};

export const Container = ({children, className}: ContainerProps) => (
  <Wrapper>
    <Border className={cx(className)}>{children}</Border>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;

  width: 100%;

  min-height: 500px;
  max-height: 50vh;
`;

const Border = styled.div`
  display: flex;
  flex: 1;

  align-items: center;
  justify-content: center;

  margin: 0.5rem;

  border: 1px solid ${theme.colors.bg};
  ${props => props.className};
`;
