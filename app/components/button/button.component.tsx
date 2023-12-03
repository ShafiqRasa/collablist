'use client';
import React from 'react';
// internal imports
import { BaseButton } from './button.component.styles';

type ButtonProps = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
};
const Button: React.FC<ButtonProps> = ({ children, ...otherProps }) => {
  return <BaseButton {...otherProps}>{children}</BaseButton>;
};
export default Button;
