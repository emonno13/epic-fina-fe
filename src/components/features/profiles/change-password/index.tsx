import { ChangePasswordForm } from '@components/shared/user/forgot-password/change-password-form';
import Cookies from 'js-cookie';

import './change-password.module.scss';

const ChangePassword = () => {
  const currentUser = Cookies.getJSON('h2user');
  return (
    <div className="pre-login reset-password-profile-screen">
      <ChangePasswordForm user={currentUser} useDefaultClassName={false} />
    </div>
  );
};

export default ChangePassword;
