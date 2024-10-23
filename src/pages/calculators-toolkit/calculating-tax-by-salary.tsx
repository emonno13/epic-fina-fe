import CalculatingTaxBySalary from '@components/features/client/calculators-toolkit/calculating-tax-by-salary';
import { LightlyClientLayout } from '@layouts/admin/lightly/client';
import { AppUtils } from '@lib/utils/app-utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CalculatingTaxBySalaryPage = () => {
  return <CalculatingTaxBySalary />;
};

CalculatingTaxBySalaryPage.Layout = AppUtils?.getFinaPage()
  ? LightlyClientLayout
  : null;

export const getServerSideProps = async ({ locale, ...props }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'admin-menu',
        'admin-common',
        'admin-crm',
        'common',
        'calculator-toolkit',
      ])),
    },
  };
};

export default CalculatingTaxBySalaryPage;
