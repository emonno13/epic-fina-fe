import { Tag } from 'antd';

import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import {
  MESSAGE_STATUS_DATA_MAPPING,
  MESSAGE_TYPE,
  MESSAGE_TYPES_COLOR_MAPPING,
  MESSAGE_TYPES_LABEL_MAPPING,
} from './constants';

export const MessageTableSchema = () => {
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
      title: t('Type', { en: 'Type', vn: 'Loại' }),
      dataIndex: 'type',
      render: (type: string) => (
        <Tag color={MESSAGE_TYPES_COLOR_MAPPING[type]}>
          {MESSAGE_TYPES_LABEL_MAPPING[type] || ''}
        </Tag>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      render: (type: string) => (
        <Tag color={MESSAGE_STATUS_DATA_MAPPING[type]?.color || 'green'}>
          {MESSAGE_STATUS_DATA_MAPPING[type]?.label || ''}
        </Tag>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Description', { en: 'Description', vn: 'Mô tả' }),
      dataIndex: 'description',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Template', { en: 'Template', vn: 'Mẫu email' }),
      dataIndex: 'type',
      render: (type, message) => {
        const emailMessageTypes = [
          MESSAGE_TYPE.EXTERNAL_SERVICE_EMAIL,
          MESSAGE_TYPE.INTERNAL_SERVICE_EMAIL,
        ];
        if (!emailMessageTypes.includes(type)) {
          return '';
        }

        return type === MESSAGE_TYPE.EXTERNAL_SERVICE_EMAIL
          ? message?.externalTemplate?.name
          : message?.internalTemplate?.title;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Reference set template'),
      dataIndex: 'referenceSetTemplate',
      render: (referenceSetTemplate: any) => referenceSetTemplate?.name || '',
    }),
    TableUtils.createEditAndDeleteControlColumn(t('Action')),
  ];
};
