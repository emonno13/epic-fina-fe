import React from 'react';
import { DoubleQuotesSvg } from '../../../../../icons';
import { useHTranslation } from '../../../../../lib/i18n';

import './citation.scss';

const Citation = React.memo(()=> {
  const { t } = useHTranslation('recruit');
  return (
    <div className="citation__container">
      <div className="citation__body">
        <div className="citation__first-quote"><DoubleQuotesSvg /></div>
        <div className="citation__content">{t('home.citationContent')}</div>
        <div className="citation__name">{t('home.citationName')}</div>
        <div className="citation__position">{t('home.citationPosition')}</div>
        <div className="citation__second-quote"><DoubleQuotesSvg /></div>
      </div>
      <img src={'/assets/images/citation_alex.png'} className={'citation__image'}/>
    </div>
  );
});
export default Citation;
