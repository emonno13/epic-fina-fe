import { Tag } from 'antd';

import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { MESSAGE_WORKFLOW_STATUS_DATA_MAPPING } from './constant';

export const MessageWorkflowTableSchema = () => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Name', { en: 'Name', vn: 'Tên' }),
      dataIndex: 'name',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      render: (type: string) => (
        <Tag
          color={MESSAGE_WORKFLOW_STATUS_DATA_MAPPING[type]?.color || 'green'}
        >
          {MESSAGE_WORKFLOW_STATUS_DATA_MAPPING[type]?.label || ''}
        </Tag>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Description', { en: 'Description', vn: 'Mô tả' }),
      dataIndex: 'description',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Messages', { en: 'Messages', vn: 'Mẫu email' }),
      dataIndex: 'message',
      key: 'message',
      render: (message) => <p>{message?.name}</p>,
    }),
    TableUtils.createColumnCreatedAt(),
    TableUtils.createColumnCreatedBy(),
    TableUtils.createEditAndDeleteControlColumn(t('Action')),
  ];
};
