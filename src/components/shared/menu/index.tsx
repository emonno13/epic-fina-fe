import Link from 'next/link';
import { Menu } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { omit } from 'lodash';
import { RouteUtils } from '../layout/router-contaner/utils';
import { useAuth, validPermissions } from '../../../lib/providers/auth';
import { ADMIN_PERMISSIONS } from '../accessibility/constant';

const canSelectBySamePaths = (withSamePaths = []) => {
  if (withSamePaths.length === 0) {
    return false;
  }
  const adminPaths = Object.values(RouteUtils.getAllAdminKeyAndPathsFromRoute());
  for (let i = 0; i < withSamePaths.length; i++) {
    if (adminPaths.includes(withSamePaths[i])) {
      return true;
    }
  }
  return  false;
};

const generateMenu = (schema, openKeys: any[] = [], selectedKeys: any[] = [], userPermissions: string[] = []): any => {
  const menus = new Array<any>();
  const { locale } = useRouter();
  if (!schema) {
    return menus;
  }
  schema.map((item) => {
    const { className = '', icon, subMenu, permissions, href, label, children, defaultOpen, withSamePaths = [], checkAllPermissions } = item;
    
    permissions?.push(ADMIN_PERMISSIONS.SITE_OWNER, ADMIN_PERMISSIONS.SUPPER_ADMIN, ADMIN_PERMISSIONS.ADMIN);

    if (permissions && !validPermissions([...new Set([...permissions])], userPermissions, checkAllPermissions)) {
      return;
    }

    if (canSelectBySamePaths(withSamePaths) && !selectedKeys.includes(href)) {
      selectedKeys.push(href);
    }

    if (!subMenu) {
      const menuItem = (
        <Menu.Item {...omit(item, 'checkAllPermissions')} key={href}>
          <Link locale={locale} href={`/${locale}${href}`}>
            {label || children}
          </Link>
        </Menu.Item>
      );
      menus.push(menuItem);

      return;
    }

    if (defaultOpen === true) {
      openKeys.push(href);
    }

    const subMenuComponent: any = generateMenu(subMenu, openKeys, selectedKeys, userPermissions);
    
    menus.push(
      <Menu.SubMenu icon={icon} className={className} key={href} title={label || children}>
        {subMenuComponent.menus}
      </Menu.SubMenu>,
    );
  });
  return {
    menus,
    openKeys,
    selectedKeys,
  };
};

const View = (props) => {
  const {
    defaultSelectedKeys,
    className,
    style,
    mode,
    theme,
    schema,
    onClick = (f=>f),
  } = props;
  const { asPath } = useRouter();
  const { userPermissions } = useAuth();
  const { menus, openKeys = [], selectedKeys = [] } = generateMenu(schema, defaultSelectedKeys || [asPath], defaultSelectedKeys || [asPath], userPermissions);
  return (
    <Menu
      className={className}
      key={[...openKeys, ...selectedKeys].join(',')}
      style={style}
      theme={theme}
      mode={mode}
      defaultSelectedKeys={selectedKeys}
      defaultOpenKeys={openKeys}
      onClick={({ key }) => {
        onClick(key);
      }}>
      {menus}
    </Menu>
  );
};

export const SystemMenu = View;

