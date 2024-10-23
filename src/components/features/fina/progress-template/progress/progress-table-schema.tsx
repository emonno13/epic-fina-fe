import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { Tag } from 'antd';
import {
  PROGRESS_STATUSES_COLOR_MAPPING,
  PROGRESS_STATUSES_LABEL_MAPPING,
} from '../utils';

export const ProgressTableSchema = (props?: any) => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Progress Name', {
        en: 'Progress Name',
        vn: 'Tên tiến trình',
      }),
      dataIndex: 'name',
      sortable: true,
      key: 'name',
    }),
    // TableUtils.createTableColumnConfig({
    //   title: 'BelongsTo',
    //   dataIndex: 'belongsTo',
    //   sortable: true,
    //   key: 'belongsTo'
    // }),
    TableUtils.createTableColumnConfig({
      title: t('Progress status', {
        en: 'Progress status',
        vn: 'Trạng thái tiến trình',
      }),
      dataIndex: 'status',
      sortable: true,
      key: 'status',
      render: (status) => (
        <Tag color={PROGRESS_STATUSES_COLOR_MAPPING[status]}>
          {PROGRESS_STATUSES_LABEL_MAPPING[status]}
        </Tag>
      ),
    }),

    !props?.rowSelection ? TableUtils.createEditAndDeleteControlColumn() : {},
  ];
};
