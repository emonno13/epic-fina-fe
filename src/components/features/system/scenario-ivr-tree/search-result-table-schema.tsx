import { TableUtils } from '@lib/table-utils';
import { useHTranslation } from '../../../../lib/i18n';

export const ScenarioIvrTreeTableSchema = () => {
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
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
