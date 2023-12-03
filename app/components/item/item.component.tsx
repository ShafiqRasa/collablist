'use client';
// built-imports
import React from 'react';
import { MdDelete } from 'react-icons/md';
import { IoIosAddCircle } from 'react-icons/io';

// internal imports
import { asyncItemType } from 'types/Entry';
import { Wrapper } from './item.component.styles';
import { EditableCell } from '../index';

type itemProps = {
  data: asyncItemType & { position: number };
};
const Item: React.FC<itemProps> = ({
  data: { position, id, value, focus },
}) => {
  return (
    <Wrapper>
      <p>{position + 1}</p>
      <EditableCell cell={{ id, value, focus }} />
      <div>
        <IoIosAddCircle />
        <MdDelete />
      </div>
    </Wrapper>
  );
};
export default Item;
