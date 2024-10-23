import { TableUtils } from '@lib/table-utils';
import { useTranslation } from 'next-i18next';

export const NewsModuleTableSchema = () => {
  const { t } = useTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Category Name'),
      dataIndex: 'name',
      sortable: true,
      key: 'name',
      render: (text) => <a>{text}</a>,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      sortable: true,
      key: 'status',
      render: (status) => <a>{status}</a>,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Description'),
      dataIndex: 'description',
      sortable: true,
      key: 'description',
      render: (text) => <a>{text}</a>,
    }),
    TableUtils.createEditColumn('Edit'),
  ];
};
