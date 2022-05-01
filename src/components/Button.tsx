import styled, {FlattenSimpleInterpolation} from 'styled-components';
import cx from 'classnames';
import {fontCommon} from './Text';
import {theme} from '../theme';

export type ButtonProps = {
  children: React.ReactNode;
  className?: FlattenSimpleInterpolation;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({
  children,
  className,
  onClick = () => {},
}: ButtonProps) => (
  <ButtonStyled className={cx(className)} onClick={onClick}>
    {children}
  </ButtonStyled>
);

const ButtonStyled = styled.button`
  ${fontCommon};

  font-size: 1rem;
  font-size: calc(12px + (24 - 12) * (100vw -400px) / (1600 -400));
  padding: ${theme.sizes.paddingSmall};

  border: 1px solid ${theme.colors.bg};
  border-radius: ${theme.sizes.borderRadius};
  cursor: pointer;

  &:hover {
    border: 1px solid ${theme.colors.ghost};
  }

  ${props => props.className};
`;
