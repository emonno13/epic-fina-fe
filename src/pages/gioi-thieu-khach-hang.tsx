import { InformationSurveyIntroduce } from '@components/features/client/information-survey';
import { LightlyClientLayout } from '@layouts/admin/lightly/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const InformationSurveyIntroducePage = (props: any) => {
  return <InformationSurveyIntroduce />;
};

InformationSurveyIntroducePage.Layout = LightlyClientLayout;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'second-page'])),
  },
});

export default InformationSurveyIntroducePage;
