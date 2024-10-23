import { useHTranslation } from '@lib/i18n';
import { useState } from 'react';
import Buy from './components/buy';
import TimeLineContent from './components/time-line';

import './index.module.scss';

const BuyInsurance = (props) => {
  const { data } = props;
  const { t } = useHTranslation('common');
  const [isBuy, setIsBuy] = useState<boolean>(true);

  const nextToBuy = () => {
    setIsBuy(true);
  };

  return (
    <div className="buy-insurance-page">
      <div className="buy-insurance-page__banner">
        {data?.info?.image?.url && (
          <img src={data.info.image.url} alt="banner-insurance" />
        )}
      </div>

      {!isBuy ? (
        <div className="buy-insurance-page__content">
          <TimeLineContent data={data} nextToBuy={nextToBuy} />
        </div>
      ) : (
        <div className="buy-insurance-page__content">
          <Buy data={data} />
        </div>
      )}
    </div>
  );
};

export default BuyInsurance;
