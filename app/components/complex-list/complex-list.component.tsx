'use client';
// built-in imports
import { asyncItemType } from 'types/Entry';
import { VerticalList } from '../index';

export type complexListProps = {
  children: (item: asyncItemType, position: number) => React.ReactNode;
  data: asyncItemType[];
};
const ComplexList: React.FC<complexListProps> = ({ children, data }) => {
  return <VerticalList data={data}>{children}</VerticalList>;
};
export default ComplexList;
