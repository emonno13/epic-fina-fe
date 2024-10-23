import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';

export const SurveyResultsTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Customer', { vn: 'Khách hàng', en: 'Customer' }),
      render: (record) => {
        const { customer, customerInfo } = record;
        if (customerInfo) {
          return customerInfo.fullName;
        }
        if (customer) {
          return `${customer.lastName} ${customer.firstName}`;
        }
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Email', { vn: 'Email', en: 'Email' }),
      render: (record) => {
        const { customer, customerInfo } = record;
        if (customerInfo) {
          return customerInfo.email;
        }
        if (customer) {
          return customer.emails?.[0]?.email;
        }
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Phone', { vn: 'Số điện thoại', en: 'Phone' }),
      render: (record) => {
        const { customer, customerInfo } = record;
        if (customerInfo) {
          return customerInfo.tel;
        }
        if (customer) {
          return customer.tels?.[0]?.tel;
        }
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Created at', { vn: 'Thời gian khảo sát', en: 'Created at' }),
      dataIndex: 'createdAt',
      render: ConverterUtils.fullDatetimeConverter,
    }),
    TableUtils.createEditColumn(t('Action')),
  ];
};
