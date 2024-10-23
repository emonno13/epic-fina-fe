import { useHTranslation } from '@lib/i18n';
import ContactMenuItem from './contact-menu-item';
import CreateTaskButton from './create-task-button';
import MenuItem from './menu-item';

import './footer-menu.scss';

const FooterMenu = () => {
  const { t } = useHTranslation('mobile');
  return (
    <div className={'footer-menu'}>
      <MenuItem
        {...{
          iconPathActive: '/assets/images/icons/ic_home-active.svg',
          iconPath: '/assets/images/icons/ic_home.svg',
          label: t('Home menu', {
            en: 'Home',
            vn: 'Home',
          }),
          redirectPath: '/admin/m-dashboard',
        }}
      />
      <MenuItem
        {...{
          iconPathActive: '/assets/images/icons/ic_search-active.svg',
          iconPath: '/assets/images/icons/ic_search.svg',
          label: t('Product menu', {
            en: 'Product',
            vn: 'Sản phẩm',
          }),
          redirectPath: '/admin/m-products',
        }}
      />
      <CreateTaskButton />
      <MenuItem
        {...{
          iconPathActive: '/assets/images/icons/ic_folder-active.svg',
          iconPath: '/assets/images/icons/ic_folder.svg',
          label: t('Management menu', {
            en: 'Management',
            vn: 'Quản lý',
          }),
          redirectPath: '/admin/m-management',
          isAuthenticateMenu: true,
        }}
      />
      <MenuItem
        {...{
          iconPathActive: '/assets/images/icons/ic_account-active.svg',
          iconPath: '/assets/images/icons/ic_account.svg',
          customIcon: <ContactMenuItem />,
          label: t('Contact', {
            en: 'Contact',
            vn: 'Hỗ trợ',
          }),
        }}
      />
    </div>
  );
};

export default FooterMenu;
