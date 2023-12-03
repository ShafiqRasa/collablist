import { asyncItemType } from 'types/Entry';

export const checkValidId = (id: number, list: asyncItemType[]): boolean =>
  !!list.find((item) => item.id === id);
/**  use double negetion sign to parse the result to the logical value true or false */
