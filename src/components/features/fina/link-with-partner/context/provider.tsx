import React, { ReactNode, useState } from 'react';
import { LinkWithPartnerContext } from './context';
import { partnerScreen, vinaCapitalTabPaneKeys } from '../constants';

export const LinkWithPartnerProvider = ({
  children,
}: {children: ReactNode}) => {
  const [screen, setScreen] = useState<string>(partnerScreen.LIST);
  const [tabActive, setTabActive] = useState<string>(vinaCapitalTabPaneKeys.ASSET);
  return (
    <LinkWithPartnerContext.Provider value={{
      screen, 
      setScreen,
      tabActive, 
      setTabActive,
    }}>
      {children}
    </LinkWithPartnerContext.Provider>
  );
};
