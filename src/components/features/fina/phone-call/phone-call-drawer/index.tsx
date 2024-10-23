import { useCurrentUser, useIsAuthenticated } from '@lib/providers/auth';
import { HFeature } from '@schema-form/features';
import { setDataSource } from '@schema-form/features/actions';
import { useTableSourceData } from '@schema-form/features/hooks';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import { Drawer } from 'antd';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { PhoneCallMainDisplay } from '../phone-call-content/phone-call-main-display';

import './phone-call-drawer.module.scss';

interface PhoneCallDrawerProps {
  featureId?: string;
  visible: boolean;
  onClose?: Function;
}

const PhoneCallDrawer = ({
  featureId,
  visible,
  onClose,
}: PhoneCallDrawerProps) => {
  const currentUser = useCurrentUser();
  const isAuthenticated = useIsAuthenticated();
  const fId = featureId || 'phoneCall';
  const phoneCalls = useTableSourceData(fId);
  const dispatch = useDispatch();
  const onPhoneCallClose = () => {
    if (onClose) onClose();
  };
  const onMessage = useCallback(
    (newPhoneCall) => {
      dispatch(
        setDataSource({
          featureId: fId,
          dataSource: [newPhoneCall, ...phoneCalls],
        }),
      );
    },
    [phoneCalls],
  );

  // useEffect(() => {
  // 	NotificationUtils.listenFirebaseChannel(onMessage);
  // }, [onMessage]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <HFeature
      {...{
        featureId: fId,
        nodeName: 'phoneCalls',
        documentIdName: 'phoneCallId',
      }}
    >
      <HSearchFormHiddenAble
        {...{
          hiddenFields: { userId: currentUser?.id },
          hiddenValues: { filter: { order: ['createdAt DESC'] } },
        }}
      />
      <Drawer {...{ visible, getContainer: false, onClose: onPhoneCallClose }}>
        {/*<PhoneCallDrawerHeader />*/}
        <PhoneCallMainDisplay
          {...{
            callHandleIncognito: false,
            keyBoardNumber: true,
          }}
        />
      </Drawer>
    </HFeature>
  );
};

export default PhoneCallDrawer;
