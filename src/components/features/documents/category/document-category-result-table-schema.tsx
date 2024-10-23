import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { ConverterUtils } from '../../../../lib/converter';

export const DocumentCategoryResultTableSchema = () => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'code',
      sortable: true,
      key: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Name'),
      dataIndex: 'name',
      sortable: true,
      key: 'name',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Description'),
      dataIndex: 'description',
      sortable: true,
      key: 'description',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Date created', { vn: 'Thời gian tạo' }),
      dataIndex: 'createdAt',
      sortable: true,
      render: ConverterUtils.fullDatetimeConverter,
    }),

    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
