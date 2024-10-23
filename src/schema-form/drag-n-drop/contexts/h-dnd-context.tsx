import { createContext } from 'react';

export type DndContextType = {
  itemNodeName?: string,
  itemEndpoint?: string,
  shouldUpdateOrderNumbers: boolean,
}

export const HDndContext = createContext<DndContextType>({
  itemNodeName: undefined,
  itemEndpoint: undefined,
  shouldUpdateOrderNumbers: false,
});
