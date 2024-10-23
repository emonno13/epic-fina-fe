import { useHTranslation } from '@lib/i18n';
import { Button, Menu } from 'antd';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { Link } from '../../../components/shared/link';
import { useIsMobile } from '../../../lib/hooks/use-media';

export const MenuSchema = (t) => [
  {
    label: t('Consultation 30 minute', { vn: 'Tư vấn 30 phút' }),
    href: '/financial-advice#consultation-30-minute',
  },
  {
    label: t('Introduce', { vn: 'Giới thiệu' }),
    href: '/financial-advice#introduce',
  },
  {
    label: t('Exclusive offer', { vn: 'Ưu đãi' }),
    href: '/financial-advice#exclusive-offer',
  },
  {
    label: t('Process', { vn: 'Quy trình' }),
    href: '/financial-advice#process',
  },
  {
    label: t('Team', { vn: 'Đội ngũ' }),
    href: '/financial-advice#team',
  },
  {
    label: t('Register', { vn: 'Đăng ký' }),
    href: '/financial-advice#register',
  },
];

const FinancialAdviceHeaderMenu = ({ onVisible }) => {
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
        className="client-financial-advice-header__right__register-btn"
        type="link"
        href={`/${locale}/financial-advice#register`}
      >
        {t('Register', { vn: 'Đăng ký' })}
      </Button>
    </Menu>
  );
};

export default FinancialAdviceHeaderMenu;
