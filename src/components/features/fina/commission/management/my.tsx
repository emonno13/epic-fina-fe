import { useState } from 'react';
import moment from 'moment';

import { Alert } from 'antd';
import { MyCommissionSearchResultTableSchema } from './my-commission-search-result-table-schema';
import { LoanProductMyCommissionDetailView } from './loan-product/my-commission/detail-schema-form';
import { CommissionAdvanceFormSchema } from './commission-advance-form-schema';
import { useHTranslation } from '../../../../../lib/i18n';
import { HFeature, HTable } from '../../../../../schema-form/features';
import { HSearchFormWithCreateButton } from '../../../../../schema-form/features/search-form';
import { FormatterUtils } from '../../../../../lib/formatter';
import { FormUtils } from '../../../../../schema-form/utils/form-utils';
import { useCurrentUser } from '../../../../../lib/providers/auth';
import { Link } from '../../../../shared/link';
import { USER_TYPES } from '../../../../shared/user/constants';

import './index.scss';

const CommissionTabViewer = ({ type = '', featureId = '', documentIdName = '', ...props }) => {
  const { t } = useHTranslation('admin-common');
  const { children } = props;
  const [totalNotForControl, setTotalNotForControl] = useState(0);
  const [totalForControl, setTotalForControl] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const currentUser = useCurrentUser();

  const onGotSearchResult = (searchResult) => {
    const { metadata } = searchResult;
    setTotalNotForControl(metadata?.totalNotForControl || 0);
    setTotalForControl(metadata?.totalForControl || 0);
    setTotalPaid(metadata?.totalPaid || 0);
  };

  const handleDataReadyToSubmit = (data) => {
    if (data?.from) {
      data.createdAt = FormUtils.getQueryBetweenDays(data?.from, data?.to || moment().add(1, 'days').format('YYYY/MM/DD'));
      delete data.from;
      delete data.to;
    }
  };

  const relations = [
    {
      relation: 'user',
      scope: {
        include: [
          { relation: 'org' },
        ],
      },
    },
    'transactionDetail',
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
  ];

  return (
    <>
      {currentUser?.type === USER_TYPES.COLLABORATOR && !currentUser?.hasCollaboratorContract && (
        <Alert {...{
          message: 'Vui lòng ký hợp đồng cộng tác viên để nhận được thanh toán hoa hồng từ FINA. Link ký hợp đồng >>> ',
          type: 'warning',
          showIcon: true,
          style: { marginBottom: '1rem' },
          action: <Link href={'/admin/profiles/account-identifier'}>{t('Hợp đồng CTV')}</Link>,
        }}/>
      )}

      <HFeature
        {...{
          featureId: featureId || 'commissions',
          documentIdName: documentIdName || 'commissionId',
          nodeName: 'commissions',
          documentRelations: relations,
        }}>
        <HSearchFormWithCreateButton {...{
          withRelations: relations,
          hiddenFields: {
            type: 'spend',
            userId: currentUser.id,
          },
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

        <HTable schema={MyCommissionSearchResultTableSchema}/>
      </HFeature>
    </>
  );
};

export default () => {
  return (
    <CommissionTabViewer type={'all'} featureId={'myCommission'} documentIdName={'myCommissionId'}>
      <LoanProductMyCommissionDetailView />
    </CommissionTabViewer>
  );
};
