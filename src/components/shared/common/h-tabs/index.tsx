import { Tabs, TabsProps } from 'antd';
import { TabsType } from 'antd/lib/tabs';
import classNames from 'classnames';
import React from 'react';

import './h-tabs.module.scss';

interface HTabsProps extends Omit<TabsProps, 'type'> {
  type?: TabsType | 'button'
}

const HTabs = (props: HTabsProps) => {
  const { children, type, ...resProps } = props;
  const isButtonType = type === 'button';

  return (
    <div className={classNames('h-tabs', { 'button-type': isButtonType })}>
      <Tabs
        type={isButtonType ? undefined : type}
        {...resProps}
      >{children}</Tabs>
    </div>
  );
};
HTabs.TabPane = Tabs.TabPane;
export default HTabs;
