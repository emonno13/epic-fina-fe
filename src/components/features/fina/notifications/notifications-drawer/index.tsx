import { NotificationUtils } from '@components/shared/firebase/notification/utils';
import { useCurrentUser, useIsAuthenticated } from '@lib/providers/auth';
import { HFeature } from '@schema-form/features';
import { setDataSource } from '@schema-form/features/actions';
import { useTableSourceData } from '@schema-form/features/hooks';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import { Drawer } from 'antd';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NotificationMainDisplay from '../notifications.main-display';
import NotificationsDrawerHeader from './notifications-drawer.header';

import './notifications-drawer.module.scss';

interface NotificationsDrawerProps {
  featureId?: string;
  visible: boolean;
  onClose?: Function;
}

const NotificationsDrawer = ({
  featureId,
  visible,
  onClose,
}: NotificationsDrawerProps) => {
  const currentUser = useCurrentUser();
  const isAuthenticated = useIsAuthenticated();
  const fId = featureId || 'notifications';
  const notifications = useTableSourceData(fId);
  const dispatch = useDispatch();
  const onNotifcationClose = () => {
    if (onClose) onClose();
  };

  useEffect(() => {
    NotificationUtils.getMessagingToken();
  }, []);

  useEffect(() => {
    NotificationUtils.onFirebaseCloudMessageListener((notificationPayload) => {
      const notificationData = JSON?.parse(
        notificationPayload?.data?.notificationData || {},
      );
      if (isEmpty(notificationData)) {
        return;
      }

      dispatch(
        setDataSource({
          featureId: fId,
          dataSource: [notificationData, ...notifications],
        }),
      );
    });
  });

  if (!isAuthenticated) {
    return null;
  }
  return (
    <HFeature
      {...{
        featureId: fId,
        nodeName: 'notifications',
        documentIdName: 'notificationId',
      }}
    >
      <HSearchFormHiddenAble
        {...{
          hiddenFields: { userId: currentUser?.id },
          hiddenValues: { filter: { order: ['createdAt DESC'] } },
        }}
      />
      <Drawer
        {...{ visible, getContainer: false, onClose: onNotifcationClose }}
      >
        <NotificationsDrawerHeader featureId={fId} />
        <NotificationMainDisplay onClose={onClose} />
      </Drawer>
    </HFeature>
  );
};

export default NotificationsDrawer;
