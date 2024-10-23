import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ClientHTPearlQRCodeCheckin from '../components/features/client/htpearl/qr-code';

const HTPearlQRCodeCheckinPage = (props: any) => {
  return (
    <ClientHTPearlQRCodeCheckin />
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'second-page'])),
  },
});

export default HTPearlQRCodeCheckinPage;
