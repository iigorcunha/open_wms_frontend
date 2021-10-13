import { useContext } from 'react';
import { ItemContext, ItemContextData } from '../contexts/ItemContext';

const useItems = (): ItemContextData => useContext(ItemContext);

export { useItems };
