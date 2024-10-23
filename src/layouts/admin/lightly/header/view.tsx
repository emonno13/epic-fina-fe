import { MenuOutlined } from '@ant-design/icons';
import NotificationsButton from '@components/features/fina/notifications/notifications-button';
import { Link } from '@components/shared/link';
import { TopMenuConfigs } from '@layouts/admin/common/top-menu-configs';
import { Divider } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { DialButton as DialButtonSDK } from 'fccs-sdk/dist';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DialButton } from '../../../../components/features/business/dial';
import { LanguageSwitcher } from '../../../../components/shared/common/language-switcher';
import { RouteUtils } from '../../../../components/shared/layout/router-contaner/utils';
import { SystemMenu } from '../../../../components/shared/menu';
import { ProfileMenu } from '../../../../components/shared/user/profile-menu';
import { useDispatchShowLeftMenu, useShowLeftMenu } from '../../../hooks';

import './lightly-header.module.scss';

export const LightLyHeader = ({
  switchLeftMenuCollapsed,
  onToggleNofication,
  ...props
}) => {
  const { asPath } = useRouter();
  const { t } = useTranslation('admin-menu');
  const isShowLeftMenu = useShowLeftMenu();
  const handleShowHide = useDispatchShowLeftMenu();
  const defaultSelectedKeys = useMemo(() => {
    return Object.values(RouteUtils.getAllAdminKeyAndPathsFromRoute());
  }, [asPath]);

  return (
    <Header className="ui-lightly-header">
      <div className="ui-logo-panel">
        <Link href="/">
          <img className="logo" src="/assets/images/fina_logo.png" />
        </Link>
      </div>
      <div className="top-menu-panel">
        <SystemMenu
          {...{
            mode: 'horizontal',
            defaultSelectedKeys,
            schema: TopMenuConfigs(t),
          }}
        />
      </div>
      <Divider type="vertical" className="divider" />
      <div className="ui-right-control">
        <div className="notification-button notification-button--call">
          {process.env.NEXT_PUBLIC_USED_FCCS_SDK ? (
            <DialButtonSDK />
          ) : (
            <DialButton />
          )}
        </div>
        <div className="notification-button">
          <NotificationsButton onVisible={onToggleNofication} />
        </div>
        <div className="icon m-r-10">
          <LanguageSwitcher className="header-height" />
        </div>
        <div className="icon">
          <ProfileMenu />
        </div>
        <div className="icon m-l-5 mobile-menu">
          <span onClick={() => handleShowHide(!isShowLeftMenu)}>
            <MenuOutlined />
          </span>
        </div>
      </div>
    </Header>
  );
};
