import { Tag } from 'antd';

import { TableUtils } from '@lib/table-utils';
import { ConverterUtils } from '../../../../../../../lib/converter';
import { useHTranslation } from '../../../../../../../lib/i18n';
import {
  COMMISSION_METHOD_INFO_MAPPING,
  COMMISSION_SETTING_STATUS_INFO_MAPPING,
} from '../constant';

export const LoanProductCommissionSettingTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Product category'),
      dataIndex: 'category',
      sortable: true,
      key: 'category',
      render: (category, commissionSetting) =>
        commissionSetting?.categoryId === 'default'
          ? t('Default')
          : category?.name,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Phương thức tính'),
      dataIndex: 'formula',
      sortable: true,
      key: 'formula',
      render: (formula, record) =>
        COMMISSION_METHOD_INFO_MAPPING[formula?.method]?.label || '',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Áp dụng luỹ kế'),
      dataIndex: 'formula',
      sortable: true,
      key: 'formula',
      render: (formula) => formula?.hasAccumulated,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Ngày áp dụng'),
      dataIndex: 'applyDate',
      key: 'applyDate',
      sortable: true,
      converter: ConverterUtils.dateConverter,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      sortable: true,
      key: 'status',
      render: (status, record) => (
        <Tag color={COMMISSION_SETTING_STATUS_INFO_MAPPING[status]?.color}>
          {COMMISSION_SETTING_STATUS_INFO_MAPPING[status]?.label || ''}
        </Tag>
      ),
    }),
    TableUtils.createEditAndDeleteControlColumn(t('Action')),
  ];
};
