import { useHTranslation } from '@lib/i18n';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { PRODUCTS_MENU_DATA } from './constants';
import CollaboratorNoti from './home.collaborator-noti';
import ProductsMenu from './products-menu';
import ReferCustomer from './refer-customer';
import TopCarousel from './top-carousel';

import './home.module.scss';

const MobileHome = () => {
  const { t } = useHTranslation('mobile');
  const menuData = PRODUCTS_MENU_DATA(t);
  const router = useRouter();
  const queryType = useRef(router.query.type);
  const defaultMenuData = menuData[0];
  const [selectedMenu, setSelectedMenu] = useState(defaultMenuData);

  useEffect(() => {
    const existProductsMenuData =
      menuData.find(({ type }) => type === queryType.current) ||
      defaultMenuData;
    setSelectedMenu(existProductsMenuData);
  }, [queryType]);

  const onMenuItemClick = async (menuData) => {
    setSelectedMenu(menuData);
    await router.push({
      pathname: location.pathname,
      query: {
        type: menuData.type,
      },
    });
  };

  return (
    <>
      <TopCarousel />
      <CollaboratorNoti />
      <ProductsMenu {...{ selectedMenu, onMenuItemClick }} />
      <ReferCustomer menuData={selectedMenu} />
    </>
  );
};

export default MobileHome;
