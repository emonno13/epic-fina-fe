import { TableUtils } from '@lib/table-utils';
import { ConverterUtils } from '../../../../lib/converter';

export const DocumentTemplateTableSchema = () => {
  return [
    TableUtils.createTableColumnConfig({
      title: 'Organization',
      dataIndex: 'org',
      sortable: true,
      key: 'orgId',
      render: ConverterUtils.showOrgConverter,
    }),
    TableUtils.createTableColumnConfig({
      title: 'Template Code',
      dataIndex: 'code',
      sortable: true,
      key: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: 'Template Name',
      dataIndex: 'name',
      sortable: true,
      key: 'name',
    }),
    TableUtils.createTableColumnConfig({
      title: 'Version',
      dataIndex: 'version',
      sortable: true,
      key: 'version',
    }),
    TableUtils.createTableColumnConfig({
      title: 'Status',
      dataIndex: 'status',
      sortable: true,
      key: 'status',
    }),
    TableUtils.createTableColumnConfig({
      title: 'Cloned',
      dataIndex: 'clonedFrom',
      sortable: true,
      key: 'clonedFrom',
    }),
    TableUtils.createEditColumn('Edit'),
  ];
};
