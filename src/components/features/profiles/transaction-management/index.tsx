import { DownOutlined, RightOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Collapse } from 'antd';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { isArray } from 'lodash';
import { fundActions } from './components/constants';
import { TransactionWithTable } from './components/transaction-with-table';
import { useHTranslation } from '../../../../lib/i18n';
import { SellFundAction } from '../../client/fund-certificate/sell-fund/sell-fund-action';

import './transaction-management.module.scss';

const { Panel } = Collapse;

export const TransactionManagementKey = {
  IN_PROCESS: 'inProcess',
  HISTORY_OF_TRANSACTION: 'historyOfTransaction',
  PERIODIC_INVESTMENT: 'periodicInvestment',
};

export const TransactionManagement = () => {
  const { t } = useHTranslation('admin');
  const { query } = useRouter();
  const [panelActiveKey, setPanelActiveKey] = useState<string>('');

  const defaultPanelActiveKey: any = useMemo(() => query?.p_ac ?? '', [query]);

  useEffect(() => setPanelActiveKey(defaultPanelActiveKey), [defaultPanelActiveKey]);

  const customExpandIcon = (props: any) => {
    if (props.isActive) {
      return <div className={'collapse-icon'}><DownOutlined /></div>;
    }
    return <div className={'collapse-icon'}><RightOutlined /></div>;
  };

  const collapsePanelHeader = (title: string | ReactNode) => {
    return (
      <div className={'collapse-item'}>
        <div className={'collapse-item__title'}>{title}</div>
      </div>
    );
  };

  return (
    <div className="transaction-management">
      <div className={'m-b-10'}>
        <SellFundAction text={<Button type={'primary'} icon={<ShoppingCartOutlined style={{ fontSize: '16px' }} />} >Tạo lệnh bán</Button>}/>
      </div>
      <Collapse onChange={key => setPanelActiveKey(isArray(key) ? key[0] : key)} activeKey={panelActiveKey} expandIcon={customExpandIcon} accordion={true} expandIconPosition={'right'}>
        <Panel header={collapsePanelHeader(t('Order to buy', { vn: 'Lệnh mua' }))} key={fundActions.BUY}>
          <TransactionWithTable type={fundActions.BUY} />
        </Panel>
        <Panel header={collapsePanelHeader(t('Order to sell', { vn: 'Lệnh bán' }))} key={fundActions.SELL}>
          <TransactionWithTable type={fundActions.SELL} />
        </Panel>
      </Collapse>
    </div>
  );
};

export default TransactionManagement;
