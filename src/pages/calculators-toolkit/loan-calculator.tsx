import ClientLoanCalculator from '@components/features/client/calculators-toolkit/loan-calculator';
import { LightlyClientLayout } from '@layouts/admin/lightly/client';
import { AppUtils } from '@lib/utils/app-utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const LoanCalculatorPage = () => {
  return <ClientLoanCalculator />;
};

LoanCalculatorPage.Layout = AppUtils?.getFinaPage()
  ? LightlyClientLayout
  : null;

export const getServerSideProps = async ({ locale, ...props }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['calculator-toolkit'])),
    },
  };
};

export default LoanCalculatorPage;
