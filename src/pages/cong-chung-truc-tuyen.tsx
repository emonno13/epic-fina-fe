import OnlineNotarization from '@components/features/client/online-notarization';
import { LightlyClientLayout } from '@layouts/admin/lightly/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CheckUrbanPlanningPage = () => {
  return <OnlineNotarization />;
};

CheckUrbanPlanningPage.Layout = LightlyClientLayout;

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'second-page'])),
    },
  };
};

export default CheckUrbanPlanningPage;
