import { Tag } from 'antd';
import { mappingColorBuyOrderStatus } from '@components/features/profiles/transaction-management/components/constants';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { DrawerTransactionDetail } from './detail';

export const TransactionTableSchema = ({ type }) => {
  const { t } = useHTranslation('admin');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Fund - Program', { vn: 'Quỹ/ Chương trình' }),
      dataIndex: 'productProgramName',
      key: 'productDetailName',
      render: (value, row) => {
        return (
          <div style={{ display: 'flex' }}>
            <div style={{ borderRadius: '2px', marginRight: '10px' }}>
              <img src={row?.product?.org?.avatar?.url} alt="" width={24} />
            </div>
            {value}
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Order code', { vn: 'Mã lệnh' }),
      dataIndex: 'code',
      key: 'code',
      render: (value, row) => <span style={{ color: '#064DD6' }}>{value}</span>,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Order date', { vn: 'Ngày đặt lệnh' }),
      dataIndex: 'createAt',
      key: 'createAt',
      render: (time) =>
        ConverterUtils.dateConverterToString(
          new Date(time),
          'DD/MM/YYYY, HH:mm:ss',
        ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Volume', { vn: 'Số lượng' }),
      dataIndex: 'beginVolume',
      key: 'beginVolume',
      render: (beginVolume) => ConverterUtils.formatNumber(beginVolume),
    }),
    TableUtils.createTableColumnConfig({
      title: t('NAV current', { vn: 'NAV kì trước' }),
      dataIndex: 'price',
      key: 'price',
      render: (price) => <span>{ConverterUtils.formatNumber(price)}đ</span>,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Estimate value', { vn: 'Giá trị ước tính' }),
      render: (item) => (
        <span>{ConverterUtils.formatNumber(item?.netAmount.toFixed(0))}đ</span>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status name', { vn: 'Trạng thái' }),
      dataIndex: 'statusName',
      key: 'statusName',
      render: (statusName, record) => {
        const color = mappingColorBuyOrderStatus(statusName);
        return (
          <div style={{ display: 'flex' }}>
            <Tag style={{ fontSize: '10px' }} color={color}>
              {statusName}
            </Tag>
            <DrawerTransactionDetail type={type} record={record} />
          </div>
        );
      },
    }),
  ];
};
