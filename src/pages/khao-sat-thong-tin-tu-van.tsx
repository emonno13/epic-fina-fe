import { InformationSurvey } from '@components/features/client/information-survey';
import { LightlyClientLayout } from 'layouts/admin/lightly/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const InformationSurveyPage = (props: any) => {
  return <InformationSurvey />;
};

InformationSurveyPage.Layout = LightlyClientLayout;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'second-page'])),
  },
});

export default InformationSurveyPage;
