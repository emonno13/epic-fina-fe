import { TableUtils } from '@lib/table-utils';
import { useHTranslation } from '../../../../lib/i18n';

export const LocationTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Parent Name', { vn: 'Tên trực thuộc' }),
      dataIndex: 'parent',
      sortable: true,
      key: 'parent',
      render: (parent) => <a>{parent?.name}</a>,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Position Name', { vn: 'Tên vị trí' }),
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
      render: (status) => <a>{t(status)}</a>,
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
