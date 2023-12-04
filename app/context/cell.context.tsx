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
import { toast } from 'react-toastify';

interface ICellChangeContext {
  cells: asyncItemType[];
  handleCellChange: (item: asyncItemType) => void;
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
    socketRef?.current?.on('list', (syncedArray) => {
      setCells(syncedArray);
    });

    socketRef?.current?.on('itemUpdated', (updatedList) => {
      setCells(updatedList);
    });

    socketRef?.current?.on('itemInserted', (updatedList) =>
      setCells(updatedList),
    );

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

  const handleCellChange = (item: asyncItemType) => {
    socketRef.current?.emit('updateItem', item);
  };

  const handleInsert = (position: number) => {
    socketRef.current?.emit('insertItem', position);
  };

  const handleDelete = (position: number) => {
    socketRef.current?.emit('deleteItem', position);
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
