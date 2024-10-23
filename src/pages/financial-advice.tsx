import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import FinancialAdviceLayout from '../layouts/financial-advice';
import FinancialAdvice from '../components/features/client/financial-advice-landing';


const FinancialAdviceLandingPage = ({ data }) => {
  return (
    <FinancialAdvice />
  );
};

FinancialAdviceLandingPage.Layout = FinancialAdviceLayout;

export const getServerSideProps = async ({ locale, query }) => {
  return {
    props: { ...(await serverSideTranslations(locale, ['common', 'second-page', 'calculator-toolkit'])) },
  };
};

export default FinancialAdviceLandingPage;
