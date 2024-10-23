import React from 'react';
import { SwitchScreenLinkPartner } from './components/switch-screen-link-partner';
import { LinkWithPartnerProvider } from './context/provider';

import './link-with-partner.module.scss';

export const LinkWithPartner = () => {
  return (
    <LinkWithPartnerProvider>
      <SwitchScreenLinkPartner />
    </LinkWithPartnerProvider>
  );
};
export default LinkWithPartner;




