import NotificationsListItem from './notifications-list.item';

import './notification-list.module.scss';

const NotificationsList = ({ notifications, onClose }) => {
  if (!Array.isArray(notifications) || notifications.length < 1) {
    return null;
  }
  return (
    <>
      {notifications.map((notificationData, index) => (
        <NotificationsListItem
          key={`notification-item-${index}`}
          {...{ notificationData, onClose, notificationIndex: index }}
        />
      ))}
    </>
  );
};

export default NotificationsList;
