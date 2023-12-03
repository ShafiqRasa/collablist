'use client';
// built-in imports
import React from 'react';

// internal imports
import { Wrapper, List } from './verticle-list.component.styles';
import { complexListProps } from '../complex-list/complex-list.component';

const VerticalList: React.FC<complexListProps> = ({ children, data }) => {
  return data ? (
    <Wrapper>
      {data.map((item, position) => (
        <List key={item.id}>{children(item, position)}</List>
      ))}
    </Wrapper>
  ) : null;
};
export default VerticalList;
