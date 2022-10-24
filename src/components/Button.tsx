import { cx } from '@linaria/core';
import { styled } from '@linaria/react';
import { fontCommon } from './Text';
import { theme } from '../theme';
import { FC } from 'react';

export type ButtonProps = {
  children?: React.ReactNode;
  className?: string; //FlattenSimpleInterpolation;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button: FC<ButtonProps> = ({
  children,
  className,
  onClick = () => {},
}) => (
  <ButtonStyled classNameInside={cx(className, fontCommon)} onClick={onClick}>
    {children}
  </ButtonStyled>
);

const ButtonStyled = styled.button`
  font-size: 1rem;

  font-size: calc(12px + (24 - 12) * (100vw -400px) / (1600 -400));
  padding: ${theme.sizes.paddingNormal};

  border: 1px solid ${theme.colors.bg50};

  border-radius: ${theme.sizes.borderRadius};
  cursor: pointer;

  &:hover {
    border: 1px solid ${theme.colors.ghost};
  }
`;
