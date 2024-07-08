import React, { useState, createContext, ReactNode } from 'react';

import { PropsWithChildren, AppContextType, Item } from './@types/context';

const emptyItem: Item = {
  id: 1,
  name: '',
  current_price: '',
  unit: '',
  photos: '',
  description: '',
  qty: 0,
  available_quantity: 0,
};

// Provide a default value for the context
const defaultContextValue: AppContextType = {
  cart: [],
  setCart: () => {},
  onAdd: () => {},
  onRemove: () => {},
  onDelete: () => {},
  selected: emptyItem,
  setSelected: () => {},
};

// export const AppContext = createContext<AppContextType>(defaultContextValue);
export const AppContext = createContext<AppContextType>(defaultContextValue);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<Item[]>([]);
  const [selected, setSelected] = useState<any>();

  // add to cart
  const onAdd = (product: Item) => {
    //checks if the product already exist in the cart
    const itemExist = cart.find((x) => x.id === product.id);

    //If product exists in cart
    if (itemExist) {
      setCart(
        cart.map((x) =>
          x.id === product.id
            ? { ...itemExist, qty: itemExist.qty + product.qty }
            : x,
        ),
      );
    } else {
      //if product doesn't exist in cart, add to cart
      setCart([...cart, { ...product }]);
    }
  };

  // delete cart item
  const onRemove = (product: Item) => {
    const itemExist = cart.find((x) => x.id === product.id);

    if (itemExist && itemExist.qty === 1) {
      setCart(cart.filter((x) => x.id !== product.id));
    } else if (itemExist) {
      setCart(
        cart.map((x) =>
          x.id === product.id
            ? { ...itemExist, qty: (itemExist.qty || 0) - 1 }
            : x,
        ),
      );
    }
  };

  const onDelete = (product: Item) => {
    const itemExist = cart.find((x) => x.id === product.id);

    if (itemExist) {
      setCart(cart.filter((x) => x.id !== product.id));
    }
  };

  const value = {
    cart,
    setCart,
    onAdd,
    onRemove,
    onDelete,
    selected,
    setSelected,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
