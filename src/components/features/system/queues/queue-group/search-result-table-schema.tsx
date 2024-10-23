import { TableUtils } from '@lib/table-utils';
import { Tag } from 'antd';
import { useHTranslation } from '../../../../../lib/i18n';

export const QueueGroupTableSchema = () => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Group name', { vn: 'Tên nhóm' }),
      dataIndex: 'group',
      sortable: true,
      key: 'group',
      render: (group) => group?.name || '',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Main/Sub group', { vn: 'Nhóm chính / nhóm phụ' }),
      dataIndex: 'isMain',
      sortable: true,
      key: 'isMain',
      render: (isMain) =>
        isMain ? (
          <Tag color={'#108ee9'}>{'Nhóm chính'}</Tag>
        ) : (
          <Tag>{'Nhóm phụ'}</Tag>
        ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      sortable: true,
      key: 'status',
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
