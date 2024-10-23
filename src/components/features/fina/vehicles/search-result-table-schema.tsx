import { TableUtils } from '@lib/table-utils';
import { Tooltip } from 'antd';
import { useTranslation } from 'next-i18next';
import { ConverterUtils } from '../../../../lib/converter';

export const PositionTableSchema = () => {
  const { t } = useTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('vehicle.brand'),
      dataIndex: 'org',
      sortable: true,
      key: 'orgId',
      render: ConverterUtils.showOrgConverter,
    }),
    TableUtils.createTableColumnConfig({
      title: t('vehicle.model'),
      dataIndex: 'vehicleCategory',
      sortable: true,
      key: 'vehicleCategory',
      render: (category) => (
        <Tooltip placement="topLeft" title={`#${category?.code || ''}`}>
          {category?.name || '-'}
        </Tooltip>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Type'),
      dataIndex: 'vehicleType',
      sortable: true,
      key: 'vehicleType',
      render: (category) => (
        <Tooltip placement="topLeft" title={`#${category?.code || ''}`}>
          {category?.name || '-'}
        </Tooltip>
      ),
    }),
    // TableUtils.createTableColumnConfig({
    //   title: t('Name'),
    //   dataIndex: 'name',
    //   sortable: true,
    //   key: 'name',
    //   itemSchema: createSchemaItem({
    //     Component: Input,
    //     name: "name",
    //     componentProps: {
    //       placeholder: "input",
    //     }
    //   }),
    //   render: text => <a>{text}</a>,
    // }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      sortable: true,
      key: 'status',
      render: (status) => <a>{t(`vehicle.${status}`)}</a>,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Description'),
      dataIndex: 'description',
      sortable: true,
      key: 'description',
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
