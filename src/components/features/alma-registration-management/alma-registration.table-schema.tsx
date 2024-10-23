import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';

export const AlmaRegistrationTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Customer name', { vn: 'Tên khách hàng' }),
      dataIndex: 'fullName',
    }),
    TableUtils.createTableColumnConfig({
      title: 'Email',
      dataIndex: 'email',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Phone', { vn: 'Số điện thoại' }),
      dataIndex: 'phone',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Registration time', { vn: 'Thời gian đăng kí' }),
      dataIndex: 'createdAt',
      render: (value) => ConverterUtils.fullDatetimeConverter(value),
    }),
    TableUtils.createEditAndDeleteControlColumn(t('Action')),
  ];
};
