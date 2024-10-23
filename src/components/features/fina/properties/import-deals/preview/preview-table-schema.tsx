import { useHTranslation } from '@lib/i18n';

import { TableUtils } from '@lib/table-utils';
import { HomeIcon, SourceIcon, StatusIcon } from '../../../../../../icons';
import { ItemViewer } from '../../../../../shared/common/configuration/item-viewer';

export const PreviewTableSchema = () => {
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
                value: document?.data?.apartmentCode,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: <StatusIcon />,
                value: document.data?.apartmentCodeInvestor,
                tooltipContent: t('Apartment Code Investor', {
                  vn: 'Mã SP CĐT',
                }),
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: <HomeIcon />,
                value: document.data?.name,
                tooltipContent: t('Product'),
                labelClassName: 'm-b-0i',
              }}
            />
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Thông tin'),
      dataIndex: 'type',
      sortable: true,
      render: (_, document: any) => {
        return (
          <div>
            <ItemViewer
              {...{
                tooltipContent: t('Loại hình bất động sản'),
                label: <SourceIcon />,
                value: t(document.data?.type),
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                tooltipContent: t('Address'),
                label: <SourceIcon />,
                value: t(document.data?.address),
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                tooltipContent: t('Hướng ban công'),
                label: <SourceIcon />,
                value: t(document.data?.balconyDirection),
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                tooltipContent: t('Diện tích'),
                label: <SourceIcon />,
                value: t(document.data?.totalArea),
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                tooltipContent: t('Số phòng ngủ'),
                label: <SourceIcon />,
                value: t(document.data?.sleepNumber),
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                tooltipContent: t('Số wc'),
                label: <SourceIcon />,
                value: t(document.data?.numberOfToilets),
                labelClassName: 'm-b-0i',
              }}
            />
          </div>
        );
      },
    }),
    TableUtils.createDeleteControlColumn(),
  ];
};
