'use client';
// built-in imports
import React from 'react';

// internal imports
import { EditableCell } from '../index';
import { useCellContextProvider } from '../../context/cell.context';

const VerticalList: React.FC = () => {
  const { cells, handleInsert, handleDelete } = useCellContextProvider();

  return (
    <div>
      {cells.map(({ id, value, focus }, position) => (
        <div key={`key-${id}-${position}`} className="flex justify-start">
          <EditableCell cell={{ id, value, focus }} />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-2 py-1 text-center m-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleInsert(position)}
          >
            +
          </button>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-2 py-1 text-center m-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleDelete(id)}
          >
            -
          </button>
        </div>
      ))}
    </div>
  );
};
export default VerticalList;
