import { useHTranslation } from '@lib/i18n';
import { Button, Menu } from 'antd';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { Link } from '../../../components/shared/link';
import { useIsMobile } from '../../../lib/hooks/use-media';

import '../fina-agent-client.module.scss';

export const MenuSchema = (t) => [
  {
    label: t('Endow', { vn: 'Ưu đãi' }),
    href: '/fina-agent#endow',
  },
  {
    label: t('Condition', { vn: 'Điều kiện' }),
    href: '/fina-agent#general-condition',
  },
  {
    label: t('Service', { vn: 'Dịch vụ' }),
    href: '/fina-agent#service',
  },
  {
    label: t('Review', { vn: 'Đánh giá' }),
    href: '/fina-agent#review',
  },
  {
    label: t('FAQ', { vn: 'FAQ' }),
    href: '/fina-agent#faq',
  },
];

const FinaAgentHeaderMenu = ({ onVisible }) => {
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
        className="client-fina-agent-header__right__register-btn"
        type="link"
        href={`/${locale}/fina-agent#register-now`}
      >
        {t('Register', { vn: 'Đăng ký ngay' })}
      </Button>
    </Menu>
  );
};

export default FinaAgentHeaderMenu;
