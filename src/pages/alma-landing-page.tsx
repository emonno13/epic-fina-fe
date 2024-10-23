import ClientAlmaLanding from '@components/features/client/alma-landing';
import LightlyClientAlmaLayout from 'layouts/admin/lightly/client-alma';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AlmaLandingPage = (props: any) => {
  return <ClientAlmaLanding />;
};

AlmaLandingPage.Layout = LightlyClientAlmaLayout;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'second-page'])),
  },
});

export default AlmaLandingPage;
