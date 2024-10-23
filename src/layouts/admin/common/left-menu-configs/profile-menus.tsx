import React from 'react';
import {
  ApartmentOutlined,
  CheckSquareOutlined, FileDoneOutlined,
} from '@ant-design/icons';
import { TFunction } from 'next-i18next';

export const ProfileMenus = (t: TFunction) => {
  return [
    {
      label: t('Profile'),
      icon: <ApartmentOutlined/>,
      href: '/admin',
      defaultOpen: true,
      subMenu: [
        {
          label: t('Account identifier'),
          icon: <CheckSquareOutlined/>,
          href: '/admin/profiles/account-identifier',
        },
        {
          label: t('Contributor contract'),
          icon: <FileDoneOutlined/>,
          href: '/admin/profiles/contract',
        },
      ],
    },
    // {
    // 	label: t('Profile user', {vn: 'Thông tin cá nhân'}),
    // 	icon: <ApartmentOutlined />,
    // 	href: '/admin/profiles/todo',
    // 	defaultOpen: true,
    // },
    {
      label: t('Profile'),
      icon: <ApartmentOutlined/>,
      href: '/admin/profiles',
    },
    // {
    // 	label: t('Documents'),
    // 	icon: <FileAddOutlined />,
    // 	href: '/admin/profiles/documents',
    // },
    // {
    // 	label: t('Change password'),
    // 	icon: <KeyOutlined />,
    // 	href: '/admin/profiles/change-password',
    // },
  ];
};