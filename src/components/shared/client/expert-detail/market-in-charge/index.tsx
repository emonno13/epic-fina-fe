import { useHTranslation } from '@lib/i18n';
import { ExpertDetailpinFillIcon } from '../icons/expert-detail.pin-fill-icon';

import './market-in-charge.module.scss';

const ExpertDetailMarketInCharge = ({ data }) => {
  const { t } = useHTranslation('common');
  const { advancedInformation } = data || {};
  const marketInChartData = advancedInformation?.market || [];
  return (
    <div className="client-expert-detail-container">
      <div className="expert-detail-market-in-charge">
        <div className="expert-detail-market-in-charge-title">
          <ExpertDetailpinFillIcon />
          <span>{t('Market in charge', { vn: 'Thị trường phụ trách' })}</span>
        </div>
        <div className="expert-detail-market-in-charge-locations">
          {marketInChartData.map((location, index) => (
            <div
              key={`market-in-charge-${index}`}
              className="expert-detail-market-in-charge-location"
            >
              {location}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertDetailMarketInCharge;
