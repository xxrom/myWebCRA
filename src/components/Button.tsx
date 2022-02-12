import styled, {FlattenSimpleInterpolation} from 'styled-components';
import cx from 'classnames';
import {fontCommon} from './Text';

export type ButtonProps = {
  children: React.ReactNode;
  className?: FlattenSimpleInterpolation;
};

export const Button = ({children, className}: ButtonProps) => (
  <ButtonStyled className={cx(className)}>{children}</ButtonStyled>
);

const ButtonStyled = styled.button`
  ${fontCommon};

  font-size: 1rem;
  font-size: calc(12px + (24 - 12) * (100vw -400px) / (1600 -400));

  ${props => props.className};
`;
