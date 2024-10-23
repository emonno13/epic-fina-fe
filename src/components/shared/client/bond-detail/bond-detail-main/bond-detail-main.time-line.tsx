import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { BondInformationItem } from '../common/bond-information-item';

import './bond-detail-main.time-line.module.scss';

const ClientBondDetailTimeLineItem = (props) => {
  const { t } = useHTranslation('common');
  const { bondDetail = {} } = props;
  const { info = {} } = bondDetail;
  const { maturityDate, releaseDate } = info;

  const bondTimeLineItems = [
    {
      label: t('Release date', { vn: 'Ngày phát hành' }),
      content: `${ConverterUtils.dateConverterToString(releaseDate)}`,
    },
    {
      label: t('Maturity Date', {
        vn: 'Ngày trả lãi thứ cuối cùng và là ngày đáo hạn',
      }),
      content: `${ConverterUtils.dateConverterToString(maturityDate)}`,
    },
  ];

  return (
    <div className={'bond-detail--timeline'}>
      <h2 className={'bond-detail--timeline__name'}>
        {t('Interest payment deadlines', { vn: 'Các mốc thời gian trả lãi' })}
      </h2>

      <div className={'bond-detail--timeline__content'}>
        {bondTimeLineItems.map((item, index) => (
          <BondInformationItem
            key={`bond-detail-time-line-item-${index}`}
            label={item.label}
            content={item.content}
            type={'down-line'}
            labelClassName={'bond-detail--timeline__content--label-item'}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientBondDetailTimeLineItem;
