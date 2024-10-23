import React from 'react';
import {
  UserOutlined,
  ApartmentOutlined,
  FolderViewOutlined,
  BuildOutlined,
  CheckOutlined,
  IssuesCloseOutlined,
  FolderAddOutlined,
} from '@ant-design/icons';
import { TFunction } from 'next-i18next';

export const OrganizationMenus = (t: TFunction) =>  {
  return [
    {
      label: t('Organizations'),
      icon: <ApartmentOutlined />,
      href: '/admin/organizations',
    },
    {
      label: t('user_fina'),
      icon: <UserOutlined/>,
      href: '/admin/organizations/users',
    },
    {
      label: t('Positions'),
      icon: <FolderViewOutlined/>,
      href: '/admin/organizations/positions',
    },
    {
      label: t('Configurations'),
      icon: <BuildOutlined/>,
      href: '/admin/organizations/configurations',
    },
    {
      label: t('Configurations Properties'),
      icon: <BuildOutlined/>,
      href: '/admin/organizations/configurations/properties',
    },
    {
      label: t('Roles'),
      icon: <IssuesCloseOutlined/>,
      href: '/admin/organizations/roles',
    },
    {
      label: t('Permissions'),
      icon: <CheckOutlined/>,
      href: '/admin/organizations/permissions',
    },
    {
      label: t('Locations'),
      icon: <FolderViewOutlined/>,
      href: '/admin/organizations/locations',
    },
    {
      label: t('Groups'),
      icon: <FolderAddOutlined/>,
      href: '/admin/organizations/groups',
    },
    {
      label: t('Users group'),
      icon: <FolderAddOutlined/>,
      href: '/admin/organizations/users-group',
    },
  ];
};
