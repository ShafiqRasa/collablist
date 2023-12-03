import React, { useEffect, useState } from 'react';
import { useCellContextProvider } from '../../context/cell.context';

type Cell = {
  id: number;
  value: string;
};

type EditableCellProps = {
  cell: Cell;
};

const EditableCell: React.FC<EditableCellProps> = ({ cell }) => {
  const { handleCellChange } = useCellContextProvider();
  const [valueUnderEdit, setValueUnderEdit] = useState<string>(cell.value);

  useEffect(() => {
    setValueUnderEdit(cell.value);
  }, [cell.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueUnderEdit(e.target.value);
  };
  const handleBlur = () => {
    if (valueUnderEdit !== cell.value) {
      handleCellChange(cell.id, valueUnderEdit);
    }
  };

  return (
    <input
      type="text"
      className="editable-cell-input m-2"
      value={valueUnderEdit}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default EditableCell;
