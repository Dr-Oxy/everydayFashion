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
  name: string;
  current_price: any;
  unit: string;
  photos: any;
  description: '';
  qty: number;
  available_quantity: number;
}

export interface PropsWithChildren {
  children: ReactNode;
}

export type NavigationProps = {
  [key: string]: any;
};
