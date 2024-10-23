import React from 'react';
import { Tabs } from 'antd';
import { TransactionTableSchema } from './transaction.table-schema';
import { ViewTransaction } from './view/view-transaction.-schema';
import { TRANSACTION_TYPE } from './constant';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HSearchForm } from '../../../../schema-form/features/search-form';
import { HDocumentDrawerPanel } from '../../../../schema-form/features/panels';
import { useHTranslation } from '../../../../lib/i18n';

import './trasaction.module.scss';
import './view/view-transaction.scss';

const { TabPane } = Tabs;
export const TransactionManager = ({ type, featureId, ...props }) => {
  return (
    <HFeature
      {...{
        featureId: featureId || 'transactions',
        nodeName: 'transactions',
        documentRelations: ['customer', 'product', 'transactionDetails', 'staff', 'partner'],
      }}>
      <HSearchForm withRelations={['customer', 'product', 'transactionDetails', 'staff', 'partner']} hiddenFields={{ type }}/>
      <HDocumentDrawerPanel destroyOnClose={true} footer={null}>
        <ViewTransaction {...{ type }}/>
      </HDocumentDrawerPanel>
      <HTable className="trasaction-table" schema={TransactionTableSchema}/>
    </HFeature>
  );
};

export default () => {
  const { t } = useHTranslation('admin-common');
  return (
    <Tabs>
      <TabPane tab={t('loan_products')} key={TRANSACTION_TYPE.LOAN}>
        <TransactionManager type={TRANSACTION_TYPE.LOAN} featureId={TRANSACTION_TYPE.LOAN}/>
      </TabPane>
      <TabPane tab={t('insurance_products')} key={TRANSACTION_TYPE.INSURANCE}>
        <TransactionManager type={TRANSACTION_TYPE.INSURANCE} featureId={TRANSACTION_TYPE.INSURANCE}/>
      </TabPane>
    </Tabs>
  );
};