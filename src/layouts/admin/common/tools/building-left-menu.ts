import { TFunction } from 'next-i18next';
import { MenuAdminUtils } from '../../../../components/shared/menu/menu-admin-utils';
import { BusinessMenu } from '../left-menu-configs/business-menus';
import { CrmMenus } from '../left-menu-configs/crm-menus';
import { OrganizationMenus } from '../left-menu-configs/organization-menu';
import { SystemConfigurationMenus } from '../left-menu-configs/system-configuration-menu';

const LeftMenuConfigs = (t: TFunction) => ({
  '/admin/dashboard': BusinessMenu(t),
  // '/admin/profiles': ProfileMenus(t),
  '/admin/call-logs': BusinessMenu(t),
  '/admin/deals': BusinessMenu(t),
  '/admin/fina-staff/customers': BusinessMenu(t),
  '/admin/business': BusinessMenu(t),
  '/admin/categories': BusinessMenu(t),
  '/admin/tasks': BusinessMenu(t),
  '/admin/projects': BusinessMenu(t),
  '/admin/products': BusinessMenu(t),
  '/admin/document-templates': BusinessMenu(t),
  '/admin/statuses': BusinessMenu(t),
  '/admin/organizations': OrganizationMenus(t),
  '/admin/users': CrmMenus(t),
  '/admin/crm': CrmMenus(t),
  '/admin/partners': CrmMenus(t),
  '/admin/documents': BusinessMenu(t),
  '/admin/template': CrmMenus(t),
  '/admin/vehicles': BusinessMenu(t),
  '/admin/progress-template': BusinessMenu(t),
  '/admin/transaction': BusinessMenu(t),
  '/admin/seo-landing-page': BusinessMenu(t),
  '/admin/commission': BusinessMenu(t),
  '/admin/question-groups': BusinessMenu(t),
  '/admin/config-question-groups': BusinessMenu(t),
  '/admin/client-reviews': BusinessMenu(t),
  '/admin/preferential-reviews': BusinessMenu(t),
  '/admin/news-management/category': BusinessMenu(t),
  '/admin/news-management/news': BusinessMenu(t),
  '/admin/banners': BusinessMenu(t),
  '/admin/promotions/alma-registrations': BusinessMenu(t),
  '/admin/recruit/jobs': BusinessMenu(t),
  '/admin/recruit/cv': BusinessMenu(t),
  '/admin/recruit/contact-us': BusinessMenu(t),
  '/admin/reports': BusinessMenu(t),
  '/admin/system': SystemConfigurationMenus(t),
  '/admin/register-insurance': BusinessMenu(t),
  '/admin/insurance': BusinessMenu(t),
  '/admin/invest': BusinessMenu(t),
  '/admin/otp': CrmMenus(t),
  '/admin/partner-registered-calculation-toolkit': CrmMenus(t),
  '/admin/send-email-fina': BusinessMenu(t),
});
/**
 * FeatureNames = admin/organizations/users
 * PossibleAdminMenuKeys.reverse() = {
 *   users:         /admin/organizations/users,
 *   organizations: /admin/organizations,
 *   admin:         /admin,
 * }
 */
export const getLeftMenu = (t: TFunction = (f=>f)) => {
  const configs = LeftMenuConfigs(t);
  const menuConfigKeys = Object.keys(configs);
  const adminPossiblePaths = MenuAdminUtils.getAdminPossiblePaths().reverse();
  for (let i = 0; i < adminPossiblePaths.length; i++) {
    if (menuConfigKeys.includes(adminPossiblePaths[i])) {
      return configs[adminPossiblePaths[i]];
    }
  }
  return [];
};
