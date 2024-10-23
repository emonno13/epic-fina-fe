import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ClientCalculatingBudgetPlanner from '@components/features/client/calculators-toolkit/budget-planner';
import { LightlyClientLayout } from 'layouts/admin/lightly/client';
import { AppUtils } from '@lib/utils/app-utils';

const BudgetPlannerPage = () => {
  return <ClientCalculatingBudgetPlanner />;
};

BudgetPlannerPage.Layout = AppUtils?.getFinaPage() ? LightlyClientLayout : null;

export const getServerSideProps = async ({ locale, ...props }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['calculator-toolkit'])),
    },
  };
};

export default BudgetPlannerPage;
