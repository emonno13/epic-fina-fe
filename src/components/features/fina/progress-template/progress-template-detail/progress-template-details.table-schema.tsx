import { TableUtils } from '@lib/table-utils';
import { Input, InputNumber, Tag } from 'antd';
import { useHTranslation } from '../../../../../lib/i18n';
import { createSchemaItem } from '../../../../../schema-form/h-types';
import { ItemViewer } from '../../../../shared/common/configuration/item-viewer';
import {
  PROGRESS_STATUSES_COLOR_MAPPING,
  PROGRESS_STATUSES_LABEL_MAPPING,
} from '../utils';

export const ProgressTemplateDetailsTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Progress', {
        en: 'Progress',
        vn: 'Tiến trình',
      }),
      dataIndex: 'progressId',
      sortable: true,
      key: 'progressId',
      render: (_, document: any) => {
        return (
          <div>
            <ItemViewer
              {...{
                label: t('Name'),
                value: document?.progress?.name || '',
                labelClassName: 'm-b-0i',
              }}
            />
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Progress status', {
        en: 'Progress status',
        vn: 'Trạng thái tiến trình',
      }),
      dataIndex: 'progressId',
      sortable: true,
      key: 'progressId',
      render: (_, document: any) => (
        <Tag
          color={PROGRESS_STATUSES_COLOR_MAPPING[document?.progress?.status]}
        >
          {PROGRESS_STATUSES_LABEL_MAPPING[document?.progress?.status]}
        </Tag>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Order', {
        en: 'Order',
        vn: 'Thứ tự',
      }),
      dataIndex: 'order',
      sortable: true,
      key: 'order',
      itemSchema: createSchemaItem({
        Component: InputNumber,
        name: 'order',
        componentProps: {
          placeholder: 'order',
        },
      }),
      render: (order) => <a>{order || '1'}</a>,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Weight', {
        en: 'Weight',
        vn: 'Trọng số',
      }),
      dataIndex: 'weight',
      sortable: true,
      key: 'weight',
      itemSchema: createSchemaItem({
        Component: InputNumber,
        name: 'weight',
        label: 'Weight',
        componentProps: {
          placeholder: 'input',
        },
      }),
      render: (text) => <a>{text}</a>,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Description', {
        en: 'Description',
        vn: 'Mô tả',
      }),
      dataIndex: 'description',
      sortable: true,
      key: 'description',
      itemSchema: createSchemaItem({
        Component: Input,
        name: 'description',
        label: 'Description',
        componentProps: {
          placeholder: 'input',
        },
      }),
      render: (text) => <a>{text}</a>,
    }),
    TableUtils.createDeleteControlColumn(),
  ];
};
