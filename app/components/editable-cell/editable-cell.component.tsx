import React, { useEffect, useState } from 'react';
import { useCellContextProvider } from '../../context/cell.context';
import { asyncItemType } from 'types/Entry';

type EditableCellProps = {
  cell: asyncItemType;
};

const EditableCell: React.FC<EditableCellProps> = ({ cell: { id, value } }) => {
  const { handleCellChange } = useCellContextProvider();
  const [valueUnderEdit, setValueUnderEdit] = useState<string>(value);

  useEffect(() => {
    setValueUnderEdit(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueUnderEdit(e.target.value);
  };
  const handleBlur = () => {
    if (valueUnderEdit !== value) {
      handleCellChange({ id, value: valueUnderEdit, focus: false });
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
