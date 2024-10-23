import { ConverterUtils } from '@lib/converter';
import { TableUtils } from '@lib/table-utils';
import { useHTranslation } from '../../../../../lib/i18n';

export const CategoryDocumentationTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Name'),
      dataIndex: 'name',
      sortable: true,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status', { vn: 'Trạng thái' }),
      dataIndex: 'status',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Created at'),
      dataIndex: 'createdAt',
      render: ConverterUtils.fullDatetimeConverter,
    }),
    TableUtils.createEditAndDeleteControlColumn(t('Action')),
  ];
};
