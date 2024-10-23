import { BellFilled, BellOutlined } from '@ant-design/icons';
import { useTableSourceData } from '@schema-form/features/hooks';
import { Badge } from 'antd';
import { useMemo } from 'react';
import { NOTIFICATION_STATUSES } from './constants';

interface NotificationsButtonProps {
  onVisible: Function;
  featureId?: string;
  iconFill?: boolean;
}

const NotificationsButton = ({
  onVisible,
  featureId,
  iconFill = false,
}: NotificationsButtonProps) => {
  const onClick = () => {
    onVisible();
  };
  const notifications = useTableSourceData(featureId || 'notifications');
  const unreadNotifications = useMemo(() => {
    if (!Array.isArray(notifications) || notifications?.length < 1) {
      return 0;
    }
    return (
      notifications?.filter(
        (notificationItems) =>
          notificationItems?.status === NOTIFICATION_STATUSES.UNREAD,
      )?.length || 0
    );
  }, [notifications]);

  return (
    <Badge count={unreadNotifications}>
      {!iconFill && <BellOutlined onClick={onClick} />}
      {iconFill && <BellFilled onClick={onClick} />}
    </Badge>
  );
};

export default NotificationsButton;
