import ClientLoanEstimate from '@components/features/client/loan-estimate';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const EmbededLoanEstimatePage = (props: any) => {
  return <ClientLoanEstimate />;
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'second-page'])),
  },
});

export default EmbededLoanEstimatePage;
