import React, { ReactNode, useState } from 'react';
import { VinaCapitalManagementContext } from './context';
import { vinaCapitalTabPaneKeys } from '../../constants';

export const LinkWithPartnerProvider = ({
  children,
}: {children: ReactNode}) => {
  const [tabActive, setTabActive] = useState<string>(vinaCapitalTabPaneKeys.ASSET);
  return (
    <VinaCapitalManagementContext.Provider value={{
      tabActive,
      setTabActive,
    }}>
      {children}
    </VinaCapitalManagementContext.Provider>
  );
};
