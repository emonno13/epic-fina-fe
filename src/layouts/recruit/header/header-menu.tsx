import React, { useCallback, useMemo } from 'react';
import { Menu } from 'antd';
import { useRouter } from 'next/router';
import { useHTranslation } from '../../../lib/i18n';
import { useIsMobile } from '../../../lib/hooks/use-media';
import { getMenuData } from '../constants';
import { Link } from '../../../components/shared/link';
const HeaderRecruitMenu = ({ onVisible }) => {
  const { t } = useHTranslation('common');
  const isMobile = useIsMobile();
  const router = useRouter();

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
      {
        getMenuData(t).map((menu) => (
          <Menu.Item key={menu.key} onClick={onMenuClick}>
            <Link href={menu.path}>
              {menu.label}
            </Link>
          </Menu.Item>
        ))
      }
    </Menu>
  );
};
export default HeaderRecruitMenu;
