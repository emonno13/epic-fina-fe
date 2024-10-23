import { ConvertUtils } from '@lib/utils/convert';
import { TableUtils } from '../../../../lib/table-utils';

export const TableSchema = () => {
  return [
    TableUtils.createTableColumnConfig({
      title: 'Code',
      dataIndex: 'code',
      sortable: true,
      key: 'code',
      render: (text) => ConvertUtils.replaceWhiteSpaceAndUpperString(text),
    }),

    TableUtils.createTableColumnConfig({
      title: 'Name',
      dataIndex: 'name',
      sortable: true,
      key: 'name',
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
