import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { ChangePasswordForm } from '@components/shared/user/forgot-password/change-password-form';
import { useCurrentUser } from '@lib/providers/auth';

const MobileChangePassword = () => {
  const currentUser = useCurrentUser();
  const onSuccess = () => {
    RouteUtils.redirect('/admin/m-profile');
  };
  return (
    <ChangePasswordForm
      {...{
        layout: 'vertical',
        user: currentUser,
        onSuccess,
      }}
    />
  );
};

export default MobileChangePassword;
