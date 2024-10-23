import { useHTranslation } from '@lib/i18n';
import { useTableSourceData } from '@schema-form/features/hooks';
import { useSetDataSource } from '@schema-form/features/hooks/table-hooks';
import { FormUtils } from '@schema-form/utils/form-utils';
import { NOTIFICATION_STATUSES } from '../constants';

const NotificationsDrawerHeader = ({ featureId }) => {
  const { t } = useHTranslation('admin-common');
  const notifications = useTableSourceData(featureId);
  const setDataSource = useSetDataSource();
  const onReadAll = async () => {
    await FormUtils.submitForm(
      {},
      {
        nodeName: 'notifications/read-all',
        method: 'post',
        showSuccessMessage: false,
        onGotSuccess: () => {
          setDataSource(
            notifications?.map((notificationData) => ({
              ...notificationData,
              status: NOTIFICATION_STATUSES.READ,
            })),
          );
        },
      },
    );
  };
  return (
    <div className="notification-drawer-header">
      <b className="notification-drawer-header__title">
        {t('Notification', { vn: 'Thông báo', en: 'Notification' })}
      </b>
      <u
        className="notification-drawer-header__mark-all-read"
        onClick={onReadAll}
      >
        {t('Mark all read', {
          vn: 'Đánh dấu tất cả đã đọc',
          en: 'Mark all read',
        })}
      </u>
    </div>
  );
};

export default NotificationsDrawerHeader;
