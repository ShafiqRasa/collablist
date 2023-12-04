export type asyncItemType = {
  id: number;
  value: string;
  focus: boolean;
};

export type cellProviderProps = {
  children: React.ReactNode;
};

export interface ICellChangeContext {
  cells: asyncItemType[];
  handleCellChange: (item: asyncItemType) => void;
  handleInsert: (position: number) => void;
  handleDelete: (position: number) => void;
}
