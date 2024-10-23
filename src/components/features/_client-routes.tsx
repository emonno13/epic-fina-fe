import { RouteContainer } from '@components/shared/layout/router-contaner';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import dynamic from 'next/dynamic';
import { TYPE_PRODUCT_HOME_SLUG } from './client/home/constants';
import { CLIENT_PRODUCT_DETAIL_ROUTE } from './client/product-detail/constants';

export const ClientHome = dynamic(
  () => import('components/features/client/home'),
  { ssr: false },
);

export const ClientCalculator = dynamic(
  () => import('components/features/client/calculator'),
  { ssr: false },
);

export const ClienLoans = dynamic(
  () => import('components/features/client/loans'),
  { ssr: false },
);

export const ClientInsuranceDetail = dynamic(
  () => import('components/features/client/insuarnce-detail'),
  { ssr: false },
);

export const ClientInsuranceInputInformationDetail = dynamic(
  () =>
    import(
      'components/shared/client/product-detail/product-detail-insurance/input-information-page'
    ),
  { ssr: false },
);

export const ClientRealEstates = dynamic(
  () => import('components/features/client/real-estates'),
  { ssr: false },
);

export const ClientInsurances = dynamic(
  () => import('components/features/client/insurances'),
  { ssr: false },
);

export const ClientAbout = dynamic(
  () => import('components/features/client/about'),
  { ssr: false },
);

export const ClientFaq = dynamic(
  () => import('components/features/client/faq'),
  { ssr: false },
);

export const ClientProductDetail = dynamic(
  () => import('components/features/client/product-detail'),
  { ssr: false },
);

export const ClientLoanEstimate = dynamic(
  () => import('components/features/client/loan-estimate'),
  { ssr: false },
);

export const ClientBonds = dynamic(
  () => import('components/features/client/bonds'),
  { ssr: false },
);

export const ClientBondDetail = dynamic(
  () => import('components/features/client/bond-detail'),
  { ssr: false },
);

export const ClientFundCertificate = dynamic(
  () => import('components/features/client/fund-certificate'),
  {
    ssr: false,
  },
);

export const ClientFundCertificateDetail = dynamic(
  () => import('components/features/client/fund-certificate/detail'),
  {
    ssr: false,
  },
);

export const ClientRealEstateInvestment = dynamic(
  () => import('components/features/client/real-estate-investment'),
  { ssr: false },
);

export const ClientRealEstateInvestmentDetail = dynamic(
  () => import('components/features/client/real-estate-investment-detail'),
  { ssr: false },
);

export const ClientNewsCategories = dynamic(
  () => import('components/features/client/news-categories'),
  { ssr: false },
);

export const ClientSearchNews = dynamic(
  () => import('components/features/client/search-news'),
  { ssr: false },
);

export const ClientProfileAccountInformation = dynamic(
  () => import('components/shared/client/profile/account-information'),
  { ssr: false },
);

export const ClientProfileSurvey = dynamic(
  () => import('components/shared/client/profile/survey'),
  { ssr: false },
);

export const ClientProfileEarningsCommissions = dynamic(
  () => import('components/shared/client/profile/earnings-commissions'),
  { ssr: false },
);

export const ClientProfileAffiliate = dynamic(
  () => import('components/shared/client/profile/affiliate'),
  { ssr: false },
);

export const ProfileAccountTransaction = dynamic(
  () => import('components/shared/client/profile/transaction'),
  { ssr: false },
);

export const ProfileAccountDeal = dynamic(
  () => import('components/shared/client/profile/deal'),
);

export const ClientProfileContributorContract = dynamic(
  () => import('components/shared/client/profile/contributor-contract'),
  { ssr: false },
);

export const ClientProfileMyNetwork = dynamic(
  () => import('components/shared/client/profile/my-network'),
);

export const ClientProfileDashboard = dynamic(
  () => import('components/shared/client/profile/dashboard'),
  { ssr: false },
);

export const ClientProfileSettingChangePassword = dynamic(
  () => import('components/shared/client/profile/setting/change-password'),
  { ssr: false },
);

export const ClientProfileSettingNotification = dynamic(
  () => import('components/shared/client/profile/setting/notification'),
  { ssr: false },
);

export const ClientProfileSettingLanguage = dynamic(
  () => import('components/shared/client/profile/setting/language'),
);

export const ClientProfileAssetManagement = dynamic(
  () => import('components/shared/client/profile/asset-management'),
  { ssr: false },
);

export const ClientProfileMyDocument = dynamic(
  () => import('components/shared/client/profile/my-document'),
  { ssr: false },
);

