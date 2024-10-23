import { createContext } from 'react';
import { vinaCapitalTabPaneKeys } from '../../constants';

export interface IVinaCapitalManagementContext {
  tabActive: string,
  setTabActive: (value: string) => void
}

export const VinaCapitalManagementContext = createContext<IVinaCapitalManagementContext>({
  tabActive: vinaCapitalTabPaneKeys.ASSET,
  setTabActive: (value: string) => {},
});
