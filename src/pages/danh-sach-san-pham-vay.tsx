import ClienLoans from '@components/features/client/loans';
import { LightlyClientLayout } from '@layouts/admin/lightly/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function LoanList() {
  return <ClienLoans />;
}

LoanList.Layout = LightlyClientLayout;

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'admin-menu',
        'admin-common',
        'admin-crm',
        'common',
      ])),
    },
  };
};

export default LoanList;
