import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { Tag } from 'antd';
import { MAPPING_TRANSACTIONS_PARTNER_LOGS_STATUS } from 'constants/crm/transactions-partner-logs';
import { TRANSACTION_FUNDS_ACTION_MAPPING } from '../transaction-funds/constans';

export const FinaAgentTableSchema = () => {
  const { t } = useHTranslation('admin');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'code',
      sortable: true,
      key: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'orderCode',
      sortable: true,
      key: 'orderCode',
    }),
    TableUtils.createTableColumnConfig({
      title: 'Người mua',
      dataIndex: 'user',
      key: 'user',
      render: (user) => ConverterUtils.getFullNameUser(user),
    }),
    TableUtils.createTableColumnConfig({
      title: 'Loại giao dịch',
      dataIndex: 'action',
      key: 'action',
      render: (action) => (
        <Tag color={TRANSACTION_FUNDS_ACTION_MAPPING[action]?.color}>
          {TRANSACTION_FUNDS_ACTION_MAPPING[action]?.label}
        </Tag>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: 'Số tiền',
      render: (record) => {
        return `${ConverterUtils.formatNumber(record?.metaData?.amount || '')} VNĐ`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      render: (status) => (
        <Tag color={MAPPING_TRANSACTIONS_PARTNER_LOGS_STATUS[status]?.color}>
          {MAPPING_TRANSACTIONS_PARTNER_LOGS_STATUS[status]?.label}
        </Tag>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: 'Thời gian đặt lệnh',
      dataIndex: ['metaData', 'tradingTime'],
      key: 'metaData.tradingTime',
      sortable: true,
      render: (tradingTime) =>
        ConverterUtils.fullDatetimeConverter(tradingTime),
    }),
  ];
};
