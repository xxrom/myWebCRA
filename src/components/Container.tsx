import styled, {css, FlattenSimpleInterpolation} from 'styled-components';
import cx from 'classnames';

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
  display: flex;
  width: 100%;
  min-height: 500px;

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

  margin: 0.5rem;

  ${props => props.className};
`;
