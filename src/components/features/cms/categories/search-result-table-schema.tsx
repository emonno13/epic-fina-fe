import { TableUtils } from '@lib/table-utils';
import { useTranslation } from 'next-i18next';

export const PositionTableSchema = () => {
  const { t } = useTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Type'),
      dataIndex: 'type',
      sortable: true,
      key: 'type',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Category'),
      dataIndex: 'name',
      sortable: true,
      key: 'name',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      sortable: true,
      key: 'status',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Description'),
      dataIndex: 'description',
      sortable: true,
      key: 'description',
    }),
  ];
};
