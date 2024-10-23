import { TableUtils } from '@lib/table-utils';
import { createSchemaItem } from '@schema-form/h-types';
import { Input } from 'antd';
import { useTranslation } from 'next-i18next';

export const PositionTableSchema = () => {
  const { t } = useTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Type'),
      dataIndex: 'type',
      sortable: true,
      key: 'type',
    }),
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
        label: 'Serials',
        componentProps: {
          placeholder: 'input',
        },
      }),
      render: (text) => <a>{text}</a>,
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
