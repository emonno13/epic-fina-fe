import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ClientCalculatingLoanCapacity from '@components/features/client/calculators-toolkit/bank-loan-calculator';
import { LightlyClientLayout } from 'layouts/admin/lightly/client';
import { AppUtils } from '@lib/utils/app-utils';

const CalculatingLoanCapacityPage = () => {
  return <ClientCalculatingLoanCapacity />;
};

CalculatingLoanCapacityPage.Layout = AppUtils?.getFinaPage()
  ? LightlyClientLayout
  : null;

export const getServerSideProps = async ({ locale, ...props }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['calculator-toolkit'])),
    },
  };
};

export default CalculatingLoanCapacityPage;
