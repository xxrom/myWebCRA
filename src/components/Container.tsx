import styled from 'styled-components';
import {theme} from '../theme';

export type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({children}: ContainerProps) => (
  <Wrapper>
    <Border>{children}</Border>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;

  width: 100%;

  min-height: 600px;
  max-height: 60vh;
`;

const Border = styled.div`
  display: flex;
  flex: 1;

  align-items: center;
  justify-content: center;

  margin: 0.5rem;

  border: 1px solid ${theme.colors.bg};
`;
