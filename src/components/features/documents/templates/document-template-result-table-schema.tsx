import { useTranslation } from 'next-i18next';

import { Tag } from 'antd';

import { TableUtils } from '@lib/table-utils';
import { ConverterUtils } from '../../../../lib/converter';
import {
  PRODUCT_TYPES_COLOR_MAPPING,
  PRODUCT_TYPES_LABEL_MAPPING,
} from '../../../../types/product';
import {
  DOCUMENT_TEMPLATE_STATUSES_COLOR_MAPPING,
  DOCUMENT_TEMPLATE_STATUSES_LABEL_MAPPING,
} from './constants';

export const DocumentTemplateResultTableSchema = () => {
  const { t } = useTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Partner'),
      dataIndex: 'org',
      sortable: true,
      key: 'orgId',
      render: (_, record) => ConverterUtils.showOrgConverter(record.org),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Product type'),
      dataIndex: 'productType',
      sortable: true,
      key: 'productType',
      render: (productType) => (
        <Tag color={PRODUCT_TYPES_COLOR_MAPPING[productType]}>
          {t(PRODUCT_TYPES_LABEL_MAPPING[productType])}
        </Tag>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Product category'),
      dataIndex: 'category',
      sortable: true,
      key: 'category',
      render: (category, record) => (
        <Tag color={PRODUCT_TYPES_COLOR_MAPPING[record?.productType] || 'red'}>
          {category?.name}
        </Tag>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Template code'),
      dataIndex: 'code',
      sortable: true,
      key: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Template name'),
      dataIndex: 'name',
      sortable: true,
      key: 'name',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Version'),
      dataIndex: 'version',
      sortable: true,
      key: 'version',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      sortable: true,
      key: 'status',
      render: (status) => (
        <Tag color={DOCUMENT_TEMPLATE_STATUSES_COLOR_MAPPING[status]}>
          {t(DOCUMENT_TEMPLATE_STATUSES_LABEL_MAPPING[status])}
        </Tag>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Clone'),
      dataIndex: 'clonedFrom',
      sortable: true,
      key: 'clonedFrom',
      render: (clonedFrom) => <a>{clonedFrom?.name}</a>,
    }),
    TableUtils.createCloneEditAndDeleteControlColumn(),
  ];
};
