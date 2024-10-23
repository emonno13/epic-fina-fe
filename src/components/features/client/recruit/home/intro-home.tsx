import React from 'react';
import { Button } from 'antd';
import { useHTranslation } from '../../../../../lib/i18n';

import './intro-home.scss';

const IntroHome = React.memo(()=> {
  const { t } = useHTranslation('recruit');
  return (
    <div className="intro-home__header">
      <div className="intro-home__text">
        <div className="intro-home__text__title">{t('home.reachCareer')}</div>
        <div className="intro-home__text__content">{t('home.findSpringboard')}</div>
        <Button className={'intro-home__button'}>
          {t('home.joinUs')}
        </Button>
      </div>
      <img src={'/assets/images/recruitTriangle.png'} className={'intro-home__triangle'}/>

    </div>
  );
});
export default IntroHome;
