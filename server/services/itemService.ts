// built-in imports
import { Server as SocketServer } from 'socket.io';

// internal imports
import { asyncItemType } from '../../types/Entry';
import { findPosition, ipProvider, checkValidId } from '../helper/index';

const synchronizedArray = Array.from({ length: 8 }, (_v, i) => {
  return { id: i + 1, value: 'Default Entry ' + i, focus: false };
});

export const getSyncArray = (): asyncItemType[] => synchronizedArray;

export const updateItem = ({
  io,
  itemToUpdate,
}: {
  io: SocketServer;
  itemToUpdate: asyncItemType;
}) => {
  if (checkValidId(itemToUpdate.id, synchronizedArray)) {
    const position = findPosition(synchronizedArray, itemToUpdate.id);
    synchronizedArray[position] = itemToUpdate;
    io.emit('itemUpdated', synchronizedArray as any);
  }
};

export const insertItem = ({
  io,
  position,
}: {
  io: SocketServer;
  position: number;
}) => {
  const newId = ipProvider(synchronizedArray);
  const newItem = {
    id: newId,
    value: '',
    focus: false,
  };
  synchronizedArray.splice(position, 0, newItem);
  io.emit('itemInserted', synchronizedArray as any);
};

export const deleteItem = ({ io, id }: { io: SocketServer; id: number }) => {
  if (checkValidId(id, synchronizedArray)) {
    const positionToDelete = findPosition(synchronizedArray, id);
    synchronizedArray.splice(positionToDelete, 1)?.[0];
    io.emit('itemDeleted', positionToDelete as any);
  }
};

export const putArray = ({
  io,
  updatedArray,
}: {
  io: SocketServer;
  updatedArray: asyncItemType[];
}) => {
  synchronizedArray.length = 0; // Clear the array
  synchronizedArray.push(...updatedArray); // Update with new data
  // Broadcast the updated array to all connected clients
  io.emit('arraySync', synchronizedArray as any);
};
