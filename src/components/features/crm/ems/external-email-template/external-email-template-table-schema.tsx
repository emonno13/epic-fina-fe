import { TableUtils } from '@lib/table-utils';
import { Tag } from 'antd';
import { useHTranslation } from '../../../../../lib/i18n';
import { EXTERNAL_EMAIL_TEMPLATE_TYPE_DATA_MAPPING } from '../message/constants';

export const ExternalEmailTemplateTableSchema = () => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Id'),
      dataIndex: 'templateId',
      sortable: true,
      key: 'templateId',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Type'),
      dataIndex: 'type',
      sortable: true,
      key: 'type',
      render: (type: string) => (
        <Tag
          color={
            EXTERNAL_EMAIL_TEMPLATE_TYPE_DATA_MAPPING[type]?.color || 'green'
          }
        >
          {EXTERNAL_EMAIL_TEMPLATE_TYPE_DATA_MAPPING[type]?.label || ''}
        </Tag>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Name'),
      dataIndex: 'name',
      sortable: true,
      key: 'name',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Subject'),
      dataIndex: 'subject',
      sortable: true,
      key: 'subject',
    }),
  ];
};
