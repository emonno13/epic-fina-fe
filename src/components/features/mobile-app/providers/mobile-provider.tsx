import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MobileContext } from '../contexts/mobile-context';
import MobileCreateTask from '../mobile-create-task';
import MobileLogin from '../mobile-login';

export const MobileProvider = ({ children }) => {
  const router = useRouter();
  const [taskExtraValues, setTaskExtraValues] = useState({
    type: '',
    subject: '',
  });
  const [createTaskVisible, setCreateTaskVisible] = useState(false);
  const [redirect, setRedirect] = useState('');
  const drawerVisible = router.query.openLogin === 'true';
  const handleDrawerVisible = async (flag: boolean) => {
    const redirectPath = redirect || RouteUtils.getAdminBasePathFromRoute();
    await RouteUtils.redirect(`${redirectPath}?openLogin=${flag}`);
  };
  return (
    <MobileContext.Provider
      value={{
        loginDrawerVisible: drawerVisible,
        setLoginDrawerVisible: handleDrawerVisible,
        setRedirect,
        createTaskVisible,
        setCreateTaskVisible,
        taskExtraValues,
        setTaskExtraValues,
      }}
    >
      {children}
      <MobileLogin />
      <MobileCreateTask />
    </MobileContext.Provider>
  );
};
