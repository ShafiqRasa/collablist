'use client';
import React from 'react';
// internal imports
import {
  BaseButton,
  InsertButton,
  DeleteButton,
} from './button.component.styles';

export const BUTTON_TYPES = {
  base: 'base',
  insert: 'insert',
  delete: 'delete',
};

const getButton = (btnType = BUTTON_TYPES.base) =>
  ({
    [BUTTON_TYPES.base]: BaseButton,
    [BUTTON_TYPES.insert]: InsertButton,
    [BUTTON_TYPES.delete]: DeleteButton,
  })[btnType]; // get use of object literals as a best pracitce

type ButtonProps = {
  children: React.ReactNode;
  btnType: string;
  onClick: React.MouseEventHandler;
};
const Button: React.FC<ButtonProps> = ({
  children,
  btnType,
  ...otherProps
}) => {
  const CustomeButton = getButton(btnType);
  return <CustomeButton {...otherProps}>{children}</CustomeButton>;
};
export default Button;
