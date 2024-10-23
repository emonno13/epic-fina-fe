import { SystemMenu } from '@components/shared/menu';
import { getLeftMenu } from '@layouts/admin/common/tools/building-left-menu';
import { Layout } from 'antd';
import classNames from 'classnames/bind';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { RouteUtils } from '../../../../components/shared/layout/router-contaner/utils';
import {
  useDispatchCollapseLeftMenuState,
  useDispatchShowLeftMenu,
  useShowLeftMenu,
} from '../../../hooks';

import './lightly-left-menu.module.scss';

const { Sider } = Layout;
export const LEFT_MENU_MAX_WIDTH = 250;
export const LEFT_MENU_MIN_WIDTH = 80;

export const AdminLeftMenu = ({ collapsed }) => {
  const { t } = useTranslation('admin-menu');
  const isShowLeftMenu = useShowLeftMenu();
  const handleShowHideLeftMenu = useDispatchShowLeftMenu();
  const dispatchCollapseLeftMenuState = useDispatchCollapseLeftMenuState();
  const menus = getLeftMenu(t);

  if (menus.length === 0) {
    return null;
  }

  return (
    <Sider
      width={LEFT_MENU_MAX_WIDTH}
      // trigger={collapsed ? <MenuUnfoldOutlined />  : <MenuFoldOutlined />}
      collapsible
      collapsed={collapsed}
      onCollapse={() => dispatchCollapseLeftMenuState(!collapsed)}
      className={classNames({
        'ui-lightly-left-menu': true,
        'ui-lightly-left-menu--mobile': !isShowLeftMenu,
        'ui-lightly-left-menu-collapsed': collapsed,
      })}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <Scrollbars>
        <SystemMenu
          {...{
            className: '_left-menu',
            mode: 'inline',
            defaultSelectedKeys: [RouteUtils.getCurrentAdminPath()],
            schema: getLeftMenu(t),
            style: { height: '100%', borderRight: 0 },
            onClick: () => handleShowHideLeftMenu(false),
          }}
        />
      </Scrollbars>
    </Sider>
  );
};
