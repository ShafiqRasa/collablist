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
import { asyncItemType } from 'types/Entry';

interface ICellChangeContext {
  cells: asyncItemType[];
  handleCellChange: (id: number, value: string) => void;
  handleInsert: (position: number) => void;
  handleDelete: (position: number) => void;
}

export const CellChangeContext = createContext<ICellChangeContext>({
  cells: [],
  handleCellChange: () => {},
  handleInsert: () => {},
  handleDelete: () => {},
});

type cellProviderProps = {
  children: React.ReactNode;
};

export const CellChangeContextProvider: React.FC<cellProviderProps> = ({
  children,
}) => {
  const [cells, setCells] = useState<asyncItemType[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io();
    console.log('connected');

    socketRef?.current?.on('list', (syncedArray) => {
      console.log('received list', syncedArray);
      setCells(syncedArray);
    });

    socketRef?.current?.on('itemUpdated', (updatedItem) => {
      setCells((currentCells) => {
        const updatedCells = [...currentCells];
        if (
          updatedItem.position >= 0 &&
          updatedItem.position < updatedCells.length
        ) {
          updatedCells[updatedItem.position] = updatedItem.value;
        } else {
          console.log('illegal update position ' + updatedItem.position);
        }
        return updatedCells;
      });
    });

    socketRef?.current?.on('itemInserted', (insertedItem) => {
      console.log('received itemInserted', insertedItem);
      setCells((currentCells) => {
        const updatedCells = [...currentCells];
        updatedCells.splice(insertedItem.position, 0, insertedItem.value);
        return updatedCells;
      });
    });

    socketRef?.current?.on('itemDeleted', (deletedPosition) => {
      console.log('received itemDeleted');
      setCells((currentCells) => {
        const updatedCells = [...currentCells];
        if (deletedPosition >= 0 && deletedPosition < updatedCells.length) {
          updatedCells.splice(deletedPosition, 1);
        } else {
          console.log('illegal delete position ' + deletedPosition);
        }
        return updatedCells;
      });
    });

    return () => {
      socketRef?.current?.disconnect();
    };
  }, []);

  const handleCellChange = (id: number, value: string) => {
    socketRef.current?.emit('updateItem', { position: id, value: value });
    console.log('update sent to server');
  };

  const handleInsert = (position: number) => {
    console.log('position', position);
    socketRef.current?.emit('insertItem', { position: position, value: '' });
    console.log('insert sent to server');
  };

  const handleDelete = (position: number) => {
    socketRef.current?.emit('deleteItem', position);
    console.log('delete sent to server');
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
