import { Drawer } from 'antd';
import React from 'react';

import './view.module.scss';

interface MobileDrawerProps {
  visible: boolean;
  onClose: Function | any;
  children: any;
  className?: string;
  placement?: any;
  logo?: any;
  title?: any
}

export const MobileDrawer = (props: MobileDrawerProps) => {
  const { visible, onClose, children, logo, title, placement = 'top', className = '' } = props;
  const titleContent = (
    <div>
      {logo}
      {title}
    </div>
  );
  return (
    <Drawer
      title={titleContent}
      className={`_mobile_drawer ${className}`}
      placement={placement}
      onClose={onClose}
      height={'100%'}
      visible={visible}
      width={'100%'}
      destroyOnClose={true}
      footer={null}
    >
      {children}
    </Drawer>
  );
};