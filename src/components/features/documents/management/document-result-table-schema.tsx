import { CheckOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { TableUtils } from '@lib/table-utils';
import { ConverterUtils } from '../../../../lib/converter';
import { useHTranslation } from '../../../../lib/i18n';

export const DocumentResultTableSchema = (props?: any) => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Document category', { vn: 'Danh mục tài liệu' }),
      dataIndex: 'documentCategory',
      sortable: true,
      key: 'documentCategory',
      render: (document) => {
        return document?.name;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'code',
      sortable: true,
      key: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Name'),
      dataIndex: 'name',
      sortable: true,
      key: 'name',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Default required', { vn: 'Mặc định là bắt buộc' }),
      dataIndex: 'isRequired',
      key: 'isRequired',
      render: (isRequired) => {
        return isRequired ? <CheckOutlined /> : <CloseCircleOutlined />;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Date created', { vn: 'Ngày tạo' }),
      dataIndex: 'createdAt',
      sortable: true,
      render: ConverterUtils.fullDatetimeConverter,
    }),

    !props?.rowSelection ? TableUtils.createEditAndDeleteControlColumn() : {},
  ];
};
