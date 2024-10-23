import { TableUtils } from '@lib/table-utils';
import { useHTranslation } from '../../../../lib/i18n';

export const GroupTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Group name', { vn: 'Tên nhóm' }),
      dataIndex: 'name',
      sortable: true,
      key: 'name',
      render: (text) => <a>{text}</a>,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Type'),
      dataIndex: 'type',
      sortable: true,
      key: 'type',
      render: (type) => <a>{type}</a>,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Description'),
      dataIndex: 'description',
      sortable: true,
      key: 'description',
      render: (text) => <a>{text}</a>,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      sortable: true,
      key: 'status',
      render: (status) => <a>{status}</a>,
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
