import RecruitAboutUs from '@components/features/client/recruit/about-us';
import RecruitLayout from '@layouts/recruit';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const RecruitPage = () => {
  return <RecruitAboutUs />;
};

RecruitPage.Layout = RecruitLayout;

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default RecruitPage;
