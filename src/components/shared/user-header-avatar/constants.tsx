import { DashboardOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

export const getUserHeaderAvatarOverlayData = (t) => [
  {
    icon: <DashboardOutlined />,
    label: t('Dashboard', { en: 'Dashboard', vn: 'Bảng điều khiển' }),
    key: 'dashboard',
  },
  {
    icon: <UserOutlined />,
    label: t('Profile', { en: 'Profile', vn: 'Trang cá nhân' }),
    key: 'profile',
  },
  {
    icon: <LogoutOutlined />,
    label: t('Logout', { en: 'Logout', vn: 'Đăng xuất' }),
    key: 'logout',
  },
];
