import React from 'react';
import { MobileContext, MobileContextType } from '../contexts/mobile-context';

export function useMobile(): MobileContextType {
  const context = React.useContext(MobileContext);
  if (context === undefined) {
    throw new Error('useMobile must be used within an MobileContext');
  }
  return context;
}

export function useLoginDrawerVisible(): boolean {
  const context = useMobile();
  return context.loginDrawerVisible || false;
}
