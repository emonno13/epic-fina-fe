import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { Input } from 'antd';
import { createSchemaItem } from '../../../../schema-form/h-types';

export const ProductProgressTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Use for organization type', {
        en: 'Use for',
        vn: 'Sử dụng cho',
      }),
      dataIndex: 'useForOrgType',
      sortable: true,
      key: 'useForOrgType',
      render: (useForOrgType) => t(useForOrgType),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Product progress code', {
        en: 'Product progress code',
        vn: 'Mã tiến trình sản phẩm',
      }),
      dataIndex: 'code',
      sortable: true,
      key: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Product progress name', {
        en: 'Product progress name',
        vn: 'Tên tiến trình sản phẩm',
      }),
      dataIndex: 'name',
      sortable: true,
      key: 'name',
      itemSchema: createSchemaItem({
        Component: Input,
        name: 'name',
        label: 'Serials',
        componentProps: {
          placeholder: 'input',
        },
      }),
      render: (text) => <a>{text}</a>,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Product category', {
        en: 'Product category',
        vn: 'Danh mục sản phẩm',
      }),
      dataIndex: 'productCategory',
      sortable: true,
      key: 'productCategory',
      render: (productCategory) => t(productCategory),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Sub product category', {
        en: 'Sub product category',
        vn: 'Danh mục sản phẩm phụ',
      }),
      dataIndex: 'subProductCategory',
      sortable: true,
      key: 'subProductCategory',
      render: (subProductCategory) => t(subProductCategory),
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
