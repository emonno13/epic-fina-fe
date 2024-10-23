import { TableUtils } from '@lib/table-utils';
import { useHTranslation } from '../../../../../lib/i18n';

export const CampaignTableSchema = () => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Id'),
      dataIndex: 'campaignId',
      sortable: true,
      key: 'campaignId',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Type'),
      dataIndex: 'type',
      sortable: true,
      key: 'type',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Title'),
      dataIndex: 'title',
      sortable: true,
      key: 'title',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Subject'),
      dataIndex: 'subject',
      sortable: true,
      key: 'subject',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'statusPartner',
      sortable: true,
      key: 'statusPartner',
    }),
  ];
};
