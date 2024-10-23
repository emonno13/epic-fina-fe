import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useHTranslation } from '@lib/i18n';
import {
  useAuth,
  useCurrentUser,
  useIsAuthenticated,
} from '@lib/providers/auth';
import { useMeliSocket } from '@schema-form/ws/hooks';
import { Avatar, Dropdown } from 'antd';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { disconnectMeliSocket, setPermission } from 'store/actions';
import { RouteUtils } from '../layout/router-contaner/utils';
import { getUserHeaderAvatarOverlayData } from './constants';

import './user-header-avatar.module.scss';

const UserHeaderAvatarOverlay = () => {
  const { t } = useHTranslation('common');
  const dispatch = useDispatch();
  const {
    setAuthenticated,
    setCurrentUser,
    setToken,
    setUserPermissions,
    currentUser,
  } = useAuth();
  const data = getUserHeaderAvatarOverlayData(t);
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
  };
  const onClick = async (key) => {
    if (key === 'profile') await RouteUtils.redirect('/admin/profiles');
    if (key === 'dashboard') await RouteUtils.redirect('/admin/dashboard');
    if (key === 'logout') handleLogout();
  };
  return (
    <div className="user-header-avatar-overlay">
      {data.map(({ icon, label, key }, index) => (
        <div
          key={`user-header-avatar-overlay-${index}`}
          className="user-header-avatar-overlay-item"
          onClick={() => onClick(key)}
        >
          {icon}
          <span className="user-header-avatar-overlay-item-label">{label}</span>
        </div>
      ))}
    </div>
  );
};

const UserHeaderAvatar = () => {
  const isAuthenticated = useIsAuthenticated();
  const currentUser = useCurrentUser();

  if (!isAuthenticated) return null;
  return (
    <Dropdown
      trigger={['click', 'hover']}
      overlay={<UserHeaderAvatarOverlay />}
    >
      <div className="user-header-avatar">
        <Avatar
          {...{
            className: 'user-header-avatar-main',
            size: 24,
            icon: <UserOutlined />,
            src: currentUser.avatar,
          }}
        />
        <span className="user-header-avatar-name">{currentUser.fullName}</span>
        <DownOutlined />
      </div>
    </Dropdown>
  );
};

export default UserHeaderAvatar;
