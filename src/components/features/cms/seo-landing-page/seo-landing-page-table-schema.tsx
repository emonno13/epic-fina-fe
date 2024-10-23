import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { Tag } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';

export const useMappingSeoLandingPageStatus = () => {
  const { t } = useHTranslation('admin-common');
  return (isActive) =>
    isActive ? (
      <Tag color="green">{t('Active', { vn: 'Hoạt động' })}</Tag>
    ) : (
      <Tag color="red">{t('Inactive', { vn: 'Không hoạt động' })}</Tag>
    );
};

export const useSeoLandingPageTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  const mappingSeoLandingPageStatus = useMappingSeoLandingPageStatus();

  return () => {
    return [
      TableUtils.createTableColumnConfig({
        title: t('Url landing page', { vn: 'Đường dẫn landing page' }),
        dataIndex: 'url',
        key: 'url',
        width: 350,
        render: (url) => <Paragraph copyable>{url}</Paragraph>,
      }),
      TableUtils.createTableColumnConfig({
        title: t('Status'),
        dataIndex: 'isActive',
        key: 'isActive',
        render: (isActive) => mappingSeoLandingPageStatus(isActive),
      }),
      TableUtils.createTableColumnConfig({
        title: t('Staff'),
        dataIndex: 'createdBy',
        key: 'createdBy',
        render: (staff) => ConverterUtils.getFullNameUser(staff),
      }),
      TableUtils.createEditAndDeleteControlColumn(),
    ];
  };
};
