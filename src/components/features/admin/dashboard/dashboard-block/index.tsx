import { Card } from 'antd';
import { useState } from 'react';

import './dashboard-block.scss';

export const DashboardBlock = ({ tabList, title = 'Title', ...props }) => {
  const getCurrentTabTable = (key) => {
    return tabList.filter((tab) => tab.key === key)[0];
  };
  const [currentTabKey, setCurrentTabKey] = useState(tabList[0]?.key || '');
  const currentTabTableContent = getCurrentTabTable(currentTabKey);

  return (
    <div className={'dashboard-block'}>
      <Card
        {...{
          style: { width: '100%' },
          title,
          tabList,
          activeTabKey: currentTabKey,
          onTabChange: (key: any) => setCurrentTabKey(key),
          ...props,
        }}
      >
        {currentTabTableContent?.content || ''}
      </Card>
    </div>
  );
};
