import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import SurveyLayout from 'layouts/survey';

const SurveyForm = dynamic(() => import('components/shared/survey'), { ssr: false });

const SurveyPage = () => {
  return <SurveyForm />;
};

SurveyPage.Layout = SurveyLayout;

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default SurveyPage;
