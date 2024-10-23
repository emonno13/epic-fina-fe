import { Tag } from 'antd';
import { ItemViewer } from '@components/shared/common/configuration/item-viewer';
import { ConverterUtils } from '@lib/converter';
import { FormatterUtils } from '@lib/formatter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';

export const BondsTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Product title'),
      dataIndex: 'name',
      sortable: true,
      responsive: ['md'],
      render: (_, document: any) => {
        const content = (
          <div>
            <ItemViewer
              {...{
                label: t('Organizations'),
                value: ConverterUtils.showOrgConverter(document?.org),
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('product.sku'),
                value: <Tag color={'rgb(0, 104, 255)'}>#{document?.sku}</Tag>,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('product.productCodeOfTheInvestor'),
                value: (
                  <Tag color={'rgb(0, 104, 255)'}>
                    #{document?.productCodeOfTheInvestor}
                  </Tag>
                ),
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('product.name'),
                value: document?.name,
                labelClassName: 'm-b-0i',
              }}
            />
          </div>
        );

        return <>{content}</>;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Thông tin sản phẩm'),
      dataIndex: 'name',
      sortable: true,
      responsive: ['md'],
      render: (_, document: any) => {
        const { info } = document;
        const content = (
          <div>
            <ItemViewer
              {...{
                label: t('product.releaseDate'),
                value: ConverterUtils.dateConverter(info?.releaseDate),
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('product.maturityDate'),
                value: ConverterUtils.dateConverter(info?.maturityDate),
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('product.status'),
                value: <Tag color="magenta">#{document?.status}</Tag>,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('product.parValueShares'),
                value: FormatterUtils.formatAmount(info?.parValueShares),
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('product.totalReleaseVolume'),
                value: info?.totalReleaseVolume,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('product.totalValue'),
                value:
                  info?.parValueShares && info?.totalReleaseVolume
                    ? `${ConverterUtils.getMoneyLabel(info?.totalReleaseVolume * info?.parValueShares, t)} VNĐ`
                    : '_',
                labelClassName: 'm-b-0i',
              }}
            />
          </div>
        );
        return <>{content}</>;
      },
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
