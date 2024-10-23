import { useState } from 'react';
import { Tabs } from 'antd';
import moment from 'moment';

import { CommissionSpendSearchResultTableSchema } from './commission-spend-search-result-table-schema';
import { LoanProductCommissionSpendDetailForm } from './loan-product/commission-spend/detail-schema-form';
import { CommissionAdvanceFormSchema } from './commission-advance-form-schema';
import { useHTranslation } from '../../../../../lib/i18n';
import { HFeature, HTable } from '../../../../../schema-form/features';
import { HSearchFormWithCreateButton } from '../../../../../schema-form/features/search-form';
import { FormatterUtils } from '../../../../../lib/formatter';
import { FormUtils } from '../../../../../schema-form/utils/form-utils';

import './index.scss';

const { TabPane } = Tabs;

const CommissionTabViewer = ({ type = '', featureId = '', documentIdName = '', ...props }) => {
  const { t } = useHTranslation('admin-common');
  const { children } = props;
  const [totalForControl, setTotalForControl] = useState(0);
  const [totalNotForControl, setTotalNotForControl] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);

  const onGotSearchResult = (searchResult) => {
    const { metadata } = searchResult;

    setTotalForControl(metadata?.totalForControl || 0);
    setTotalNotForControl(metadata?.totalNotForControl || 0);
    setTotalPaid(metadata?.totalPaid || 0);
  };

  const handleDataReadyToSubmit = (data) => {
    if (data?.from) {
      data.createdAt = FormUtils.getQueryBetweenDays(data?.from, data?.to || moment().add(1, 'days').format('YYYY/MM/DD'));
      delete data.from;
      delete data.to;
    }
  };

  const hiddenFields: any = {
    type: 'spend',
  };

  if (type !== 'all') {
    hiddenFields.roleSpecify = type;
  }

  return (
    <HFeature
      {...{
        featureId: featureId || 'commissions',
        documentIdName: documentIdName || 'commissionId',
        nodeName: 'commissions',
        documentRelations: [
          'commissionReceive',
          'transactionDetail',
          {
            relation: 'user',
            scope: {
              include: [{ relation: 'org' }],
            },
          },
          {
            relation: 'transaction',
            scope: {
              include: [
                { relation: 'partner' },
                {
                  relation: 'product',
                  scope: {
                    include: [{ relation: 'org' }],
                  },
                },
              ],
            },
          },
        ],
      }}>
      <HSearchFormWithCreateButton {...{
        withRelations: [
          'commissionReceive',
          'transactionDetail',
          {
            relation: 'user',
            scope: {
              include: [{ relation: 'org' }],
            },
          },
          {
            relation: 'transaction',
            scope: {
              include: [
                { relation: 'partner' },
                {
                  relation: 'product',
                  scope: {
                    include: [{ relation: 'org' }],
                  },
                },
              ],
            },
          },
        ],
        hiddenFields,
        hiddenCreateButton: true,
        advancedSchema: () => CommissionAdvanceFormSchema({ type, applyFor: 'spend' }),
        onDataReadyToSubmit: handleDataReadyToSubmit,
        onGotSuccess: onGotSearchResult,
        resetIfSuccess: false,
      }}/>

      <ul className={'commission-summary'}>
        <li className={'commission-summary__item'}>
          <h2 className={'commission-summary__title commission-summary__title--not-for-control'}>{t('Chưa đối soát')}</h2>
          <p className={'commission-summary__amount'}><strong>{FormatterUtils.formatAmount(totalNotForControl, 'VND')}</strong></p>
        </li>
        <li className={'commission-summary__item'}>
          <h2 className={'commission-summary__title commission-summary__title--for-control'}>{t('Đã đối soát')}</h2>
          <p className={'commission-summary__amount'}><strong>{FormatterUtils.formatAmount(totalForControl, 'VND')}</strong></p>
        </li>
        <li className={'commission-summary__item'}>
          <h2 className={'commission-summary__title commission-summary__title--paid'}>{t('Đã thanh toán')}</h2>
          <p className={'commission-summary__amount'}><strong>{FormatterUtils.formatAmount(totalPaid, 'VND')}</strong></p>
        </li>
      </ul>

      {children}

      <HTable schema={CommissionSpendSearchResultTableSchema}/>
    </HFeature>
  );
};

export default () => {
  const { t } = useHTranslation('admin-common');
  return (
    <Tabs>
      <TabPane tab={t('Tất cả')} key={'commission_all'}>
        <CommissionTabViewer type={'all'} featureId={'commissionSpendAll'} documentIdName={'allId'}>
          <LoanProductCommissionSpendDetailForm />
        </CommissionTabViewer>
      </TabPane>
      <TabPane tab={t('Cá nhân')} key={'commission_personal'}>
        <CommissionTabViewer type={'personal'} featureId={'commissionSpendPersonal'} documentIdName={'personalId'}>
          <LoanProductCommissionSpendDetailForm />
        </CommissionTabViewer>
      </TabPane>
      <TabPane tab={t('Đại lý')} key={'commission_agent'}>
        <CommissionTabViewer type={'agent'} featureId={'commissionSpendAgent'} documentIdName={'agentId'}>
          <LoanProductCommissionSpendDetailForm />
        </CommissionTabViewer>
      </TabPane>
    </Tabs>
  );
};
