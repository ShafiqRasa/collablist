import { asyncItemType } from 'types/Entry';

export const findPosition = (list: asyncItemType[], id: number): number =>
  list.findIndex((item) => item.id === id);
