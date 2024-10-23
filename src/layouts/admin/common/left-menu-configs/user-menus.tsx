import React from 'react';
import {
  FontColorsOutlined,
  TeamOutlined,
  NodeIndexOutlined,
  MacCommandOutlined,
  PhoneOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { TFunction } from 'next-i18next';

export const UserMenus = (t: TFunction) =>  {
  return [
    {
      label: t('All'),
      icon: <FontColorsOutlined />,
      href: '/admin/users/all',
    },
    {
      label: t('Customers'),
      icon: <TeamOutlined/>,
      href: '/admin/users/customers',
    },
    {
      label: 'Seller',
      icon: <NodeIndexOutlined/>,
      href: '/admin/users/sellers',
    },
    {
      label: 'Insurances Agent',
      icon: <MacCommandOutlined/>,
      href: '/admin/users/insurances',
    },
    {
      label: 'Collaborators',
      icon: <ReadOutlined/>,
      href: '/admin/users/collaborators',
    },
    {
      label: 'Tellers',
      icon: <PhoneOutlined/>,
      href: '/admin/users/tellers',
    },
  ];
};