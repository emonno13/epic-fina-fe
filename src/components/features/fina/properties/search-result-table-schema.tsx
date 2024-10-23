import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { HomeIcon, SourceIcon, StatusIcon } from '../../../../icons';
import { ConverterUtils } from '../../../../lib/converter';
import { ItemViewer } from '../../../shared/common/configuration/item-viewer';

export const RealEstateProductTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Product'),
      dataIndex: 'product',
      sortable: true,
      render: (_, document: any) => {
        return (
          <div>
            <ItemViewer
              {...{
                tooltipContent: t('Mã căn hộ/sản phâm'),
                label: <SourceIcon />,
                value: document?.apartmentCode,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: <StatusIcon />,
                value: document.apartmentCodeInvestor,
                tooltipContent: t('Apartment Code Investor', {
                  vn: 'Mã SP CĐT',
                }),
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: <HomeIcon />,
                value: document.name,
                tooltipContent: t('Product'),
                labelClassName: 'm-b-0i',
              }}
            />
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Loại hình bất động sản'),
      dataIndex: 'type',
      sortable: true,
      render: (_, document: any) => {
        return <div>{t(document?.type)}</div>;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Product type'),
      dataIndex: 'category',
      sortable: true,
      key: 'categoryId',
      render: ConverterUtils.showCategoryConverter,
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
