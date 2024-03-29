'use client';
// built-in imports
import React, { useEffect, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { MdOutlineEditOff } from 'react-icons/md';

// internal imports
import { useCellContextProvider } from '../../context/cell.context';
import { asyncItemType } from 'types/Entry';
import {
  Wrapper,
  BlockContainer,
  Input,
} from './editable-cell.component.styles';

type EditableCellProps = {
  cell: asyncItemType;
};

const EditableCell: React.FC<EditableCellProps> = ({
  cell: { id, value, focus } /** Props destructuring as a best pracitce */,
}) => {
  const { handleCellChange } = useCellContextProvider();
  const [valueUnderEdit, setValueUnderEdit] = useState<string>(value);

  useEffect(() => {
    setValueUnderEdit(value);
  }, [value]);

  useEffect(() => {
    if (localStorage.getItem('focusedId') === '0') return;
    const unloadCallback = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      handleCellChange({ id, value: valueUnderEdit, focus: false });
      return (event.returnValue = '');
    };

    window.addEventListener('beforeunload', unloadCallback, { capture: true });
    return () =>
      window.removeEventListener('beforeunload', unloadCallback, {
        capture: true,
      });
  }, [focus, id, valueUnderEdit, handleCellChange]);

  /** find the user who focused the input box, to style input accordingly */
  const isFocused =
    focus && id.toString() === localStorage.getItem('focusedId');

  /** the focused inputs will be blocked for every concurrent users, except whom focused indeed */
  const shouldBlocked =
    focus && id.toString() !== localStorage.getItem('focusedId');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValueUnderEdit(e.target.value);

  const handleBlur = () => {
    handleCellChange({ id, value: valueUnderEdit, focus: false });
    localStorage.setItem('focusedId', '0');
  };

  const handleFocus = () => {
    handleCellChange({ id: id, value: valueUnderEdit, focus: true });
    localStorage.setItem('focusedId', id.toString());
  };

  return (
    <Wrapper>
      <Input
        type="text"
        className="editable-cell-input m-2"
        disabled={shouldBlocked}
        value={valueUnderEdit}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />

      {isFocused ? (
        <BlockContainer>
          <MdOutlineEditOff />
          <p>typing...</p>
        </BlockContainer>
      ) : (
        <FiEdit2 />
      )}
    </Wrapper>
  );
};

export default EditableCell;
