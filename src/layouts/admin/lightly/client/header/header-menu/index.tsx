import { Menu } from 'antd';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { Link } from '@components/shared/link';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { useClientMenuSchema } from './header-menu.schema';
interface ClientHeaderMenuProps {
  onVisible?: Function;
}

const ClientHeaderMenu = ({ onVisible }: ClientHeaderMenuProps) => {
  const { t } = useHTranslation('common');
  const isMobile = useIsMobile();
  const router = useRouter();
  const menuSchema = useClientMenuSchema(t);

  const selectedKeys = useMemo(() => {
    const { query } = router;
    const firstPathname = `/${query?.featureNames?.[0] || ''}`;

    if (
      [
        '/danh-sach-san-pham-vay',
        '/danh-sach-bao-hiem',
        '/danh-sach-bat-dong-san',
      ].includes(firstPathname)
    ) {
      return ['/product', firstPathname];
    }
    if (['/cong-cu-tinh', '/kiem-tra-quy-hoach'].includes(firstPathname)) {
      return ['calculators', firstPathname];
    }
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
      {menuSchema.map((menuSchemaItem, index) => {
        const { subMenu, key, href, title } = menuSchemaItem;
        if (!subMenu) {
          return (
            <Menu.Item
              key={`menu-item-without-submenu-${key}-${index}`}
              onClick={onMenuClick}
            >
              <Link href={href}>{title}</Link>
            </Menu.Item>
          );
        }

        const { popupClassName, popupOffset } = menuSchemaItem;

        return (
          <Menu.SubMenu
            key={`menu-item-without-submenu-${key}-${index}`}
            title={title}
            popupClassName={popupClassName}
            popupOffset={popupOffset}
          >
            {subMenu.map((submenuItem, index) => {
              const { itemGroup = [], ...submenuItemProps } = submenuItem;
              return (
                <Menu.ItemGroup
                  key={`menu-item-group-${key}-${index}`}
                  {...submenuItemProps}
                >
                  {itemGroup.map((itemGroupItem) => {
                    const { href, title, key, isNew, ...itemGroupItemProps } =
                      itemGroupItem;
                    const newTime = Math.random();
                    return (
                      <Menu.Item
                        key={`menu-item-${newTime}-${key}-${index}`}
                        {...{
                          icon: <RightOutlined />,
                          ...itemGroupItemProps,
                          onClick: onMenuClick,
                        }}
                      >
                        {key === '/gioi-thieu-fina-brochure' ? (
                          <a href={href} target="_blank" rel="noreferrer">
                            {' '}
                            {title}{' '}
                          </a>
                        ) : (
                          <Link href={href}>
                            <div>
                              {title} &nbsp;&nbsp;
                              {isNew ? (
                                <span className="menu-item-new animate__animated animate__slower animate__infinite animate__flash">
                                  New
                                </span>
                              ) : (
                                ''
                              )}
                            </div>
                          </Link>
                        )}
                      </Menu.Item>
                    );
                  })}
                </Menu.ItemGroup>
              );
            })}
          </Menu.SubMenu>
        );
      })}
    </Menu>
  );
};

export default ClientHeaderMenu;
