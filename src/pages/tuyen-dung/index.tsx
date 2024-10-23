import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import RecruitLayout from 'layouts/recruit';
import RecruitHome from '../../components/features/client/recruit/home/home';

const RecruitPage = () => {
  return <RecruitHome />;
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
