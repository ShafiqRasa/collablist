import { asyncItemType } from 'types/Entry';

/** follow SRP (Single Responsibility Principle),
 *  as a best practice efficiently */

export const findPosition = (list: asyncItemType[], id: number): number =>
  list.findIndex((item) => item.id === id);

const findMaxId = (list: asyncItemType[]): number =>
  Math.max(...list.map((item) => item.id));

export const idProvider = (list: asyncItemType[]): number =>
  list.length ? findMaxId(list) + 1 : 1;

export const checkValidId = (id: number, list: asyncItemType[]): boolean =>
  !!list.find((item) => item.id === id);
/**  use double negetion sign to parse the result to the logical value true or false */
