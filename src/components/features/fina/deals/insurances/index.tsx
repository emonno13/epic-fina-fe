import { DownloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';

import { useHaveDownloadPermission } from 'dynamic-configuration/hooks';
import { useCurrentUser } from '../../../../../lib/providers/auth';
import { HFeature, HTable } from '../../../../../schema-form/features';
import { HDocumentDrawerPanel } from '../../../../../schema-form/features/panels';
import { HSearchFormWithCreateButton } from '../../../../../schema-form/features/search-form';
import { HButton, HButtonProps } from '../../../../shared/common-form-elements/h-confirmation-button';
import { TRANSACTION_TYPE } from '../../transaction/constant';
import { TransactionTableSchema } from '../../transaction/transaction.table-schema';
import { ViewTransaction } from '../../transaction/view/view-transaction.-schema';

export const ExportInsurancesButton = memo((props: HButtonProps) => {
  const { t } = useTranslation('common');
  const currentUser = useCurrentUser();
  const haveDownloadPermission = useHaveDownloadPermission();

  const handleExportInsurances = () => {
    (window as any).open(`${process.env.NEXT_PUBLIC_STATIC_CDN}/transactions/export/${currentUser.id}`);
  };

  if (!haveDownloadPermission) {
    return <></>;
  }

  return (
    <HButton {...{
      ...props,
      size: 'large',
      shape: 'round',
      className: 'control-btn m-l-10',
      onClick: handleExportInsurances,
      icon: <DownloadOutlined/>,
    }}>
      {t('Export')}
    </HButton>
  );
});

export const TransactionDealInsurancesManagement = () => {
  return (
    <HFeature
      {...{
        featureId: 'deal-insurances',
        nodeName: 'transactions',
        documentRelations: ['customer', 'product', 'transactionDetails', 'staff', 'company'],
      }}>
      <HSearchFormWithCreateButton
        withRelations={['customer', 'product', 'transactionDetails', 'staff', 'company']}
        hiddenFields={{ type: TRANSACTION_TYPE.INSURANCE }}
        hiddenValues={{ filter: { order: ['createdAt DESC'] } }}
        renderRightSuffix={<ExportInsurancesButton />}
      />
      <HDocumentDrawerPanel footer={null}>
        <ViewTransaction {...{ type: TRANSACTION_TYPE.INSURANCE }}/>
      </HDocumentDrawerPanel>
      <HTable scroll={{ x: 'max-content' }} className="trasaction-table" schema={TransactionTableSchema}/>
    </HFeature>
  );
};

export default TransactionDealInsurancesManagement;
