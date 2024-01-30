'use client';
import { checkValidId, findPosition, idProvider } from 'app/helper';
// built-in imports
import React, { createContext, useState, useContext, useEffect } from 'react';

// inernal imports
import {
  asyncItemType,
  cellProviderProps,
  ICellChangeContext,
} from 'types/Entry';

export const CellChangeContext = createContext<ICellChangeContext>({
  cells: [],
  handleCellChange: () => {},
  handleInsert: () => {},
  handleDelete: () => {},
});

const synchronizedArray = Array.from({ length: 8 }, (_v, i) => {
  return { id: i + 1, value: 'Default Entry ' + i, focus: false };
});

export const CellChangeContextProvider: React.FC<cellProviderProps> = ({
  children,
}) => {
  const [cells, setCells] = useState<asyncItemType[]>([]);

  useEffect(() => {
    if (
      !localStorage.getItem('collist') ||
      JSON.parse(localStorage.getItem('collist') as string).length === 0
    ) {
      localStorage.setItem('collist', JSON.stringify(synchronizedArray));
      console.log('here');
    }
    setCells(JSON.parse(localStorage.getItem('collist') as string));
  }, []);

  /** it is always recommended to have implicit return in arrow function when it has only one expression */
  const handleCellChange = (item: asyncItemType) => {
    console.log('item in focus:', item);

    if (checkValidId(item.id, cells)) {
      setCells((currentCells) => {
        let i = 0;
        const updatedCells = currentCells.reduce(
          (acc: asyncItemType[], curr: asyncItemType) => {
            if (curr.id === item.id) {
              acc[i] = item;
            } else {
              acc[i] = curr;
            }
            i++;
            return acc;
          },
          [],
        );
        localStorage.setItem('collist', JSON.stringify(updatedCells));
        return updatedCells;
      });
    }
  };

  const handleInsert = (position: number) => {
    console.log('targated position:', position);

    const newId = idProvider(cells);
    const newItem = {
      id: newId,
      value: '',
      focus: false,
    };

    setCells((currentCells) => {
      let i = 0;
      const updatedCells = currentCells.reduce(
        (acc: asyncItemType[], curr: asyncItemType) => {
          if (i === position) {
            acc[i] = newItem;
            acc[i + 1] = curr;
            i++;
          } else {
            acc[i] = curr;
          }
          i++;
          return acc;
        },
        [],
      );
      localStorage.setItem('collist', JSON.stringify(updatedCells));
      return updatedCells;
    });
  };

  const handleDelete = (id: number) => {
    if (checkValidId(id, cells)) {
      const positionToDelete = findPosition(cells, id);
      console.log(positionToDelete);

      setCells((currentCells) => {
        const updatedCells = currentCells.filter(
          (_, i) => i !== positionToDelete,
        );
        localStorage.setItem('collist', JSON.stringify(updatedCells));
        return updatedCells;
      });
    }
  };

  return (
    <CellChangeContext.Provider
      value={{ cells, handleCellChange, handleInsert, handleDelete }}
    >
      {children}
    </CellChangeContext.Provider>
  );
};

/** custome hook to avoid importing useContext and CellChangeContext */
export const useCellContextProvider = () => useContext(CellChangeContext);
