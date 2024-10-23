import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { Tag } from 'antd';
import { mappingColorBuyOrderStatus } from './constants';
import { DrawerTransactionDetail } from './drawer-transaction-detail';

export const TransactionTableSchema = ({ type }) => {
  const { t } = useHTranslation('admin');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Fund - Program', { vn: 'Quỹ - Chương trình' }),
      dataIndex: 'productProgramName',
      key: 'productDetailName',
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
      title: t('Order code', { vn: 'Mã lệnh' }),
      dataIndex: 'code',
      key: 'code',
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
      render: (statusName) => {
        const color = mappingColorBuyOrderStatus(statusName);
        return <Tag color={color}>{statusName}</Tag>;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Action'),
      render: (record) => {
        return <DrawerTransactionDetail type={type} record={record} />;
      },
    }),
  ];
};
