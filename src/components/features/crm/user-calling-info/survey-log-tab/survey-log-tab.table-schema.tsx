import { ConverterUtils } from '@lib/converter';
import { TableUtils } from '@lib/table-utils';

export const SurveyLogTableSchema = () => {
  return [
    TableUtils.createTableColumnConfig({
      title: 'Khách hàng',
      dataIndex: 'customer',
      render: (customer) => ConverterUtils.getFullNameUser(customer),
    }),
    TableUtils.createTableColumnConfig({
      title: 'Thời gian khảo sát',
      dataIndex: 'createdAt',
      render: ConverterUtils.fullDatetimeConverter,
    }),
  ];
};
