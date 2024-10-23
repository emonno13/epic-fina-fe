import { useTranslation } from 'next-i18next';
import { Tag } from 'antd';
import React from 'react';
import { TableUtils } from '../../../../../../../lib/table-utils';
import { ConverterUtils } from '../../../../../../../lib/converter';
import { LOAN_STATUSES_COLOR_MAPPING, LOAN_STATUSES_LABEL_MAPPING } from '../../../../products/utils';


export const ProductLoanDetailTableSchema = () => {
  const { t } = useTranslation('admin-common');
  return ([
    TableUtils.createTableColumnConfig({
      title: t('Organizations'),
      dataIndex: 'org',
      sortable: true,
      key: 'orgId',
      render: ConverterUtils.showOrgConverter,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'code',
      sortable: true,
      key: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Loan name'),
      dataIndex: 'name',
      sortable: true,
      key: 'name',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      sortable: true,
      key: 'status',
      render: (status) => <Tag color={LOAN_STATUSES_COLOR_MAPPING[status]}>{t(LOAN_STATUSES_LABEL_MAPPING[status])}</Tag>,
    }),
  ]);
};