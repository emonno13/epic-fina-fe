import React from 'react';
import {
  ApartmentOutlined,
} from '@ant-design/icons';
import { TFunction } from 'next-i18next';

export const MessageTemplateMenus = (t: TFunction) => {
  return [
    {
      label: t('All'),
      icon: <ApartmentOutlined/>,
      href: '/admin/template/all',
    },
  ];
};