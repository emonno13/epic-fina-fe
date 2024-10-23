import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { HTable } from '@schema-form/features';
import HFeature from '@schema-form/features/feature';
import HSearchForm from '@schema-form/features/search-form';
import { createSchemaItem } from '@schema-form/h-types';
import { PRODUCT_TYPES } from 'types/organization';
import {
  TRANSACTION_FUNDS_ACTION_MAPPING,
  TRANSACTION_FUNDS_STATUS,
  TRANSATION_FUNDS_STATUS_OPTIONS,
} from './constans';
import ExportButtonTransactionFund from './export-trasaction-fund';
import { TransactionFundsTableSchema } from './transaction-funds-table-schema';

const ManagementFundTransaction = () => {
  return (
    <HFeature
      {...{
        featureId: 'transaction-funds',
        nodeName: 'transactions',
      }}
    >
      <HSearchForm
        {...{
          withRelations: ['product', 'productDetail', 'customer'],
          advancedSchema: AdvancedSchemaTransactionFund,
          hiddenValues: {
            filter: {
              where: {
                type: PRODUCT_TYPES.funds,
                status: { nin: [TRANSACTION_FUNDS_STATUS.PENDING] },
              },
            },
          },
          resetIfSuccess: false,
          renderRightSuffix: <ExportButtonTransactionFund />,
        }}
      />

      <HTable
        scroll={{ x: 'max-content' }}
        schema={TransactionFundsTableSchema}
      />
    </HFeature>
  );
};
export default ManagementFundTransaction;

export const AdvancedSchemaTransactionFund = () => {
  const { t } = useHTranslation('admin');
  return [
    createSchemaItem({
      Component: HSelect,
      name: 'action',
      colProps: { xs: 24, sm: 12, md: 6 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      componentProps: {
        options: Object.values(TRANSACTION_FUNDS_ACTION_MAPPING),
        placeholder: t('Select type of transaction', {
          vn: 'Chọn loại giao dịch',
        }),
        allowClear: true,
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'status',
      colProps: { xs: 24, sm: 12, md: 6 },
      componentProps: {
        options: TRANSATION_FUNDS_STATUS_OPTIONS,
        placeholder: t('Select status of transaction', {
          vn: 'Chọn trạng thái giao dịch',
        }),
        allowClear: true,
      },
    }),
  ];
};
