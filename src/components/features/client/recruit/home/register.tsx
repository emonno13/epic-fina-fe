import React from 'react';
import { Button } from 'antd';
import { useHTranslation } from '../../../../../lib/i18n';

import './register.scss';

const Register = React.memo(()=>{
  const { t } = useHTranslation('recruit');
  return (
    <div className="register__container">
      <div className="register__body">
        <div className="register__title">{t('home.shinningTalent')}</div>
        <div className="register__content">{t('home.registerContent')}</div>
        <Button className="register__button">
          {t('home.registerNow')}
        </Button>
        <img src={'/assets/images/register_triangle.png'} className="register__image"/>
      </div>
    </div>
  );
});
export default Register;
