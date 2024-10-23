import React from 'react';
import { TableUtils } from '../../../lib/table-utils';
import { useHTranslation } from '../../../lib/i18n';

export const TemplateResultSchema = () => {
  const { t } = useHTranslation('admin-common');
  return ([
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'code',
      sortable: true,
      key: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Title'),
      dataIndex: 'title',
      key: 'title',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Type template', { vn: 'Loại mẫu tài liệu' }),
      dataIndex: 'typeTemplate',
      key: 'typeTemplate',
      sortable: true,
      render: (content) => (<div dangerouslySetInnerHTML={{ __html: content }}>
      </div>),
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ]);
};