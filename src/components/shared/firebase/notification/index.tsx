import React, { useEffect } from 'react';
import { NotificationUtils } from './utils';
import { useAuth } from '../../../../lib/providers/auth';

export default (_props) => {

  const { currentUser } = useAuth();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      setTimeout(async () => {
        await NotificationUtils.checkMessagingToken(currentUser?.id);
      }, 2000);
    }
  }, []);

  return <span/>;
};

