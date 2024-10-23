import { useHTranslation } from '@lib/i18n';
import { Progress, Rate } from 'antd';

import './expert-detail-overall-review.module.scss';

const NumberOfRateDisplay = ({ rate, count, total }) => {
  const { t } = useHTranslation('common');
  return (
    <div className="ui-number-of-rate">
      <span className="ui-number-of-rate__star">
        {rate} {t('star', { vn: 'sao' })}
      </span>
      <Progress
        {...{
          percent: (count * 100) / total,
          strokeColor: '#064DD6',
          showInfo: false,
        }}
      />
      <span className="ui-number-of-rate__count">{count}</span>
    </div>
  );
};

const RateStatistics = ({ RatesData }) => {
  const { total, data } = RatesData;
  return (
    <div className="rate-statistics">
      {data?.map((item, index) => (
        <NumberOfRateDisplay
          key={`number-of-rate-${index}`}
          {...{
            ...item,
            total,
          }}
        />
      ))}
    </div>
  );
};

const AveragedRate = ({ RatesData }) => {
  const { t } = useHTranslation('common');
  const { total, rate } = RatesData;
  if (rate === undefined || rate === null) {
    return <></>;
  }
  return (
    <div className="averaged-rate-container">
      <h2 className="rate">{rate}</h2>
      <Rate
        {...{
          disabled: true,
          count: 5,
          value: rate,
          allowHalf: true,
        }}
      />
      <p className="number-of-rates">
        {total} {t('Reviews', { vn: 'Đánh giá' })}
      </p>
    </div>
  );
};

const ExpertDetailOvertallReviewSummary = ({ RatesData }) => {
  return (
    <div className="expert-detail-overall-review-summary">
      <AveragedRate {...{ RatesData }} />
      <RateStatistics {...{ RatesData }} />
    </div>
  );
};

export default ExpertDetailOvertallReviewSummary;
