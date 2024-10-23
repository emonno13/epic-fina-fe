import React from 'react';
import {
  ApartmentOutlined, BankOutlined, BoldOutlined, BorderlessTableOutlined,
  CodepenOutlined, ContainerOutlined, ExpandAltOutlined, FolderOpenOutlined,
  FontColorsOutlined,
  ImportOutlined, MacCommandOutlined, MedicineBoxOutlined, MessageOutlined, NodeIndexOutlined,
  PhoneOutlined, PieChartOutlined, ReadOutlined, TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined, WalletOutlined,
} from '@ant-design/icons';
import { TFunction } from 'next-i18next';

export const CrmMenus = (t: TFunction) => {
  return [
    // {
    //   label: t("dashboard"),
    //   icon: <ApartmentOutlined />,
    //   href: "/admin/crm/dashboard"
    // },
    {
      label: t('Task Management'),
      icon: <PhoneOutlined />,
      href: '/admin/crm/tasks',
      permissions: ['V_TASK', 'V_MDT_TASK'],
    },
    {
      label: t('Call logs'),
      icon: <PhoneOutlined />,
      href: '/admin/crm/call-logs',
      permissions: ['V_MDT_STRINGEELOGS'],
    },
    {
      href: '/admin/users',
      label: t('Users'),
      icon: <UserOutlined />,
      defaultOpen: true,
      permissions: ['ADMIN'],
      subMenu: [
        {
          label: t('users.all'),
          icon: <FontColorsOutlined />,
          href: '/admin/users/all',
        },
        {
          label: t('users.customers'),
          icon: <TeamOutlined />,
          href: '/admin/users/customers',
        },
        {
          label: t('users.seller'),
          icon: <NodeIndexOutlined />,
          href: '/admin/users/sellers',
        },
        {
          label: t('users.insurances_agent'),
          icon: <MacCommandOutlined />,
          href: '/admin/users/insurances',
        },
        {
          label: t('users.collaborators'),
          icon: <ReadOutlined />,
          href: '/admin/users/collaborators',
        },
        {
          label: t('users.tellers'),
          icon: <PhoneOutlined />,
          href: '/admin/users/tellers',
        },
      ],
    },
    {
      href: '/admin/partners',
      label: t('Partners'),
      icon: <UserOutlined />,
      defaultOpen: true,
      permissions: ['ADMIN'],
      subMenu: [
        {
          label: t('partners.banks'),
          icon: <BankOutlined />,
          href: '/admin/partners/banks',
        },
        {
          label: t('partners.insurances'),
          icon: <BoldOutlined />,
          href: '/admin/partners/insurances',
        },
        {
          label: t('partners.real_estate_company'),
          icon: <PieChartOutlined />,
          href: '/admin/partners/real-estates',
        },
        {
          label: t('partners.car_company'),
          icon: <CodepenOutlined />,
          href: '/admin/partners/car-companies',
        },
        {
          label: t('partners.hospital'),
          icon: <MedicineBoxOutlined />,
          href: '/admin/partners/hospitals',
        },
        {
          label: t('Real Estate'),
          icon: <BankOutlined />,
          href: '/admin/partners/real-estate',
        },
        {
          label: t('partners.other'),
          icon: <ApartmentOutlined />,
          href: '/admin/partners/others',
        },
      ],
    },
    {
      href: '/admin/crm/docs',
      label: 'Tài liệu kết nối',
      icon: <FolderOpenOutlined/>,
      defaultOpen: true,
      permissions: ['ADMIN'],
      subMenu: [
        {
          href: '/admin/crm/category-documentation',
          icon: <WalletOutlined/>,
          label: 'Danh mục tài liệu',
        },
        {
          href: '/admin/crm/documentation',
          icon: <ContainerOutlined/>,
          label: 'Tài liệu API',
        },
      ],
    },
    {
      href: '/admin/template/all',
      icon: <MessageOutlined />,
      label: t('Message Template'),
      permissions: ['ADMIN'],
    },
    {
      href: '/admin/otp',
      icon: <BorderlessTableOutlined />,
      label: t('Otp & email', { vn: 'Otp & email' }),
      permissions: ['VIEW_OTP'],
    },
    {
      href: '/admin/partner-registered-calculation-toolkit',
      icon: <UsergroupAddOutlined />,
      label: t('Partner registers calculation toolkit'),
      permissions: ['ADMIN'],
    },
    {
      href: '/admin/crm/ems',
      label: t('Email marketing services'),
      icon: <UserOutlined />,
      defaultOpen: true,
      permissions: ['ADMIN'],
      subMenu: [
        {
          href: '/admin/crm/ems/messages',
          icon: <MessageOutlined />,
          label: t('Message'),
        },
        {
          href: '/admin/crm/ems/message-workflows',
          icon: <MessageOutlined />,
          label: t('Message workflows'),
        },
        {
          href: '/admin/crm/ems/event-message-workflows',
          icon: <MessageOutlined />,
          label: t('Event message workflows'),
        },
        {
          href: '/admin/crm/ems/events',
          icon: <MessageOutlined />,
          label: t('Events'),
        },
        {
          label: t('Reference set templates'),
          icon: <ExpandAltOutlined />,
          href: '/admin/crm/ems/reference-set-templates',
        },
        {
          label: t('Campaigns'),
          icon: <ExpandAltOutlined />,
          href: '/admin/crm/ems/campaigns',
        },
        {
          label: t('External email templates'),
          icon: <ExpandAltOutlined />,
          href: '/admin/crm/ems/templates',
        },
      ],
    },
    {
      label: t('partners.import_user'),
      icon: <ImportOutlined />,
      permissions: ['ADMIN'],
      href: '/admin/crm/import-users',
    },
  ];
};