export const _clientPortalRoutes = () => {
  return [
    {
      exact: true,
      path: RouteUtils.buildRouteWithI18n('/profile/dashboard'),
      component: ClientProfileDashboard,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/profile/transaction-management'),
      component: RouteContainer,
      routes: [
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n(
            '/profile/transaction-management/transactions',
          ),
          component: ProfileAccountTransaction,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n(
            '/profile/transaction-management/records',
          ),
          component: ProfileAccountDeal,
        },
      ],
    },
    {
      exact: true,
      path: RouteUtils.buildRouteWithI18n('/profile/asset-management'),
      component: ClientProfileAssetManagement,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/profile/account-management'),
      component: RouteContainer,
      routes: [
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n(
            '/profile/account-management/account-information',
          ),
          component: ClientProfileAccountInformation,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n(
            '/profile/account-management/affiliate-account',
          ),
          component: ClientProfileAffiliate,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n(
            '/profile/account-management/my-network',
          ),
          component: ClientProfileMyNetwork,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n(
            '/profile/account-management/collaborator-contract',
          ),
          component: ClientProfileContributorContract,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n(
            '/profile/account-management/my-document',
          ),
          component: ClientProfileMyDocument,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n(
            '/profile/account-management/earnings-commissions',
          ),
          component: ClientProfileEarningsCommissions,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n(
            '/profile/account-management/advanced-surveys',
          ),
          component: () => <ClientProfileSurvey />,
        },
      ],
    },
    {
      path: RouteUtils.buildRouteWithI18n('/profile/setting'),
      component: RouteContainer,
      routes: [
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/profile/setting/notification'),
          component: ClientProfileSettingNotification,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n(
            '/profile/setting/change-password',
          ),
          component: ClientProfileSettingChangePassword,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/profile/setting/language'),
          component: ClientProfileSettingLanguage,
        },
      ],
    },
  ];
};

export const _clientRoutes = () => {
  return [
    {
      path: RouteUtils.buildRouteWithI18n(TYPE_PRODUCT_HOME_SLUG.LOAN),
      exact: true,
      component: ClientHome,
    },
    {
      path: RouteUtils.buildRouteWithI18n(TYPE_PRODUCT_HOME_SLUG.INSURANCE),
      exact: true,
      component: ClientHome,
    },
    {
      path: RouteUtils.buildRouteWithI18n(TYPE_PRODUCT_HOME_SLUG.REAL_ESTATE),
      exact: true,
      component: ClientHome,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/cong-cu-tinh'),
      exact: true,
      component: ClientCalculator,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/uoc-tinh-khoan-vay'),
      exact: true,
      component: ClientLoanEstimate,
    },
    // {
    //   path: RouteUtils.buildRouteWithI18n('/danh-sach-san-pham-vay'),
    //   exact: true,
    //   component: ClienLoans,
    // },
    {
      path: RouteUtils.buildRouteWithI18n(
        `/${CLIENT_PRODUCT_DETAIL_ROUTE.LOAN}/:slug`,
      ),
      exact: true,
      component: ClientProductDetail,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/danh-sach-bat-dong-san'),
      exact: true,
      component: ClientRealEstates,
    },
    {
      path: RouteUtils.buildRouteWithI18n(
        `/${CLIENT_PRODUCT_DETAIL_ROUTE.REAL_ESTATE}/:slug`,
      ),
      exact: true,
      component: ClientProductDetail,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/danh-sach-bao-hiem'),
      exact: true,
      component: ClientInsurances,
    },
    {
      path: RouteUtils.buildRouteWithI18n(
        `/${CLIENT_PRODUCT_DETAIL_ROUTE.INSURANCE}/:slug`,
      ),
      exact: true,
      component: ClientProductDetail,
    },
    {
      path: RouteUtils.buildRouteWithI18n(
        `/${CLIENT_PRODUCT_DETAIL_ROUTE.INSURANCE}/:slug/nhap-thong-tin`,
      ),
      exact: true,
      component: ClientInsuranceInputInformationDetail,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/gioi-thieu'),
      exact: true,
      component: ClientAbout,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/hoi-dap'),
      exact: true,
      component: ClientFaq,
    },
    {
      path: RouteUtils.buildRouteWithI18n(
        `/${CLIENT_PRODUCT_DETAIL_ROUTE.PROJECT}/:slug`,
      ),
      exact: true,
      component: ClientProductDetail,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/danh-sach-trai-phieu'),
      exact: true,
      component: ClientBonds,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/danh-sach-trai-phieu/:slug'),
      exact: true,
      component: ClientBondDetail,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/danh-sach-chung-chi-quy'),
      exact: true,
      component: ClientFundCertificate,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/danh-sach-chung-chi-quy/:slug'),
      exact: true,
      component: ClientFundCertificateDetail,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/danh-sach-san-pham-bao-hiem'),
      exact: true,
      component: ClientInsuranceDetail,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/danh-sach-san-pham-bat-dong-san'),
      exact: true,
      component: ClientRealEstateInvestment,
    },
    {
      path: RouteUtils.buildRouteWithI18n(
        '/danh-sach-san-pham-bat-dong-san/:slug',
      ),
      exact: true,
      component: ClientRealEstateInvestmentDetail,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/danh-muc-tin-tuc'),
      exact: true,
      component: ClientNewsCategories,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/tim-kiem-tin-tuc'),
      exact: true,
      component: ClientSearchNews,
    },
  ];
};
