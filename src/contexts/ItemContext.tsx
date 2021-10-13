import { createContext, ReactNode, useEffect, useState } from 'react';
import { format } from 'date-fns';
// eslint-disable-next-line import/no-cycle
import { useQuery } from 'react-query';
import { api } from '../services/apiClient';

interface Item {
  userId: string;
  name: string;
  category: string;
  minimumStock: number;
  daysToNotifyExpirationDate: number;
  measureunity: string;
  id: string;
  createdat: Date;
}

interface ItemData {
  items: Item[];
}

export type ItemContextData = {
  items: Item[];
  refetchItem: () => void;
  isLoading: boolean;
};

type ItemProviderProps = {
  children: ReactNode;
};

const ItemContext = createContext({} as ItemContextData);

function ItemProvider({ children }: ItemProviderProps): JSX.Element {
  const {
    isLoading,
    isError,
    error,
    data: items,
    refetch: refetchItem,
  } = useQuery<ItemData>('getItems', () =>
    api.get('/items').then(response => response.data.item)
  );

  return (
    <ItemContext.Provider
      value={{ items: items?.items, refetchItem, isLoading }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export { ItemContext, ItemProvider };
