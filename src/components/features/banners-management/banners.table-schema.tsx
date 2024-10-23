import { ItemViewer } from '@components/shared/common/configuration/item-viewer';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { Tag } from 'antd';
import { BannerPrioritySchemaItem } from './banners.detail-schema-form';
import { displayBannerCondition, getBannerStatus } from './constants';

export const BannersTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Name'),
      dataIndex: 'name',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Image'),
      dataIndex: 'desktopImage',
      render: (image) =>
        image?.url && (
          <img style={{ width: 300, height: 63 }} src={image?.url} />
        ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Link'),
      dataIndex: 'link',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Time application', { vn: 'Thời gian áp dụng' }),
      render: (record) => (
        <div>
          <ItemViewer
            {...{
              label: t('Apply from', { vn: 'Áp dụng từ' }),
              value: ConverterUtils.dateConverterToString(record?.applyFrom),
              labelClassName: 'm-b-0i',
            }}
          />
          <ItemViewer
            {...{
              label: t('Apply to', { vn: 'Áp dụng đến' }),
              value: ConverterUtils.dateConverterToString(record?.applyTo),
              labelClassName: 'm-b-0i',
            }}
          />
        </div>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Priority', { vn: 'Độ ưu tiên' }),
      dataIndex: 'priority',
      itemSchema: (record) => {
        return BannerPrioritySchemaItem({});
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      render: (record) => {
        const displayCondition = displayBannerCondition(record);
        const bannerStatus = getBannerStatus(t);
        const status = displayCondition
          ? bannerStatus.DISPLAY
          : bannerStatus.NOT_DISPLAY;
        return (
          <div>
            <Tag color={status.color}>{status.text}</Tag>
          </div>
        );
      },
    }),
    TableUtils.createEditAndDeleteControlColumn(t('Action')),
  ];
};
