import { TableUtils } from '@lib/table-utils';
import { useTranslation } from 'next-i18next';
import { ConverterUtils } from '../../../../../lib/converter';
import { ItemViewer } from '../../../../shared/common/configuration/item-viewer';

export const RealEstateProductTableSchema = () => {
  const { t } = useTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Organization'),
      dataIndex: 'org',
      sortable: true,
      key: 'orgId',
      render: ConverterUtils.showOrgConverter,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Product title'),
      dataIndex: 'name',
      sortable: true,
      width: 300,
      render: (_, document: any) => {
        return (
          <div>
            <ItemViewer {...{ label: t('Code'), value: document?.code }} />
            <ItemViewer {...{ label: t('Name'), value: document?.name }} />
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Product type', { vn: 'Loại sản phẩm' }),
      dataIndex: 'category',
      sortable: true,
      key: 'categoryId',
      render: ConverterUtils.showCategoryConverter,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Product information'),
      dataIndex: 'name',
      sortable: true,
      render: (_, document: any) => {
        return (
          <div>
            <ItemViewer
              {...{
                label: t('Product value '),
                value: document?.detail?.product_value || 0,
              }}
            />
            <ItemViewer
              {...{
                label: t('Address '),
                value: document?.detail?.address || '',
              }}
            />
            <ItemViewer
              {...{ label: t('Link '), value: document?.detail?.link || '' }}
            />
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Description'),
      dataIndex: 'description',
      sortable: true,
      width: 400,
      key: 'description',
    }),
    TableUtils.createEditColumn('Edit'),
  ];
};
