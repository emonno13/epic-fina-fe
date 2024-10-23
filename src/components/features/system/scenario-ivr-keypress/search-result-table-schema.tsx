import { TableUtils } from '@lib/table-utils';
import { useHTranslation } from '../../../../lib/i18n';
import { IVR_KEYPRESS_ACTION_LABEL_MAPPING } from './constant';

export const ScenarioIvrKeypressTableSchema = () => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'code',
      sortable: true,
      key: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Keypress', { vn: 'Phím bấm' }),
      dataIndex: 'name',
      sortable: true,
      key: 'name',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Keypress action', { vn: 'Hành động phím bấm' }),
      dataIndex: 'action',
      sortable: true,
      key: 'action',
      render: (action) => IVR_KEYPRESS_ACTION_LABEL_MAPPING[action?.key] || '',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Keypress value', { vn: 'Giá trị phím bấm' }),
      dataIndex: 'action',
      sortable: true,
      key: 'action',
      render: (action) => action?.actionValue?.name || '',
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
