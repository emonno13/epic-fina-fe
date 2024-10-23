import React from 'react';
import { EarthSvg, MailSvg, PhoneSvg, PinSvg } from '../../icons';
import { useHTranslation } from '../../../../../../lib/i18n';

import './location.module.scss';

const Location = React.memo(()=> {
  const { t } = useHTranslation('recruit');
  return (
    <div style={{ marginBottom: '100px' }}>
      <p className="location__title">{t('contact.companyName')}</p>
      <div className="location__item">
        <div style={{ marginRight: '0px' }}>
          <PinSvg />
        </div>
        <p className="location__text">2W, Ung Văn Khiêm, phường 25, quận Bình Thạnh, Thành phố Hồ Chí Minh</p>
      </div>
      <div className="location__item">
        <EarthSvg />
        <p className="location__text">fina.com.vn</p>
      </div>
      <div className="location__item">
        <PhoneSvg />
        <p className="location__text">08 5749 8668</p>
      </div>
      <div className="location__item">
        <MailSvg />
        <p className="location__text">support@fina.com.vn</p>
      </div>

      <iframe
        className="location__map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2009.9003052750525!2d106.72027582627229!3d10.80490249226443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528a0cfe81f65%3A0xf8a0195d7ec4b13b!2zMlcgVW5nIFbEg24gS2hpw6ptLCBQaMaw4budbmcgMjUsIELDrG5oIFRo4bqhbmgsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1648667516434!5m2!1svi!2s"
        referrerPolicy="no-referrer-when-downgrade"/>
    </div>
  );
});
export  default Location;
