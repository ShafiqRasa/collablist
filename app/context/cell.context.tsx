'use client';
// built-in imports
import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import io, { Socket } from 'socket.io-client';
import { toast } from 'react-toastify';

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

export const CellChangeContextProvider: React.FC<cellProviderProps> = ({
  children,
}) => {
  const [cells, setCells] = useState<asyncItemType[]>([]);
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    socketRef.current = io();

    socketRef?.current?.on('list', (syncedArray) => setCells(syncedArray));

    socketRef?.current?.on('itemUpdated', (updatedItem) => {
      setCells((currentCells) => {
        let i = 0;
        return currentCells.reduce(
          (acc: asyncItemType[], curr: asyncItemType) => {
            if (curr.id === updatedItem.id) {
              acc[i] = updatedItem;
            } else {
              acc[i] = curr;
            }
            i++;
            return acc;
          },
          [],
        );
      });
    });

    socketRef?.current?.on('itemInserted', ({ position, newItem }) => {
      setCells((currentCells) => {
        const updatedCells = [...currentCells];
        updatedCells.splice(position, 0, newItem);
        return updatedCells;
      });
    });

    socketRef?.current?.on('itemDeleted', (deletedPosition) => {
      setCells((currentCells) => {
        const updatedCells = [...currentCells];
        if (deletedPosition >= 0 && deletedPosition < updatedCells.length) {
          updatedCells.splice(deletedPosition, 1);
        } else {
          toast.error('illegal delete position');
        }
        return updatedCells;
      });
    });

    return () => {
      socketRef?.current?.disconnect();
    };
  }, []);

  /** it is always recommended to have implicit return in arrow function when it has only one expression */
  const handleCellChange = (item: asyncItemType) =>
    socketRef.current?.emit('updateItem', item);

  const handleInsert = (position: number) =>
    socketRef.current?.emit('insertItem', position);

  const handleDelete = (position: number) =>
    socketRef.current?.emit('deleteItem', position);

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
