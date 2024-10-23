import React from 'react';
import { FbSvg, MailSvg, YoutubeSvg } from '../../../../../icons';
import { useHTranslation } from '../../../../../lib/i18n';

import './connect-fina.scss';

const ConnectFina = React.memo(()=>{
  const { t } = useHTranslation('recruit');
  return (
    <div className="connect-fina__container">
      <div className="connect-fina__title">{t('home.connectFina')}</div>
      <div className="connect-fina__body">
        <div className="connect-fina__icon"><FbSvg /></div>
        <img src={'/assets/images/zalo.png'} className="connect-fina__zalo"/>
        <div className="connect-fina__icon"><MailSvg /></div>
        <div className="connect-fina__icon"><YoutubeSvg /></div>
      </div>
    </div>
  );
});

export default ConnectFina;
