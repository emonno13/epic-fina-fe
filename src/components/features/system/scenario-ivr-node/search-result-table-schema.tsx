import { Tag } from 'antd';

import { TableUtils } from '@lib/table-utils';
import { useHTranslation } from '../../../../lib/i18n';

export const ScenarioIvrNodeTableSchema = () => {
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
      title: t('Play mode', { vn: 'Chế độ phát node' }),
      dataIndex: 'action',
      sortable: true,
      key: 'action',
      render: (action) => action?.playMode || '',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Play content', { vn: 'Nội dung node' }),
      dataIndex: 'action',
      sortable: true,
      key: 'action',
      render: (action) => {
        if (action?.playMode === 'play') {
          return action?.greetingFile?.file?.name || '';
        }

        return action?.playContent;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Root node', { vn: 'Nút gốc' }),
      dataIndex: 'isRootNode',
      sortable: true,
      key: 'isRootNode',
      render: (isRootNode) => {
        console.log('isRootNode: ', isRootNode);
        return isRootNode ? (
          <Tag color={'green'}>{'Nút gốc'}</Tag>
        ) : (
          <Tag>{'Không'}</Tag>
        );
      },
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
