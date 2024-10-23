import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import RecruitLayout from 'layouts/recruit';
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
