import React from 'react';
import {
  FolderAddOutlined,
} from '@ant-design/icons';
import { TFunction } from 'next-i18next';

export const SystemConfigurationMenus = (t: TFunction) =>  {

  return [
    {
      label: t('SYSTEM_CONFIGURATION_GREETING_FILE'),
      icon: <FolderAddOutlined/>,
      href: '/admin/system/greeting-files',
    },
    {
      label: t('SYSTEM_CONFIGURATION_GROUP'),
      icon: <FolderAddOutlined/>,
      href: '/admin/system/groups',
    },
    {
      label: t('SYSTEM_CONFIGURATION_QUEUE'),
      icon: <FolderAddOutlined/>,
      href: '/admin/system/queues',
    },
    {
      label: t('SYSTEM_CONFIGURATION_IVR_SCENARIO'),
      icon: <FolderAddOutlined/>,
      href: '/admin/system/scenario-ivr-tree',
    },
    {
      label: t('SYSTEM_CONFIGURATION_HOTLINE'),
      icon: <FolderAddOutlined/>,
      href: '/admin/system/hotline',
    },
  ];
};
