import { UserOutlined } from '@ant-design/icons';
import { NotificationUtils } from '@components/shared/firebase/notification/utils';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { ConverterUtils } from '@lib/converter';
import { MobileUtils } from '@lib/utils/mobile';
import {
  useSetDataSource,
  useTableSourceData,
} from '@schema-form/features/hooks/table-hooks';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Avatar } from 'antd';
import { useTranslation } from 'react-i18next';
import { NOTIFICATION_STATUSES } from '../constants';

const NotificationsListItem = ({
  notificationData,
  onClose,
  notificationIndex,
}) => {
  const {
    id,
    createdAt = new Date(),
    status = NOTIFICATION_STATUSES.UNREAD,
    url,
  } = notificationData || {};
  const { t } = useTranslation('admin-common');
  const setDataSource = useSetDataSource();
  const allNotifications = useTableSourceData() || [];
  const readNotification = () => {
    const cloneNotifications = [...allNotifications];
    cloneNotifications[notificationIndex] = {
      ...notificationData,
      status: NOTIFICATION_STATUSES.READ,
    };
    setDataSource(cloneNotifications);
  };

  const onNotificationClick = async () => {
    if (onClose) onClose();
    if (status === NOTIFICATION_STATUSES.UNREAD) {
      readNotification();
      if (id) {
        await FormUtils.submitForm(
          { status: NOTIFICATION_STATUSES.READ },
          {
            nodeName: `notifications/${id}`,
            method: 'put',
            showSuccessMessage: false,
          },
        );
      }
    }
    if (url && !MobileUtils.checkIsWebView()) {
      try {
        const { hostname, pathname, search } = new URL(url);
        if (hostname === window.location.hostname) {
          await RouteUtils.redirect(`${pathname}${search}`);
          return;
        }
        window.open(url, '_blank')?.focus();
      } catch (error) {
        console.log('url error', error);
      }
    }
  };

  return (
    <div className="notification-item" onClick={onNotificationClick}>
      <div className="notification-item__left-content">
        <div className="notification-item__avatar">
          <Avatar size={48} icon={<UserOutlined />} />
        </div>
        <div className="notification-item__content">
          <div>
            {NotificationUtils.getTranslatedNotification({
              t,
              notificationData,
            })}
          </div>
          <div className="notification-item__content__created-date">
            {ConverterUtils.fullDatetimeConverter(createdAt)}
          </div>
        </div>
      </div>
      {status === NOTIFICATION_STATUSES.UNREAD && (
        <div className="notification-item__unread-circle"></div>
      )}
    </div>
  );
};

export default NotificationsListItem;
