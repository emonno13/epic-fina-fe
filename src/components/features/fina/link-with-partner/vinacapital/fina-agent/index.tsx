import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { HFeature, HTable } from '@schema-form/features';
import HSearchForm from '@schema-form/features/search-form';
import { createSchemaItem } from '@schema-form/h-types';
import {
  TRANSACTIONS_PARTNER_LOGS_ACTION,
  TRANSACTIONS_PARTNER_LOGS_OPTIONS,
  TRANSACTIONS_PARTNER_LOGS_STATUS,
  TRANSACTIONS_PARTNER_LOGS_TYPE,
} from 'constants/crm/transactions-partner-logs';
import { TRANSACTION_FUNDS_ACTION_MAPPING } from '../transaction-funds/constans';
import ExportButtonTransactionFund from '../transaction-funds/export-trasaction-fund';
import { FinaAgentTableSchema } from './fina-agent-table';

const TransactionFundFinaAgent = () => {
  const { t } = useHTranslation('admin');
  const filterQuery = {
    filter: {
      where: {
        action: {
          inq: [
            TRANSACTIONS_PARTNER_LOGS_ACTION.BUY,
            TRANSACTIONS_PARTNER_LOGS_ACTION.SELL,
          ],
        },
        status: { neq: TRANSACTIONS_PARTNER_LOGS_STATUS.ERROR },
        type: TRANSACTIONS_PARTNER_LOGS_TYPE.VINA_CAPITAL,
      },
    },
  };

  return (
    <HFeature documentRelations={['user']} featureId="fina-agent">
      <HSearchForm
        placeholder={t(
          "Enter input about: Code, Order Code, Name's Customer, Phone's Customer, Email's Customer",
          {
            vn: 'Nhập thông tin về: Mã, Mã GD, tên KH, SDT KH, email KH',
          },
        )}
        endpoint={endpoints.endpointWithApiDomain(
          '/transactions-partner-logs/fund-agent',
        )}
        resetIfSuccess={false}
        hiddenValues={filterQuery}
        annotate={true}
        withRelations={['user']}
        advancedSchema={AdvancedSearchSchema}
        onDataReadyToSubmit={(query) => {
          query.action ||= {
            inq: [
              TRANSACTIONS_PARTNER_LOGS_ACTION.BUY,
              TRANSACTIONS_PARTNER_LOGS_ACTION.SELL,
            ],
          };
          query.status ||= { neq: TRANSACTIONS_PARTNER_LOGS_STATUS.ERROR };
          return query;
        }}
        renderRightSuffix={<ExportButtonTransactionFund />}
      />
      <HTable scroll={{ x: 'max-content' }} schema={FinaAgentTableSchema} />
    </HFeature>
  );
};

export default TransactionFundFinaAgent;

const AdvancedSearchSchema = () => {
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
        options: TRANSACTIONS_PARTNER_LOGS_OPTIONS,
        placeholder: t('Select status of transaction', {
          vn: 'Chọn trạng thái giao dịch',
        }),
        allowClear: true,
      },
    }),
  ];
};
