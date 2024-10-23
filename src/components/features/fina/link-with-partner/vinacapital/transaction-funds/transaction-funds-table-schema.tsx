import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { Tag } from 'antd';
import { ConverterUtils } from '../../../../../../lib/converter';
import { ItemViewer } from '../../../../../shared/common/configuration/item-viewer';
import {
  TRANSACTION_FUNDS_ACTION_MAPPING,
  TRANSACTION_FUNDS_STATUS_MAPPING,
} from './constans';

export const TransactionFundsTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  const getSessionTime = (metaData) => {
    if (metaData?.orderToBuyDate)
      return ConverterUtils.dateConverterToString(
        metaData?.orderToBuyDate,
        'DD/MM/YYYY',
      );
    if (metaData?.sessionTime)
      return ConverterUtils.dateConverterToString(
        metaData?.sessionTime,
        'DD/MM/YYYY',
      );
    return null;
  };
  return [
    TableUtils.createTableColumnConfig({
      title: 'Thông tin chứng chỉ quỹ',
      dataIndex: 'product',
      width: '400px',
      key: 'product',
      render: (product, document) => {
        return (
          <div>
            <ItemViewer
              {...{
                space: true,
                label: t('Code', { vn: 'Mã' }),
                value: document?.code,
                labelClassName: 'm-b-0i',
                valueClassName: 'max-w-[200px]',
              }}
            />
            <ItemViewer
              {...{
                space: true,
                label: 'Chứng chỉ quỹ:',
                value: product?.name,
                labelClassName: 'm-b-0i',
                valueClassName: 'max-w-200',
              }}
            />
            {document?.productDetail?.name && (
              <ItemViewer
                {...{
                  space: true,
                  label: 'Chương trình:',
                  value: document?.productDetail?.name,
                  labelClassName: 'm-b-0i',
                }}
              />
            )}
            <ItemViewer
              {...{
                space: true,
                label: t('Session time:', { vn: 'Phiên giao dịch:' }),
                value: getSessionTime(document?.metaData),
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                space: true,
                label: t('NAV at trading time:', {
                  vn: 'Nav thời điểm giao dịch:',
                }),
                value: `${ConverterUtils.formatNumber(document?.metaData?.nav || '')} VNĐ`,
                labelClassName: 'm-b-0i',
              }}
            />
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Người mua',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer) => ConverterUtils.getFullNameUser(customer),
    }),
    TableUtils.createTableColumnConfig({
      title: 'Loại giao dịch',
      dataIndex: 'action',
      key: 'action',
      render: (action) => (
        <Tag color={TRANSACTION_FUNDS_ACTION_MAPPING[action]?.color}>
          {TRANSACTION_FUNDS_ACTION_MAPPING[action]?.label}
        </Tag>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: 'Số tiền',
      render: (record) => {
        return `${ConverterUtils.formatNumber(record?.metaData?.amount || '')} VNĐ`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      render: (status) => (
        <Tag color={TRANSACTION_FUNDS_STATUS_MAPPING[status]?.color}>
          {TRANSACTION_FUNDS_STATUS_MAPPING[status]?.label}
        </Tag>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: 'Thời gian đặt lệnh',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => ConverterUtils.fullDatetimeConverter(createdAt),
    }),
  ];
};
