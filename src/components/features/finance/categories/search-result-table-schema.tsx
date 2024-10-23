import { TableUtils } from '@lib/table-utils';
import { Input, Tag } from 'antd';
import { useHTranslation } from '../../../../lib/i18n';
import { createSchemaItem } from '../../../../schema-form/h-types';

export const PositionTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'code',
      sortable: true,
      key: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Category Name'),
      dataIndex: 'name',
      sortable: true,
      key: 'name',
      itemSchema: createSchemaItem({
        Component: Input,
        name: 'name',
        componentProps: {
          placeholder: 'input',
        },
      }),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Belong to', { vn: 'Thuộc về' }),
      dataIndex: 'productCategory',
      sortable: true,
      key: 'productCategory',
      render: (productCategory) => t(productCategory),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      sortable: true,
      key: 'status',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Description'),
      dataIndex: 'description',
      sortable: true,
      key: 'description',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Outstanding Category', { vn: 'Danh mục nổi bật' }),
      dataIndex: 'isOutstanding',
      key: 'isOutstanding',
      width: 200,
      render: (isOutstanding, document) => {
        return (
          <Tag color={isOutstanding ? 'blue' : 'pink'}>
            {isOutstanding ? 'Có' : 'Không'}
          </Tag>
        );
      },
    }),
    TableUtils.createEditAndDeleteControlColumn(t('Action')),
  ];
};

export const NewsTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'code',
      sortable: true,
      key: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Category Name'),
      dataIndex: 'name',
      key: 'name',
      // itemSchema: createSchemaItem({
      //   Component: Input,
      //   name: 'name',
      //   componentProps: {
      //     placeholder: 'input',
      //   },
      // }),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Description'),
      dataIndex: 'description',
      key: 'description',
    }),
    TableUtils.createEditAndDeleteControlColumn(t('Action')),
  ];
};
