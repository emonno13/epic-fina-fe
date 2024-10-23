import Layout from 'antd/lib/layout/layout';
import Sticky from 'react-sticky-el';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import { Menu } from 'antd';
import ClientFooter from './footer';
import ClientToppedHeader from './topped-header';
import ClientHeaderDocumentation from './header/header-menu/client.header.documentation';
import { Link } from '../../../../components/shared/link';
import { normalizeDocMenuData, useFetchMenusConfigOfDocPage } from '../../../../components/features/docs/utils';
import HScrollbar from '../../../../components/shared/common/h-scrollbar';

import './lightly-client.module.scss';
import './lightly-client.module.scss';

const View = ({ children }) => {
  const menusData = useFetchMenusConfigOfDocPage();
  const menusConfig = normalizeDocMenuData(menusData);
  const router = useRouter();
  const { asPath } = router;
  const featureNames = asPath.split('/');
  const categorySlug = featureNames[2];
  const documentationSlug = featureNames[3];
  const defaultSelectedKeys = documentationSlug ? `/docs/${categorySlug}/${documentationSlug}` : 'Overview';

  return (
    <Layout style={{ backgroundColor: '#ffffff' }} className={'layout-docs'}>
      <ClientToppedHeader />
		
      <Sticky stickyStyle={{ zIndex: 10 }} scrollElement=".height100percent">
        <ClientHeaderDocumentation {...{ visible: false, onVisible: false }} />
      </Sticky>

      <HScrollbar >
        <div className={'max-w-1200 m-auto docs'}>
          <Menu
            className="docs--menu"
            mode="inline"
            defaultOpenKeys={[`docs/${categorySlug}`]}
            defaultSelectedKeys ={[`${defaultSelectedKeys}`]}
          >
            <Menu.Item key= "Overview">
              <Link href={'/docs'}>
							Overview
              </Link>
            </Menu.Item>
            {menusConfig.map(menuItem => {
              const { href, name, children } = menuItem;
              if (isEmpty(children)) {
                return (
                  <Menu.Item key={href}>
                    <Link href={href}>
                      {name}
                    </Link>
                  </Menu.Item>
                );
              }
              return (
                <Menu.SubMenu key={href} title={name}>
                  {children.map(item => {
                    const { href, name } = item;
                    return (
                      <Menu.Item key={href}>
                        <Link href={href}>
                          {name}
                        </Link>
                      </Menu.Item>
                    );
                  })}
                </Menu.SubMenu>
              );
            })}
          </Menu>
          <div className={'docs--content'}>
            {children}
          </div>
        </div>
      </HScrollbar>
      <ClientFooter />
    </Layout>
  );
};

export default View;
