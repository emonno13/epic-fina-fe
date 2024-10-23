import { TableUtils } from '@lib/table-utils';
import { mappingLabelGroupType } from '@types/group';
import { useHTranslation } from '../../../../lib/i18n';

export const GroupTableSchema = () => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'code',
      sortable: true,
      key: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Group name', { vn: 'Tên nhóm' }),
      dataIndex: 'name',
      sortable: true,
      key: 'name',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Type of group', { vn: 'Loại nhóm' }),
      dataIndex: 'type',
      sortable: true,
      key: 'type',
      converter: (type) => mappingLabelGroupType(type, t),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Description'),
      dataIndex: 'description',
      sortable: true,
      key: 'description',
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
