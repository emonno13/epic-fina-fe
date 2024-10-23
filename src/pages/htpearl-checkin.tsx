import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ClientHTPearlCheckin from '../components/features/client/htpearl';

const HTPearlCheckinPage = (props: any) => {
  return (
    <ClientHTPearlCheckin />
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'second-page'])),
  },
});

export default HTPearlCheckinPage;
