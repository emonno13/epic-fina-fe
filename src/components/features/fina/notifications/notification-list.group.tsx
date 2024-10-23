import NotificationsList from './notifications-list';

const NotificationListGroup = ({ title, notifications = [], onClose }) => {
  return (
    <div className="notification-list-group">
      <div className="notification-list-group__title">{title}</div>
      <NotificationsList {...{ notifications, onClose }} />
    </div>
  );
};

export default NotificationListGroup;
