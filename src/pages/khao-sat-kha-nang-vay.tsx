import { endpoints } from '@lib/networks/endpoints';
import { doRequest } from '@lib/networks/http';
import SurveyLayout from 'layouts/survey';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SurveyForm = dynamic(() => import('@components/shared/survey'), {
  ssr: false,
});

const LoanBorrowingSurveyPage = ({ loanAbilityQuestionGroup }) => {
  const { replace } = useRouter();
  useEffect(() => {
    if (loanAbilityQuestionGroup?.id) {
      replace(`${location.pathname}?documentId=${loanAbilityQuestionGroup.id}`);
    }
  }, [loanAbilityQuestionGroup?.id]);
  return <SurveyForm />;
};

LoanBorrowingSurveyPage.Layout = SurveyLayout;

export const getServerSideProps = async ({ locale }) => {
  const loanAbilityQuestionGroupParams = {
    where: {
      code: 'QG_LOAN_ABILITY',
    },
  };
  const loanAbilityQuestionGroups = await doRequest(
    {
      url: `${endpoints.endpointWithApiDomain('/question-groups/public')}?filter=${encodeURIComponent(JSON.stringify(loanAbilityQuestionGroupParams))}`,
    },
    'get',
  );
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'second-page'])),
      loanAbilityQuestionGroup: loanAbilityQuestionGroups?.data?.[0] || {},
    },
  };
};

export default LoanBorrowingSurveyPage;
