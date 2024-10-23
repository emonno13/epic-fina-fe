import React from 'react';
import { Tag } from 'antd';

import { useHTranslation } from '../../../../../../../lib/i18n';
import { TableUtils } from '../../../../../../../lib/table-utils';
import { ConverterUtils } from '../../../../../../../lib/converter';
import { COMMISSION_SETTING_STATUS_INFO_MAPPING } from '../constant';

export const LoanProductCommissionSettingSpendTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return ([
    TableUtils.createTableColumnConfig({
      title: t('Product category'),
      dataIndex: 'category',
      sortable: true,
      key: 'category',
      render: (category, commissionSetting) => commissionSetting?.categoryId === 'default' ? t('Default') : category?.name,
    }),

    TableUtils.createTableColumnConfig({
      title: t('Định mức hoa hồng'),
      dataIndex: 'formula',
      sortable: true,
      key: 'formula',
      render: (formula) => `${formula?.commissionRate || 0}%`,
    }),

    TableUtils.createTableColumnConfig({
      title: t('Chi tối đa trên định mức'),
      dataIndex: 'formula',
      sortable: true,
      key: 'formula',
      render: (formula) => `${formula?.greaterThanRateInfo?.spendMax || 0}%`,
    }),

    TableUtils.createTableColumnConfig({
      title: t('Chi tối đa dưới định mức'),
      dataIndex: 'formula',
      sortable: true,
      key: 'formula',
      render: (formula) => `${formula?.lessThanRateInfo?.spendMax || 0}%`,
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
      render: (status) => <Tag color={COMMISSION_SETTING_STATUS_INFO_MAPPING[status]?.color}>{COMMISSION_SETTING_STATUS_INFO_MAPPING[status]?.label || ''}</Tag>,
    }),
    TableUtils.createEditAndDeleteControlColumn(t('Action')),
  ]);
};
