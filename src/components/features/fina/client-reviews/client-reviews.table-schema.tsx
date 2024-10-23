import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { Rate } from 'antd';

export const ClientReviewsTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Reviewer name', {
        en: 'Reviewer name',
        vn: 'Tên người đánh giá',
      }),
      dataIndex: 'reviewerName',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Reviewer address', {
        en: 'Reviewer address',
        vn: 'Địa chỉ người đánh giá',
      }),
      dataIndex: 'reviewerAddress',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Rate', { en: 'Rate', vn: 'Đánh giá' }),
      dataIndex: 'rate',
      render: (rate) => <Rate {...{ value: rate, disabled: true }} />,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Title', { en: 'Title', vn: 'Tiêu đề' }),
      dataIndex: 'title',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Review date', { en: 'Review date', vn: 'Ngày đánh giá' }),
      dataIndex: 'reviewDate',
      render: ConverterUtils.fullDatetimeConverter,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Created at', { vn: 'Thời gian khảo sát', en: 'Created at' }),
      dataIndex: 'createdAt',
      render: ConverterUtils.fullDatetimeConverter,
    }),
    TableUtils.createEditAndDeleteControlColumn(t('Action')),
  ];
};
