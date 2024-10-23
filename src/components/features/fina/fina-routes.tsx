import { TASK_TYPES } from '@constants/crm/task';
import dynamic from 'next/dynamic';

import { RouteContainer } from '../../shared/layout/router-contaner';
import { RouteUtils } from '../../shared/layout/router-contaner/utils';

export const Documents = dynamic(
  () => import('@components/features/fina/documents'),
  { ssr: false },
);
export const ProductCategory = dynamic(
  () => import('@components/features/finance/categories'),
  { ssr: false },
);

export const DealLoanManagement = dynamic(
  () => import('@components/features/fina/deals/loans'),
  { ssr: false },
);

export const TransactionDealInsurancesManagement = dynamic(
  () => import('@components/features/fina/deals/insurances'),
  { ssr: false },
);

export const ForControlDisbursementManagement = dynamic(
  () => import('@components/features/fina/deals/for-control-disbursement'),
  { ssr: false },
);

export const BondsDisbursementManagement = dynamic(
  () => import('@components/features/fina/deals/bonds'),
  { ssr: false },
);

export const ImportDealManagement = dynamic(
  () => import('@components/features/fina/deals/loans/import-deals'),
  { ssr: false },
);

export const ImportPropertiesManagement = dynamic(
  () => import('@components/features/fina/properties/import-deals'),
  { ssr: false },
);

export const ProjectManagement = dynamic(
  () => import('@components/features/fina/projects'),
  { ssr: false },
);

export const LoanManagement = dynamic(
  () => import('@components/features/fina/products/loans'),
  { ssr: false },
);

export const ProductDetailManagement = dynamic(
  () => import('@components/features/fina/products/products-detail'),
  { ssr: false },
);

export const InsuranceManagement = dynamic(
  () => import('@components/features/fina/products/insurances'),
  { ssr: false },
);

export const BondsManagement = dynamic(
  () => import('@components/features/fina/products/bonds'),
  { ssr: false },
);

export const FundManagement = dynamic(
  () => import('@components/features/fina/products/fund'),
  { ssr: false },
);

export const RealEstateManagement = dynamic(
  () => import('@components/features/fina/products/real-estate'),
  { ssr: false },
);

export const PropertyManagement = dynamic(
  () => import('@components/features/fina/properties'),
  { ssr: false },
);

export const VehicleCategoryManagement = dynamic(
  () => import('@components/features/fina/vehicles/categories'),
  { ssr: false },
);

export const VehicleManagement = dynamic(
  () => import('@components/features/fina/vehicles'),
  { ssr: false },
);

export const ProductProgressManagement = dynamic(
  () => import('@components/features/fina/progress-template'),
  { ssr: false },
);

export const TransactionManagement = dynamic(
  () => import('@components/features/fina/transaction'),
  { ssr: false },
);

export const SeoLandingPage = dynamic(
  () => import('@components/features/cms/seo-landing-page'),
  { ssr: false },
);

export const CommissionLoanProductSetting = dynamic(
  () => import('@components/features/fina/commission/settings/loan-product'),
  { ssr: false },
);

export const CommissionInsuranceProductSetting = dynamic(
  () =>
    import('@components/features/fina/commission/settings/insurance-product'),
  { ssr: false },
);

export const SearchUserManagement = dynamic(
  () => import('@components/features/fina/user-management/search-user'),
  { ssr: false },
);

export const AccessPermissionUserManagement = dynamic(
  () =>
    import('@components/features/fina/user-management/access-permission-user'),
  { ssr: false },
);

export const NewsCategoryManagement = dynamic(
  () => import('@components/features/news-management/category'),
  { ssr: false },
);

export const NewsManagement = dynamic(
  () => import('@components/features/news-management/news'),
  { ssr: false },
);

export const BannersManagement = dynamic(
  () => import('@components/features/banners-management'),
  { ssr: false },
);

export const ClientReviewManagement = dynamic(
  () => import('@components/features/fina/client-reviews'),
  { ssr: false },
);

export const PreferentialReviewManagement = dynamic(
  () => import('@components/features/fina/preferential-reviews'),
  { ssr: false },
);

