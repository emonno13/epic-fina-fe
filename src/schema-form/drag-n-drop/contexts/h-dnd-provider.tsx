import React from 'react';
import { HDndContext } from './h-dnd-context';

export interface HDNDProviderProps {
  itemNodeName?: string,
  itemEndpoint?: string,
  shouldUpdateOrderNumbers,
  children
}

export const HDNDProvider = (props: HDNDProviderProps) => {
  const {
    children,
    itemNodeName,
    itemEndpoint,
    shouldUpdateOrderNumbers,
  } = props;

  return (
    <HDndContext.Provider
      value={{
        itemNodeName,
        itemEndpoint,
        shouldUpdateOrderNumbers,
      }}
    >
      {children}
    </HDndContext.Provider>
  );
};
