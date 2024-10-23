import { TableUtils } from '@lib/table-utils';
import { ConvertUtils } from '@lib/utils/convert';
import { useHTranslation } from '../../../../lib/i18n';

export const PositionTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Group'),
      dataIndex: 'group',
      sortable: true,
      key: 'group',
      render: (text) => (
        <a>{ConvertUtils.replaceWhiteSpaceAndUpperString(text)}</a>
      ),
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
      render: (status) => <a>{status}</a>,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Description'),
      dataIndex: 'description',
      sortable: true,
      key: 'description',
      render: (text) => <a>{text}</a>,
    }),
    TableUtils.createEditColumn(t('Edit', { vn: 'Chỉnh sửa' })),
  ];
};
