import { Tag } from 'antd';
import { ItemViewer } from '@components/shared/common/configuration/item-viewer';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';

export const PrioritizeLoanDealDetailSchema = () => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Organizations'),
      dataIndex: 'org',
      sortable: true,
      key: 'orgId',
      render: (_, product) => ConverterUtils.showOrgConverter(product.org),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Product Deal Name', { vn: 'Tên sản phẩm vay' }),
      dataIndex: 'name',
      sortable: true,
      key: 'name',
      render: (_, product) => (
        <div>
          <div>{product.name}</div>
          <Tag color={'pink'}>{product.code}</Tag>
        </div>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Details'),
      dataIndex: 'detail',
      key: 'productDetail',
      sortable: true,
      render: (_, product) => {
        return (
          <div>
            <ItemViewer
              {...{
                label: t('Product type', { vn: 'Loại sản phẩm vay' }),
                value: product.type,
              }}
            />
            <ItemViewer
              {...{
                label: t('Product status', { vn: 'Trạng thái sản phẩm vay' }),
                value: product.status,
              }}
            />
          </div>
        );
      },
    }),
  ];
};
