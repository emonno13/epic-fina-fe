import React from 'react';
import { MAKE_MONEY_PROCESS } from './constants';
import TextWithUnderline from './components/text-with-underline';
import RaiseMoneySvg from './icons/raise-money';
import { useHTranslation } from '../../../../lib/i18n';

import './css/make-money-process.module.scss';

const MakeMoneyProcess = React.memo(() => {
  const { t } = useHTranslation('common');
  return (
    <div className="make-money" id="general-condition">
      <div>
        <TextWithUnderline title={t('make-money', { vn: 'Quy trình kiếm tiền cùng fina agent' })} />
        <div className="make-money__content">
          {MAKE_MONEY_PROCESS.map((value, index) => {
            return (
              <div className="make-money-item" key={index.toString()}>
                <div>
                  {value?.icon}
                </div>
                <div className="make-money-item__body">
                  <h2 className="make-money-item__title">
                    {value?.title}
                  </h2>
                  <p className="make-money-item__content">
                    {value?.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="make-money__image">
        <RaiseMoneySvg />
      </div>
    </div>
  );
});
export default MakeMoneyProcess;
