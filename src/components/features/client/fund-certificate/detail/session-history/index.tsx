import { ConverterUtils } from '@lib/converter';
import { NumberUtils } from '@lib/utils/number';
import { FC } from 'react';

import './session-history.module.scss';

interface PriceUpdateItem {
  nav: number;
  navDate: string;
}

interface ClientFundSessionHistoryProps {
  priceUpdateHistories: PriceUpdateItem[];
}

export const ClientFundSessionHistory: FC<ClientFundSessionHistoryProps> = ({
  priceUpdateHistories,
}) => {
  return (
    <div className="client-fund-session-history">
      {priceUpdateHistories.map((item) => (
        <div
          key={`${item.nav}-${item.navDate}`}
          className="session-history-item"
        >
          <div className="session-history-item__children">
            <span>Tại ngày</span>
            <div>{ConverterUtils.dateConverter(item.navDate)}</div>
          </div>

          <div className="session-history-item__children">
            <span>NAV/CCQ</span>
            <div>{`${ConverterUtils.formatNumber(NumberUtils.toFixed(item.nav, 0))} vnđ`}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientFundSessionHistory;
