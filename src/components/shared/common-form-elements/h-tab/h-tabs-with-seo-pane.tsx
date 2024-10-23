import { Tabs } from 'antd';
import { FC, ReactNode } from 'react';

import { HSeo } from '../h-seo-element';
import { DEFAULT_FIELD_NAME_OF_SEO } from '../h-seo-element/constants';

const { TabPane } = Tabs;

export interface TabsWithSeoPaneProps {
  children: ReactNode;
  SEOFieldName?: string;
  className?: string;
}

export const HTabsWithSeoPane: FC<TabsWithSeoPaneProps> = (props) => {
  const { children, className, SEOFieldName = DEFAULT_FIELD_NAME_OF_SEO } = props;

  return <Tabs className={className}>
    {children}

    <TabPane tab="SEO" key={SEOFieldName} forceRender>
      <HSeo SEOFieldName={SEOFieldName} />
    </TabPane>
  </Tabs>;
};
