import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import FinaAgentLayout from '../layouts/fina-agent';
import FinaAgentPage from '../components/features/client/fina-agent-landing';

const FinaAgentLandingPage = (props: any) => {
  return (
    <FinaAgentPage />
  );
};

FinaAgentLandingPage.Layout = FinaAgentLayout;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'second-page'])),
  },
});

export default FinaAgentLandingPage;
