import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { NumberUtils } from '@lib/utils/number';
import { FC } from 'react';

import './client-fund-nearest-price.module.scss';

interface ClientFundNearestPriceProps {
  navMin: number;
  navMax: number;
  currentNav: number;
}

interface ClientFundNearestPriceItemProps {
  label: string;
  value: number;
}

export const ClientFundNearestPrice: FC<ClientFundNearestPriceProps> = ({
  navMin,
  navMax,
  currentNav,
}) => {
  const { t } = useHTranslation('common');
  const configs: ClientFundNearestPriceItemProps[] = [
    {
      label: t('current NAV', { vn: 'NAV hiện tại' }),
      value: NumberUtils.toFixed(currentNav, 0),
    },
    {
      label: t('NAV min', { vn: 'NAV thấp nhất' }),
      value: NumberUtils.toFixed(navMin, 0),
    },
    {
      label: t('NAV max', { vn: 'NAV cao nhất' }),
      value: NumberUtils.toFixed(navMax, 0),
    },
  ];

  return (
    <div className="client-fund-nearest-price">
      {configs.map((config, index) => (
        <ClientFundNearestPriceItem
          key={`${config.value}-${index}`}
          {...{ ...config }}
        />
      ))}
    </div>
  );
};

const ClientFundNearestPriceItem: FC<ClientFundNearestPriceItemProps> = ({
  label,
  value,
}) => {
  return (
    <div className="client-fund-nearest-price__item">
      <div>{label}</div>
      <strong>{`${value ? `${ConverterUtils.formatNumber(value)} vnđ` : '_'} `}</strong>
    </div>
  );
};
