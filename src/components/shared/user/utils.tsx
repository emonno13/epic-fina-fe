import { useHandleLogout } from '@lib/hooks/authentication';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

interface LogoutProps {
  redirectUrl?: string;
  label?: string;
}

export const Logout = (props: LogoutProps) => {
  const { t } = useTranslation('common');
  const { label = t('logout') } = props;

  const handleLogout = useHandleLogout();
  return <span onClick={() => handleLogout()}>{label}</span>;
};

interface HandleLoginPrams {
  response: any;
  useAuthObject: any;
  callback?: Function;
}

export const handleLogin = ({
  response,
  useAuthObject,
  callback,
}: HandleLoginPrams) => {
  const { setAuthenticated, setCurrentUser, setToken, setUserPermissions } =
    useAuthObject;
  const {
    user,
    accessToken,
    refreshToken,
    expiresIn,
    permissions = [],
  } = response || {};

  setAuthenticated(true);
  setCurrentUser(user);
  setToken(accessToken);
  setUserPermissions(permissions);
  Cookies.set('h2token', accessToken, { expires: 365 });
  Cookies.set('refreshToken', refreshToken, { expires: 365 });
  Cookies.set('expiresIn', expiresIn, { expires: 365 });
  Cookies.set('h2user', JSON.stringify(user), { expires: 365 });

  if (callback) {
    callback();
  }
};
