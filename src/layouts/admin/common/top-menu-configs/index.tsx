import { TFunction } from 'next-i18next';
import { ADMIN_AND_SUPER_ADMIN_PERMISSIONS, COMMON_PERMISSIONS } from '../../../../lib/permissions';

export const TopMenuConfigs = (t: TFunction = (f=>f)) => [
  {
    href: '/admin/dashboard',
    label: t('Business'),
  },
  {
    href: '/admin/crm/tasks',
    label: t('CRM'),
    permissions: [COMMON_PERMISSIONS.VIEW_CRM],
  },
  // {
  //     href: "/admin/partners/banks",
  //     label: t("Partners")
  // },
  // {
  //     href: "/admin/users",
  //     label: t("Users")
  // },
  {
    href: '/admin/organizations',
    label: t('Organizations'),
    permissions: ADMIN_AND_SUPER_ADMIN_PERMISSIONS,
  },
  {
    href: '/admin/system',
    label: t('CALL_SETTINGS'),
    permissions: ADMIN_AND_SUPER_ADMIN_PERMISSIONS,
  },
  // {
  //     href: "/admin/configs",
  //     label: "Configs"
  // },
  // {
  //   href: "/admin/template/all",
  //   label: t("Message Template")
  // },
];
