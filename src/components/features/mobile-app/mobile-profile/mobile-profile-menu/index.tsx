import { FileAddFilled, FileTextFilled, IdcardFilled } from '@ant-design/icons';
import { useHTranslation } from '@lib/i18n';
import { useAuth } from '@lib/providers/auth';
import { MessageUtils } from '@lib/utils/message';
import { MESSAGE_TYPE } from 'constants/mobile-app';
import Cookies from 'js-cookie';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useMeliSocket } from '@schema-form/ws/hooks';
import { disconnectMeliSocket, setPermission } from 'store/actions';
import MobileProfileMenuItem from './mobile-profile-menu-item';

import './mobile-profile-menu.scss';

const MobileProfileMenu = () => {
  const {
    setAuthenticated,
    setCurrentUser,
    setToken,
    setUserPermissions,
    currentUser,
  } = useAuth();
  const dispatch = useDispatch();
  const { t } = useHTranslation('mobile');
  const { push } = useRouter();
  const socket = useMeliSocket();

  const handleLogout = async () => {
    if (currentUser?.id && socket) {
      dispatch(disconnectMeliSocket());
    }
    setAuthenticated(false);
    setCurrentUser({});
    setToken('');
    setUserPermissions([]);
    Cookies.remove('h2token');
    Cookies.remove('refreshToken');
    Cookies.remove('h2user');
    Cookies.remove('stringeeToken');
    Cookies.remove('h2permissions');
    Cookies.remove('stringeeAgent');
    Cookies.remove('stringeeTokenApi');
    Cookies.remove('expiresIn');
    dispatch(setPermission({ permissions: [] }));
    MessageUtils.postMessageToWebview(MESSAGE_TYPE.LOGOUT);
    await push('/admin/m-dashboard');
  };

  return (
    <div className="mobile-profile-menu">
      <MobileProfileMenuItem
        iconSrc="/assets/images/icons/ic_profile-privacy.svg"
        label={t('Change password', {
          en: 'Change password',
          vn: 'Đổi mật khẩu',
        })}
        link="/admin/m-change-password"
      />
      <MobileProfileMenuItem
        icon={<IdcardFilled style={{ fontSize: 24, color: '#0a3eca' }} />}
        label={t('Account identifier', {
          en: 'Account identifier',
          vn: 'Định danh tài khoản',
        })}
        link="/admin/profiles/account-identifier"
      />
      <MobileProfileMenuItem
        icon={<FileTextFilled style={{ fontSize: 24, color: '#0a3eca' }} />}
        label={t('Collaborator contract', {
          en: 'Collaborator contract',
          vn: 'Hợp đồng cộng tác viên',
        })}
        link="/admin/profiles/contract"
      />
      <MobileProfileMenuItem
        icon={<FileAddFilled style={{ fontSize: 24, color: '#0a3eca' }} />}
        label={t('Document management', {
          en: 'Document management',
          vn: 'Quản lý tài liệu',
        })}
        link={`/admin/profiles/documents?timestamp=${moment().valueOf()}`}
      />
      <MobileProfileMenuItem
        iconSrc="/assets/images/icons/ic_profile-logout.svg"
        label={t('Logout', { en: 'Logout', vn: 'Đăng xuất' })}
        onClick={handleLogout}
      />
    </div>
  );
};

export default MobileProfileMenu;
