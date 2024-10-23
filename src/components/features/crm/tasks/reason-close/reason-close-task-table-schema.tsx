import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';

export const ReasonCloseTaskTableSchema = () => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Created by', { vn: 'Người tạo' }),
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 170,
      render: ConverterUtils.showUserConverter,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Create at', { vn: 'Ngày tạo' }),
      dataIndex: 'createdAt',
      sortable: true,
      key: 'createdAt',
      render: (createdAt) => ConverterUtils.dateConverterToString(createdAt),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Content'),
      dataIndex: 'content',
      key: 'content',
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
