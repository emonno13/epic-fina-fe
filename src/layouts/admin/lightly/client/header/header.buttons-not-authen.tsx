import { PhoneFilled } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { Link } from '@components/shared/link';
import { ClientHomeRegisterIcon } from 'icons';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { getMobileDropdown } from '../constants';

const OverlayMenu = () => {
  const { t } = useHTranslation('common');
  const mobileDropdownData = getMobileDropdown(t);
  return (
    <div className="client-mobile-dropdown-menu">
      {mobileDropdownData.map(({ title, href, icon }, index) => (
        <Link key={`mobile-dropwdown-menu-${index}`} href={href}>
          <div className="client-mobile-dropdown-menu__item">
            <div className="client-mobile-dropdown-menu__item__icon">
              {icon}
            </div>
            <div className="client-mobile-dropdown-menu__item__title">
              {title}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

const RightContentButtonsNotAuthenIcon = () => {
  return (
    <Dropdown trigger={['click', 'hover']} overlay={<OverlayMenu />}>
      <div className="client-home-not-authen-icon">
        <ClientHomeRegisterIcon />
      </div>
    </Dropdown>
  );
};

const RightContentButtonsNotAuthen = () => {
  const isMobile = useIsMobile();
  const { t } = useHTranslation('common');
  if (!isMobile) {
    return (
      <>
        <Button
          {...{
            className: 'ui-lightly-client-header__right-content__login',
            href: '/users/login?redirect=/vn',
            type: 'link',
          }}
        >
          {t('Login', { en: 'Login', vn: 'Đăng nhập' })}
        </Button>
        <Button
          {...{
            className: 'ui-lightly-client-header__right-content__register',
            href: '/users/signup',
            type: 'link',
          }}
        >
          <span className="ui-lightly-client-header__right-content__register__txt">
            {t('Register', { en: 'Register', vn: 'Đăng ký' })}
          </span>
          <ClientHomeRegisterIcon />
        </Button>
      </>
    );
  }
  return (
    <>
      <Button
        className="ui-lightly-client-header__right-content__contact-expert"
        icon={<PhoneFilled rotate={90} />}
        type="link"
        href="/lien-he"
      >
        {t('Contact', { en: 'Contact', vn: 'Liên hệ' })}
      </Button>
      <RightContentButtonsNotAuthenIcon />
    </>
  );
};

export default RightContentButtonsNotAuthen;
