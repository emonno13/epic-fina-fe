import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';

export const EventMessageWorkflowTableSchema = () => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createEditEventMessageWorkflowColumn(t('Action')),
    TableUtils.createTableColumnConfig({
      title: t('Event', { en: 'Event', vn: 'Event' }),
      dataIndex: 'name',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Start time', { en: 'Start time', vn: 'Ngày bắt đầu' }),
      dataIndex: 'startTime',
      key: 'startTime',
      render: ConverterUtils.fullDatetimeConverter,
    }),
    TableUtils.createTableColumnConfig({
      title: t('End time', { en: 'End time', vn: 'Ngày kết thúc' }),
      dataIndex: 'endTime',
      render: ConverterUtils.fullDatetimeConverter,
    }),
  ];
};
