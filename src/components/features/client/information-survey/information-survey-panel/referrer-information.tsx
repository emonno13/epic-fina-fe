import { UserOutlined } from '@ant-design/icons';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser, useIsAuthenticated } from '@lib/providers/auth';
import { Avatar, Button } from 'antd';
import { useMemo } from 'react';

const ReffererInformation = () => {
  const { t } = useHTranslation('common');
  const isAuthenticated = useIsAuthenticated();
  const currentUser = useCurrentUser();
  console.log('currentUser', currentUser);
  const fullName = useMemo(() => {
    const { fullName, firstName, lastName } = currentUser || {};

    return fullName || `${lastName || ''} ${firstName || ''}`;
  }, [currentUser]);
  return (
    <div className="refferer-information">
      {!isAuthenticated && (
        <>
          <p className="description">
            {t('Sign up to receive commissions', {
              vn: 'Đăng ký để nhận hoa hồng',
            })}
          </p>
          <div className="btns-container">
            <Button
              {...{
                type: 'link',
                href: '/users/signup',
                className: 'sign-up',
              }}
            >
              {t('Sign up', { vn: 'Đăng ký' })}
            </Button>
            <Button
              {...{
                type: 'link',
                href: `/users/login?redirect=${location.pathname}`,
                className: 'login',
              }}
            >
              {t('Login', { vn: 'Đăng nhập' })}
            </Button>
          </div>
        </>
      )}
      {isAuthenticated && (
        <div className="user-info-container">
          <Avatar
            {...{
              size: 50,
              src: currentUser?.avatar,
              icon: <UserOutlined />,
            }}
          />
          <div className="user-info">
            <p className="name">{fullName}</p>
            <p className="email">{`${currentUser?.emails?.[0]?.email}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReffererInformation;
