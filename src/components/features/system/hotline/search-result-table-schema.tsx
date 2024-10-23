import { Tag } from 'antd';

import { TableUtils } from '@lib/table-utils';
import { useHTranslation } from '../../../../lib/i18n';
import { ContentHotlineRecord } from './common';

export const HotlineTableSchema = () => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'code',
      sortable: true,
      key: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Hotline number', { vn: 'Số hotline' }),
      dataIndex: 'hotline',
      sortable: true,
      key: 'hotline',
    }),
    TableUtils.createTableColumnConfig({
      title: t('IVR'),
      dataIndex: 'ivrTree',
      sortable: true,
      key: 'ivrTree',
      render: ContentHotlineRecord,
    }),
    TableUtils.createTableColumnConfig({
      title: t('status', { vn: 'Trạng thái' }),
      dataIndex: 'enableIvr',
      sortable: true,
      key: 'enableIvr',
      render: (enableIvr) =>
        enableIvr ? (
          <Tag color="#108ee9">{'Bật'}</Tag>
        ) : (
          <Tag color="#f50">{'Tắt'}</Tag>
        ),
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
