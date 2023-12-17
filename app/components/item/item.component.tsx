'use client';
// built-imports
import React from 'react';
import { MdDelete } from 'react-icons/md';
import { IoIosAddCircle } from 'react-icons/io';
import { toast } from 'react-toastify';

// internal imports
import { asyncItemType } from 'types/Entry';
import { Wrapper, Actions } from './item.component.styles';
import { Button, EditableCell } from '../index';
import { useCellContextProvider } from 'app/context/cell.context';
import { BUTTON_TYPES } from '../button/button.component';

type itemProps = {
  data: asyncItemType & { position: number };
};
const Item: React.FC<itemProps> = ({
  data: { position, id, value, focus },
}) => {
  const { handleDelete, handleInsert } = useCellContextProvider();

  const handleItemDelete = () => {
    handleDelete(id);
    toast.success('Cell deleted successfully!');
  };
  const handleItemInsert = () => {
    handleInsert(position);
    toast.success('Cell inserted successfully!');
  };
  return (
    <Wrapper>
      <p>{position + 1}</p>
      <EditableCell cell={{ id, value, focus }} />
      <Actions>
        <Button btnType={BUTTON_TYPES.insert} onClick={handleItemInsert}>
          <IoIosAddCircle className="insert-icon" />
        </Button>
        <Button btnType={BUTTON_TYPES.delete} onClick={handleItemDelete}>
          <MdDelete className="delete-icon" />
        </Button>
      </Actions>
    </Wrapper>
  );
};
export default Item;
