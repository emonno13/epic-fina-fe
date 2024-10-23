import ClientCalculatorsToolkit from '@components/features/client/calculators-toolkit';
import { LightlyClientLayout } from '@layouts/admin/lightly/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CalculatorsToolkitPage = (props: any) => {
  return <ClientCalculatorsToolkit />;
};

CalculatorsToolkitPage.Layout = LightlyClientLayout;

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

export default CalculatorsToolkitPage;
