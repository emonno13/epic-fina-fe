import { useHTranslation } from '@lib/i18n';
import { Button, Menu } from 'antd';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { Link } from '../../../components/shared/link';
import { useIsMobile } from '../../../lib/hooks/use-media';

export const MenuSchema = (t) => [
  {
    label: t('Product', { vn: 'Sản phẩm' }),
    href: '/loans-introduce#product',
  },
  {
    label: t('Introduce', { vn: 'Giới thiệu' }),
    href: '/loans-introduce#introduce',
  },
  {
    label: t('Calculation tool', { vn: 'Công cụ tính' }),
    href: '/loans-introduce#calculation-tool',
  },
  {
    label: t('Register', { vn: 'Đăng ký' }),
    href: '/loans-introduce#register',
  },
  {
    label: t('Partners', { vn: 'Đối tác' }),
    href: '/loans-introduce#fina-partners',
  },
  {
    label: t('Fina app', { vn: 'Ứng dụng FINA' }),
    href: '/loans-introduce#fina-app',
  },
];

const LoansIntroduceHeaderMenu = ({ onVisible }) => {
  const { t } = useHTranslation('common');
  const menuSchema = MenuSchema(t);
  const isMobile = useIsMobile();
  const router = useRouter();
  const { locale } = useRouter();

  const selectedKeys = useMemo(() => {
    const { query } = router;
    const firstPathname = `/${query?.featureNames?.[0] || ''}`;
    return [firstPathname];
  }, [router]);

  const onMenuClick = useCallback(() => {
    if (onVisible) onVisible();
  }, [onVisible]);

  return (
    <Menu
      {...{
        selectedKeys,
        triggerSubMenuAction: 'hover',
        className: 'ui-lightly-client-header__menu',
        mode: isMobile ? 'inline' : 'horizontal',
      }}
    >
      {menuSchema.map((menu, index) => (
        <Menu.Item key={index.toString()} onClick={onMenuClick}>
          <Link href={menu.href}>{menu.label}</Link>
        </Menu.Item>
      ))}
      <Button
        onClick={onMenuClick}
        style={{ marginLeft: '24px' }}
        className="client-loans-introduce-header__right__register-btn"
        type="link"
        href={`/${locale}/loans-introduce#register`}
      >
        {t('Register', { vn: 'Đăng ký' })}
      </Button>
    </Menu>
  );
};

export default LoansIntroduceHeaderMenu;
