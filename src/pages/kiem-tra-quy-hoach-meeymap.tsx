import CheckUrbanPlanningMeeymap from '@components/features/client/check-urban-planning/meey-map';
import { LightlyClientLayout } from 'layouts/admin/lightly/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CheckUrbanPlanningMeeymapPage = () => {
  return <CheckUrbanPlanningMeeymap />;
};

CheckUrbanPlanningMeeymapPage.Layout = LightlyClientLayout;

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'second-page'])),
    },
  };
};

export default CheckUrbanPlanningMeeymapPage;
