import React from 'react';
import {
  ApartmentOutlined, BankOutlined, BoldOutlined, PieChartOutlined, CodepenOutlined,
} from '@ant-design/icons';
import { TFunction } from 'next-i18next';

export const PartnerMenus = (t: TFunction) =>  {
  return [
    {
      label: t('Banks'),
      icon: <BankOutlined />,
      href: '/admin/partners/banks',
    },
    {
      label: t('Insurances'),
      icon: <BoldOutlined />,
      href: '/admin/partners/insurances',
    },
    {
      label: t('Real estate company'),
      icon: <PieChartOutlined />,
      href: '/admin/partners/real-estates',
    },
    {
      label: t('Car company'),
      icon: <CodepenOutlined />,
      href: '/admin/partners/car-companies',
    },
    {
      label: t('partners.hospital'),
      icon: <BoldOutlined />,
      href: '/admin/partners/hospitals',
    },
    {
      label: t('Real Estate'),
      icon: <BankOutlined />,
      href: '/admin/partners/real-estate',
    },
    {
      label: t('Other'),
      icon: <ApartmentOutlined />,
      href: '/admin/partners/others',
    },
  ];
};
