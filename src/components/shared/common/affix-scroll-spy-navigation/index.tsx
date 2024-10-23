import ScrollSpy from 'react-scrollspy-navigation';
import { createRef, ReactNode } from 'react';
import { Affix, AffixProps } from 'antd';
import cls from 'classnames';

import './affix-scroll-spy-navigation.module.scss';

type AffixScrollSpyNavigationMenuConfig = {
  children: ReactNode,
  href: string,
  className?: string,
}

interface AffixScrollSpyNavigationProps extends Omit<AffixProps, 'children'> {
  menuConfigs: AffixScrollSpyNavigationMenuConfig[],
}

const AffixScrollSpyNavigation = (props: AffixScrollSpyNavigationProps) => {
  const { menuConfigs, ...affixProps } = props;
  return (
    <Affix {...affixProps}>
      <div className="affix-scroll-spy-navigation">
        <ScrollSpy>
          {menuConfigs.map((config, index) => {
            const { children, href, className } = config;
            return (
              <a key={`affix-scroll-navigation-${index}`} {...{
                className: cls(className),
                href,
                ref: createRef(),
              }}>
                {children}
              </a>
            );
          })}
        </ScrollSpy>
      </div>
    </Affix>
  );
};

export default AffixScrollSpyNavigation;
