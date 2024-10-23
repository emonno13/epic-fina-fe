import ClientEmbededCalculator from '@components/features/client/embeded-calculator';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const EmbededCaculatorPage = (props: any) => {
  return <ClientEmbededCalculator />;
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'second-page'])),
  },
});

export default EmbededCaculatorPage;
