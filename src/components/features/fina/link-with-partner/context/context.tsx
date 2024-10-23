import { createContext } from 'react';
import { partnerScreen, vinaCapitalTabPaneKeys } from '../constants';

export interface ILinkWithPartnerContext {
  screen: string,
  setScreen: (value: string) => void,
  tabActive: string, 
  setTabActive: (value: string) => void
}

export const LinkWithPartnerContext = createContext<ILinkWithPartnerContext>({
  screen: partnerScreen.LIST,
  setScreen: (value: string) => {},
  tabActive: vinaCapitalTabPaneKeys.ASSET, 
  setTabActive: (value: string) => {},
});