export const CommissionReceiveManagement = dynamic(
  () => import('@components/features/fina/commission/management'),
  { ssr: false },
);

export const CommissionSpendManagement = dynamic(
  () => import('@components/features/fina/commission/management/spend'),
  { ssr: false },
);

export const MyCommissionManagement = dynamic(
  () => import('@components/features/fina/commission/management/my'),
  { ssr: false },
);

export const QuestionGroupsManagement = dynamic(
  () => import('@components/features/fina/question-groups'),
  { ssr: false },
);

export const AlmaRegistrationManagement = dynamic(
  () => import('@components/features/alma-registration-management'),
  { ssr: false },
);

export const HealthInsurance = dynamic(
  () => import('@components/features/cms/register-insurance/health-insurance'),
  { ssr: false },
);

export const DealClaimInsurance = dynamic(
  () => import('@components/features/crm/deal-claim-insurance'),
  { ssr: false },
);

export const ImportContact = dynamic(
  () => import('@components/features/crm/contact/import-contact'),
  { ssr: false },
);

export const ContactManagement = dynamic(
  () => import('@components/features/crm/contact/contact'),
  { ssr: false },
);

export const ReportCallLog = dynamic(
  () => import('@components/features/crm/reports/report-call-log'),
  { ssr: false },
);

export const ReportTask = dynamic(
  () => import('@components/features/crm/reports/report-task'),
  { ssr: false },
);

export const ReportDeal = dynamic(
  () => import('@components/features/crm/reports/report-deal'),
  { ssr: false },
);

export const ReportPerformance = dynamic(
  () => import('@components/features/crm/reports/report-performance'),
  { ssr: false },
);

export const GuaranteeHospital = dynamic(
  () => import('@components/features/crm/guarantee-hospital'),
  { ssr: false },
);

export const SharingViewUserManagement = dynamic(
  () =>
    import(
      '@components/features/fina/user-management/sharing-view-user-management'
    ),
  { ssr: false },
);

export const CustomerManagement = dynamic(
  () => import('@components/features/business/customer'),
  {
    ssr: false,
  },
);

export const UserCollaboratorManagement = dynamic(
  () => import('@components/features/business/collaborator-management'),
  {
    ssr: false,
  },
);

export const ClaimInsurance = dynamic(
  () => import('@components/features/crm/claim-insurance'),
  {
    ssr: false,
  },
);

export const TransactionFundsManagement = dynamic(
  () =>
    import(
      '@components/features/fina/link-with-partner/vinacapital/transaction-funds'
    ),
  { ssr: false },
);

export const TransactionFundFinaAgent = dynamic(
  () =>
    import(
      '@components/features/fina/link-with-partner/vinacapital/fina-agent'
    ),
  { ssr: false },
);

export const FundTradingByReferral = dynamic(
  () =>
    import(
      '@components/features/fina/link-with-partner/vinacapital/fund-trading-by-referral'
    ),
  { ssr: false },
);

export const ConfigurationManagement = dynamic(
  () => import('@components/features/system/configurations'),
  { ssr: false },
);

