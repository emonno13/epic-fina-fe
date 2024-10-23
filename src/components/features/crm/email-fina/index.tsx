import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { HTable } from '@schema-form/features';
import HFeature from '@schema-form/features/feature';
import { HSearchFormWithCreateButton } from '@schema-form/features/search-form';
import moment from 'moment';
import { DetailView } from './detail';
import { EVENT_STATUS_LABEL } from './detail-schema-form';

const SendEmailFINAManagement = () => {
  const { t } = useHTranslation('admin-common');

  return (
    <HFeature
      {...{
        featureId: 'request-send-email',
        nodeName: 'request-send-email',
      }}
    >
      <HSearchFormWithCreateButton withRelations={[]} />

      <DetailView />

      <HTable
        schema={() => [
          TableUtils.createTableColumnConfig({
            title: t('Title'),
            dataIndex: 'title',
            key: 'title',
          }),
          TableUtils.createTableColumnConfig({
            title: t('Status'),
            dataIndex: 'status',
            key: 'status',
            render: (status, document) => (
              <div className={status ? '' : ''}>
                {status
                  ? EVENT_STATUS_LABEL[status]
                  : EVENT_STATUS_LABEL['not_send']}
              </div>
            ),
          }),
          TableUtils.createTableColumnConfig({
            title: t('Time send', { vn: 'Thời gian cài đặt gửi' }),
            dataIndex: 'time',
            key: 'time',
            render: (value, item) => (
              <div>
                {value && moment(value).format('YYYY/MM/DD')} -{' '}
                {value && moment(value).format('HH')} giờ
              </div>
            ),
          }),
          // TableUtils.createColumnUpdatedAt(),
          TableUtils.createEditAndDeleteControlColumn(t('Action')),
        ]}
      />
    </HFeature>
  );
};

export default SendEmailFINAManagement;
