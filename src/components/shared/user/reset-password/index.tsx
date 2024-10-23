import Cookies from 'js-cookie';
import { useMemo } from 'react';

import PreLoginFrame from '@components/shared/common/pre-login-frame/pre-login-frame';
import { ChangePasswordForm } from '../forgot-password/change-password-form';

export const ResetPasswordForm = ({ layout }: any) => {
  const user = useMemo(() => {
    const userFromCookies = Cookies.get('h2user') || '{}';
    if (userFromCookies && typeof userFromCookies === 'string') {
      return JSON.parse(userFromCookies);
    }
    return {};
  }, []);

  return (
    <PreLoginFrame>
      <div className={'pre-login'}>
        <ChangePasswordForm layout={layout} user={user} />
      </div>
    </PreLoginFrame>
  );
};
