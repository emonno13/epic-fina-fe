import React, { useContext } from 'react';
import { LinkWithPartnerItem } from './link-with-partner-item';
import { partnerScreen } from '../constants';
import { LinkWithPartnerContext } from '../context/context';
import { useHTranslation } from '../../../../../lib/i18n';

export const LinkWithPartnerList = () => {
  const { t } = useHTranslation('admin');
  const { setScreen } = useContext(LinkWithPartnerContext);
  return (
    <div className="link-with-partner">
      <LinkWithPartnerItem
        onClick={() => {setScreen(partnerScreen.VINA_CAPITAL);}} 
        urlLogo="/assets/images/vina_capital_logo.png" 
        name="VinaCapital" 
        description={t('VinaCapital - providing CCQ investment solutions', {
          vn: 'VinaCapital - cung cấp các giải pháp đầu tư CCQ',
        })}
      />
    </div>
  );
};
