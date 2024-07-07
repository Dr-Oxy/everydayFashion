import { ReactNode } from 'react';
import { ImageSourcePropType } from 'react-native';

export type AppContextType = {
  cart: Item[];
  setCart: (cart: Item[]) => void;
  onAdd: (product: Item) => void;
  onRemove: (product: Item) => void;
  onDelete: (product: Item) => void;
  selected: Item;
  setSelected: any;
};

export interface Item {
  id: number;
  title: string;
  price: string;
  unit: string;
  img: string;
  isFave: boolean;
  qty: number;
}

export interface PropsWithChildren {
  children: ReactNode;
}
