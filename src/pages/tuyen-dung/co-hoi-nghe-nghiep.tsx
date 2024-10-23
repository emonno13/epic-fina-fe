import RecruitLayout from '@layouts/recruit';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import RecruitJobs from '../../components/features/client/recruit/jobs/jobs';

const RecruitPage = () => {
  return <RecruitJobs />;
};

RecruitPage.Layout = RecruitLayout;

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'recruit'])),
    },
  };
};

export default RecruitPage;
