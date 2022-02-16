import styled, {FlattenSimpleInterpolation} from 'styled-components';
import cx from 'classnames';
import {fontCommon} from './Text';
import {theme} from '../theme';

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

  border: 1px solid ${theme.colors.bg};
  cursor: pointer;

  &:hover {
    border: 1px solid ${theme.colors.ghost};
  }

  ${props => props.className};
`;
