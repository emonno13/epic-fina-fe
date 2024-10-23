import { MenuOutlined } from '@ant-design/icons';
import { MobileDrawer } from '@components/shared/layout/mobile-drawer';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { SystemMenu } from '@components/shared/menu/index';
import { Layout } from 'antd';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { LanguageSwitcher } from '../../../../components/shared/common/language-switcher';
import { ProfileMenu } from '../../../../components/shared/user/profile-menu';
import { TopMenuConfigs } from '../../common/top-menu-configs';
import { SiteHeaderLogo } from '../logo';

const { Header } = Layout;

export const AdminHeader = ({ onLeftMenuToggle, setShowLeftMenu }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { asPath } = useRouter();
  const { t } = useTranslation('admin-menu');
  const defaultSelectedKeys = useMemo(() => {
    return Object.values(RouteUtils.getAllAdminKeyAndPathsFromRoute());
  }, [asPath]);

  return (
    <>
      <Header className="header">
        <SiteHeaderLogo {...{ onLeftMenuToggle }} />
        <div className="header-top-content">
          <div className="desktop-panel">
            <SystemMenu
              {...{
                mode: 'horizontal',
                defaultSelectedKeys,
                schema: TopMenuConfigs(t),
              }}
            />
          </div>
        </div>
        <div className="right-top-menu">
          <div className="icon m-r-10">
            <LanguageSwitcher className="header-height" />
          </div>
          <div className="icon">
            <ProfileMenu />
          </div>
          <div className="icon m-l-5 mobile-menu">
            <span onClick={() => setShowMobileMenu(true)}>
              <MenuOutlined />
            </span>
          </div>
        </div>
        <MobileDrawer
          {...{
            visible: showMobileMenu,
            className: 'p-0i',
            onClose: () => setShowMobileMenu(false),
            logo: <SiteHeaderLogo {...{ onLeftMenuToggle }} />,
          }}
        >
          <SystemMenu
            {...{
              mode: 'vertical-left',
              defaultSelectedKeys,
              onClick: () => {
                setShowLeftMenu(false);
                setShowMobileMenu(false);
              },
              schema: TopMenuConfigs(t),
            }}
          />
        </MobileDrawer>
      </Header>
    </>
  );
};
