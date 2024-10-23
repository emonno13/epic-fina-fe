import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import dynamic from 'next/dynamic';

export const MobileHome = dynamic(
  () => import('@components/features/mobile-app/home'),
  { ssr: false },
);

export const MobileProducts = dynamic(
  () => import('@components/features/mobile-app/mobile-products'),
  { ssr: false },
);

export const MobileDocumentManagement = dynamic(
  () => import('@components/features/profiles/profile-document'),
  { ssr: false },
);

export const MobileDealLoanManagement = dynamic(
  () => import('@components/features/fina/deals/loans'),
  { ssr: false },
);

export const MobileProfile = dynamic(
  () => import('@components/features/mobile-app/mobile-profile'),
  { ssr: false },
);

export const MobileChangePassword = dynamic(
  () => import('@components/features/mobile-app/mobile-change-password'),
  { ssr: false },
);

export const MobilePlanningCheck = dynamic(
  () => import('@components/features/mobile-app/mobile-planning-check'),
  { ssr: false },
);

export const MobileLoanCalculator = dynamic(
  () => import('@components/features/mobile-app/mobile-loan-calculator'),
  { ssr: false },
);

export const MobileManagement = dynamic(
  () => import('@components/features/mobile-app/mobile-management'),
  { ssr: false },
);

export const MobileManagementInsurance = dynamic(
  () => import('@components/features/fina/transaction'),
  { ssr: false },
);

export const mobileAppRoutes = () => {
  return [
    {
      path: RouteUtils.buildRouteWithI18n('/admin/m-dashboard'),
      component: MobileHome,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/m-products'),
      component: MobileProducts,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/m-document-management'),
      component: MobileDocumentManagement,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/m-deal-loan-management'),
      component: MobileDealLoanManagement,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/m-profile'),
      component: MobileProfile,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/m-change-password'),
      component: MobileChangePassword,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/m-planning-check'),
      component: MobilePlanningCheck,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/m-loan-calculator'),
      component: MobileLoanCalculator,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/m-management'),
      component: MobileManagement,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/m-insurance-management'),
      component: MobileManagementInsurance,
      exact: true,
    },
  ];
};
