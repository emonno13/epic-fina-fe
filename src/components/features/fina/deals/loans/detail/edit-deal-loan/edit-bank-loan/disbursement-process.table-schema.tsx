import { Tag } from 'antd';
import {
  COMMISSION_STATUS_COLOR_MAPPING,
  COMMISSION_STATUS_LABEL_MAPPING,
} from '@components/features/fina/commission/settings/loan-product/constant';
import { PreViewUser } from '@components/features/fina/deals/deals-component-common/preview-user';
import { ConverterUtils } from '@lib/converter';
import { FormatterUtils } from '@lib/formatter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';

export const DisbursementProcessTableSchema = (props?: any) => {
  const { t } = useHTranslation('admin-common');
  const { dealDetail } = props;
  return [
    TableUtils.createTableColumnConfig({
      title: t('Amount', { vn: 'Số Tiền' }),
      dataIndex: 'amount',
      sortable: true,
      width: '250px',
      key: 'amount',
      // disable edit
      // itemSchema: (record) => {
      // 	if (record?.status === COMMISSION_STATUSES.NOT_FOR_CONTROL && (dealDetail.status === DEAL_DETAIL_STATUSES.DISBURSING
      //     || dealDetail.status === DEAL_DETAIL_STATUSES.LEND_APPROVAL
      // 	)) {
      // 		return createSchemaItem({
      // 			Component: InputNumber,
      // 			name: 'amount',
      // 			componentProps: {
      // 				formatter: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      // 				parser: value => value.replace(/(,*)/g, ''),
      // 				style: {width: '100%'},
      // 				min: 1,
      // 				placeholder: 'input',
      // 			},
      // 		});
      // 	}
      // 	return undefined;
      // },
      render: (_, record) =>
        FormatterUtils.formatAmount(record?.amount || 0, 'vnđ'),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Created At', { vn: 'Ngày giải ngân' }),
      dataIndex: 'paymentDate',
      sortable: true,
      width: '160px',
      key: 'paymentDate',
      // disable edit
      // itemSchema: (record) => {
      // 	if (record?.status === COMMISSION_STATUSES.NOT_FOR_CONTROL && (dealDetail.status === DEAL_DETAIL_STATUSES.DISBURSING
      //     || dealDetail.status === DEAL_DETAIL_STATUSES.LEND_APPROVAL
      // 	)) {
      // 		return createSchemaItem({
      // 			Component: HDatePicker,
      // 			name: 'paymentDate',
      // 			componentProps: {
      // 				style: {width: '100%'},
      // 				showTime: true,
      // 				format: 'DD/MM/YYYY',
      // 				defaultValue: moment(),
      // 			},
      // 		});
      // 	}
      // 	return undefined;
      // },
      render: (_, record) =>
        ConverterUtils.dateConverterToString(`${record?.paymentDate}`),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      sortable: true,
      width: '160px',
      key: 'status',
      render: (status, record) => (
        <Tag color={COMMISSION_STATUS_COLOR_MAPPING[status]}>
          {COMMISSION_STATUS_LABEL_MAPPING[status] || ''}
        </Tag>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Created By', { vn: 'Cập nhật cuối cùng' }),
      dataIndex: 'status',
      sortable: true,
      render: (status, record) => (
        <PreViewUser {...{ user: record?.updatedBy }} />
      ),
    }),
  ];
};
