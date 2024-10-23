import { SystemMenu } from '@components/shared/menu';
import { Layout } from 'antd';
import { useTranslation } from 'react-i18next';
import { RouteUtils } from '../../../../components/shared/layout/router-contaner/utils';
import { getLeftMenu } from '../../common/tools/building-left-menu';

const { Sider } = Layout;

export const AdminLeftMenu = ({ collapsed }) => {
  const { t } = useTranslation('admin-menu');
  const menus = getLeftMenu(t);
  if (menus.length === 0) {
    return null;
  }
  return (
    <Sider
      width={250}
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="_menu-slider"
    >
      <SystemMenu
        {...{
          className: '_left-menu',
          mode: 'inline',
          defaultSelectedKeys: [RouteUtils.getCurrentAdminPath()],
          schema: getLeftMenu(),
          style: { height: '100%', borderRight: 0 },
        }}
      />
    </Sider>
  );
};
