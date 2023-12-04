'use client';
import React from 'react';
// internal imports
import { Wrapper, Logo } from './header.component.styles';

const Header: React.FC = () => {
  return (
    <Wrapper>
      <Logo>Skoove GmbH</Logo>
    </Wrapper>
  );
};
export default Header;
