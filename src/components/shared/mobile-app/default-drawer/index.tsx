import { Drawer, DrawerProps } from 'antd';
import DefaultDrawerTitle from './default-drawer-title';

import './default-drawer.scss';

export interface MobileAppDefaultDrawerProps extends DrawerProps {
  children: any;
}

const MobileAppDefaultDrawer = (props: MobileAppDefaultDrawerProps) => {
  const { children, title, className, closeIcon, ...rest } = props;
  const renderTitle = title || <DefaultDrawerTitle />;
  const renderCloseIcon = closeIcon || <img src="/assets/images/ic_mobile-back-arrow.svg" />;
  return (
    <Drawer
      {...rest}
      className={className || 'mobile-default-drawer'}
      closeIcon={renderCloseIcon}
      title={renderTitle}
    >
      {children}
    </Drawer>
  );
};

export default MobileAppDefaultDrawer;
