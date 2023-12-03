// built-in imports
import { Server as SocketServer } from 'socket.io';

// internal imports
import { checkValidId } from '../../validators/updateItemValidator';
import { Entry, asyncItemType } from '../../types/Entry';
import { findPosition, ipProvider } from '../helper/index';

const synchronizedArray = Array.from({ length: 8 }, (_v, i) => {
  return { id: i + 1, value: 'Default Entry ' + i, focus: false };
});

export const getSyncArray = (): asyncItemType[] => {
  return synchronizedArray;
};
export const updateItem = ({
  io,
  itemToUpdate,
}: {
  io: SocketServer;
  itemToUpdate: Entry;
}) => {
  console.log('updateItem received');
  if (checkValidId(itemToUpdate.position, synchronizedArray)) {
    // synchronizedArray[itemToUpdate.position] = itemToUpdate.value;
    io.emit('itemUpdated', itemToUpdate as any);
    console.log('itemUpdated sent');
  }
};

export const insertItem = ({
  io,
  position,
}: {
  io: SocketServer;
  position: number;
}) => {
  console.log('new item in this positoin should be inserted', position);
  const newId = ipProvider(synchronizedArray);
  const newItem = {
    id: newId,
    value: '',
    focus: false,
  };
  synchronizedArray.splice(position, 0, newItem);
  io.emit('itemInserted', synchronizedArray as any);
  console.log('itemInserted sent');
};

export const deleteItem = ({ io, id }: { io: SocketServer; id: number }) => {
  console.log('deleteItem received', id);
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