export const finaRoutes = () => {
  return [
    {
      path: RouteUtils.buildRouteWithI18n('/admin/fina'),
      component: RouteContainer,
      exact: true,
      routes: [],
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/products'),
      component: RouteContainer,
      routes: [
        {
          path: RouteUtils.buildRouteWithI18n('/admin/products/categories'),
          component: ProductCategory,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/products/loans'),
          component: LoanManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/products/product-detail'),
          component: ProductDetailManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/products/insurances'),
          component: InsuranceManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/products/bonds'),
          component: BondsManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/products/fund'),
          component: FundManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/products/properties'),
          component: PropertyManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n(
            '/admin/products/properties/import',
          ),
          component: ImportPropertiesManagement,
          exact: true,
        },
      ],
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/invest'),
      component: RouteContainer,
      routes: [
        {
          path: RouteUtils.buildRouteWithI18n('/admin/invest/bonds'),
          component: BondsDisbursementManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n(
            '/admin/invest/transaction-funds',
          ),
          component: TransactionFundsManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n(
            '/admin/invest/fund-trading-by-referral',
          ),
          component: FundTradingByReferral,
          exact: true,
        },
      ],
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/transaction'),
      component: TransactionManagement,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/seo-landing-page'),
      component: SeoLandingPage,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/fina-staff'),
      component: RouteContainer,
      routes: [
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n(
            '/admin/fina-staff/customers/search',
          ),
          component: SearchUserManagement,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/fina-staff/customers'),
          component: CustomerManagement,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n(
            '/admin/fina-staff/customers/collaborators',
          ),
          component: UserCollaboratorManagement,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n(
            '/admin/fina-staff/customers/access-permission-user',
          ),
          component: (props) => <AccessPermissionUserManagement />,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n(
            '/admin/fina-staff/customers/sharing-view',
          ),
          component: SharingViewUserManagement,
        },
      ],
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/deals'),
      component: RouteContainer,
      routes: [
        {
          path: RouteUtils.buildRouteWithI18n('/admin/deals/loans'),
          component: DealLoanManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/deals/insurances'),
          component: TransactionDealInsurancesManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n(
            '/admin/deals/for-control-disbursement',
          ),
          component: ForControlDisbursementManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/deals/bonds'),
          component: BondsDisbursementManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/deals/import'),
          component: ImportDealManagement,
          exact: true,
        },
      ],
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/reports'),
      component: RouteContainer,
      routes: [
        {
          path: RouteUtils.buildRouteWithI18n('/admin/reports/call-logs'),
          component: ReportCallLog,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/reports/tasks'),
          component: ReportTask,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/reports/deals'),
          component: ReportDeal,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/reports/performance'),
          component: ReportPerformance,
          exact: true,
        },
      ],
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/insurance'),
      component: RouteContainer,
      routes: [
        {
          path: RouteUtils.buildRouteWithI18n(
            '/admin/insurance/guarantee-hospital',
          ),
          component: GuaranteeHospital,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n(
            '/admin/insurance/health-insurance',
          ),
          component: HealthInsurance,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/insurance/task'),
          component: () => (
            <ClaimInsurance
              {...{
                type: TASK_TYPES.CLAIM_INSURANCE,
              }}
            />
          ),
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/insurance/deal-claim'),
          component: DealClaimInsurance,
          exact: true,
        },
      ],
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/vehicles'),
      component: RouteContainer,
      routes: [
        {
          path: RouteUtils.buildRouteWithI18n(
            '/admin/vehicles/vehicles-categories',
          ),
          component: VehicleCategoryManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/vehicles/all'),
          component: VehicleManagement,
          exact: true,
        },
      ],
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/progress-template'),
      component: ProductProgressManagement,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/projects'),
      component: ProjectManagement,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/commission'),
      component: RouteContainer,
      routes: [
        {
          path: RouteUtils.buildRouteWithI18n(
            '/admin/commission/loan-product-settings',
          ),
          component: CommissionLoanProductSetting,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n(
            '/admin/commission/insurance-product-settings',
          ),
          component: CommissionInsuranceProductSetting,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n(
            '/admin/commission/receive-management',
          ),
          component: CommissionReceiveManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n(
            '/admin/commission/spend-management',
          ),
          component: CommissionSpendManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n(
            '/admin/commission/personal-management',
          ),
          component: MyCommissionManagement,
          exact: true,
        },
      ],
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/business'),
      component: RouteContainer,
      routes: [
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/business/contacts'),
          component: ContactManagement,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/business/import-contact'),
          component: ImportContact,
        },
      ],
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/document-templates'),
      component: Documents,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/question-groups'),
      component: QuestionGroupsManagement,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/config-question-groups'),
      component: ConfigurationManagement,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/client-reviews'),
      component: ClientReviewManagement,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/preferential-reviews'),
      component: PreferentialReviewManagement,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/news-management/category'),
      component: NewsCategoryManagement,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/news-management/news'),
      component: NewsManagement,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/banners'),
      component: BannersManagement,
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n(
        '/admin/promotions/alma-registrations',
      ),
      component: AlmaRegistrationManagement,
      exact: true,
    },
  ];
};
