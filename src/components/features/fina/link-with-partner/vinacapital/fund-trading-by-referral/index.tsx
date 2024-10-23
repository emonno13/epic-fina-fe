import { TRANSACTION_TYPE } from '@components/features/fina/transaction/constant';
import { HSelect } from '@components/shared/common-form-elements/select';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser } from '@lib/providers/auth';
import { HFeature, HTable } from '@schema-form/features';
import HSearchForm from '@schema-form/features/search-form';
import { createSchemaItem } from '@schema-form/h-types';
import { AdvancedSchemaTransactionFund } from '../transaction-funds';
import { TRANSACTION_FUNDS_STATUS } from '../transaction-funds/constans';
import ExportButtonTransactionFund from '../transaction-funds/export-trasaction-fund';
import { TransactionFundsTableSchema } from '../transaction-funds/transaction-funds-table-schema';

const FundTradingByReferral = () => {
  const { t } = useHTranslation('admin');
  const currentUser = useCurrentUser();

  return (
    <HFeature
      {...{
        featureId: 'transaction-by-referral',
      }}
    >
      <HSearchForm
        {...{
          withRelations: ['product', 'productDetail', 'customer'],
          advancedSchema: () => [
            ...AdvancedSchemaTransactionFund(),
            createSchemaItem({
              Component: HSelect,
              name: 'customerId',
              colProps: { xs: 24, sm: 12, md: 6 },
              componentProps: {
                endpoint: 'users/referralee/suggestion',
                placeholder: t('Select user', { vn: 'Chọn người dùng' }),
                allowClear: true,
                showSearch: true,
                resetIfSuccess: false,
                optionsConverter: (value) => ({
                  ...value,
                  label: ConverterUtils.getFullNameUser(value),
                }),
              },
            }),
          ],
          resetIfSuccess: false,
          endpoint: endpoints.endpointWithApiDomain(
            '/transactions/by-referral',
          ),
          hiddenValues: {
            filter: {
              where: {
                type: TRANSACTION_TYPE.FUNDS,
                status: { nin: [TRANSACTION_FUNDS_STATUS.PENDING] },
              },
            },
          },
          renderRightSuffix: (
            <ExportButtonTransactionFund
              downloadUrl={`${process.env.NEXT_PUBLIC_STATIC_CDN}/transactions/export-fund-referral/${currentUser.id}`}
            />
          ),
        }}
      />

      <HTable
        scroll={{ x: 'max-content' }}
        schema={TransactionFundsTableSchema}
      />
    </HFeature>
  );
};

export default FundTradingByReferral;
