import { ConverterUtils } from '@lib/converter';
import { TableUtils } from '@lib/table-utils';
import { useHTranslation } from '../../../../../lib/i18n';

export const DocumentationTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Title'),
      dataIndex: 'title',
      sortable: true,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Created at'),
      dataIndex: 'createdAt',
      render: ConverterUtils.fullDatetimeConverter,
    }),
    TableUtils.createEditAndDeleteControlColumn(t('Action')),
  ];
};
