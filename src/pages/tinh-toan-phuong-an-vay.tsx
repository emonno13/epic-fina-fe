import { endpoints } from '@lib/networks/endpoints';
import { doRequest } from '@lib/networks/http';
import SurveyLayout from 'layouts/survey';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SurveyForm = dynamic(() => import('components/shared/survey'), {
  ssr: false,
});

const LoanPlanSurveyPage = ({ loanPlanCalculationQuestionGroup }) => {
  const { replace } = useRouter();
  useEffect(() => {
    if (loanPlanCalculationQuestionGroup?.id) {
      replace(
        `${location.pathname}?documentId=${loanPlanCalculationQuestionGroup.id}`,
      );
    }
  }, [loanPlanCalculationQuestionGroup?.id]);
  return <SurveyForm />;
};

LoanPlanSurveyPage.Layout = SurveyLayout;

export const getServerSideProps = async ({ locale }) => {
  const filter = {
    where: {
      code: 'QG_LOAN_PLAN_CALCULATION',
    },
  };
  const questionGroups = await doRequest(
    {
      url: `${endpoints.endpointWithApiDomain('/question-groups/public')}?filter=${encodeURIComponent(JSON.stringify(filter))}`,
    },
    'get',
  );
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'second-page'])),
      loanPlanCalculationQuestionGroup: questionGroups?.data?.[0] || {},
    },
  };
};

export default LoanPlanSurveyPage;
