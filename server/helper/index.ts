import { asyncItemType } from 'types/Entry';

/** follow SRP (Single Responsibility Principle),
 *  as a best practice efficiently */

export const findPosition = (list: asyncItemType[], id: number): number =>
  list.findIndex((item) => item.id === id);

const findMaxId = (list: asyncItemType[]): number =>
  Math.max(...list.map((item) => item.id));

export const ipProvider = (list: asyncItemType[]): number =>
  findMaxId(list) + 1;
