import BorrowingAbilitySurveyResult from '@components/shared/borrowing-ability-survey-result';
import SurveyLayout from 'layouts/survey';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const SurveyLoanAbilityPage = () => {
  return <BorrowingAbilitySurveyResult />;
};

SurveyLoanAbilityPage.Layout = SurveyLayout;

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default SurveyLoanAbilityPage;
