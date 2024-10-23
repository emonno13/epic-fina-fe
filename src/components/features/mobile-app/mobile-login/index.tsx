import MobileAppDefaultDrawer from '@components/shared/mobile-app/default-drawer';
import { LoginForm } from '@components/shared/user/login';
import { DrawerProps } from 'antd';
import { useMobile } from '../hooks/login-drawer-hooks';

import './mobile-login.scss';

const MobileLogin = (props: DrawerProps) => {
  const { loginDrawerVisible, setLoginDrawerVisible } = useMobile();
  const mobileAfterLoginSuccess = () => {
    setLoginDrawerVisible(false);
  };
  return (
    <MobileAppDefaultDrawer
      {...props}
      visible={loginDrawerVisible}
      footer={null}
      onClose={() => setLoginDrawerVisible(false)}
      destroyOnClose
      contentWrapperStyle={{ width: '100%' }}
      closeIcon={<img src="/assets/images/ic_mobile-back-arrow-gray.svg" />}
      title={<div></div>}
      className="mobile-login"
    >
      <LoginForm
        {...{
          onGotSuccess: mobileAfterLoginSuccess,
          showSuccessMessage: false,
        }}
      />
    </MobileAppDefaultDrawer>
  );
};

export default MobileLogin;
