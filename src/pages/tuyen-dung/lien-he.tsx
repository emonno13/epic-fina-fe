import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import RecruitLayout from '../../layouts/recruit';
import RecruitContact from '../../components/features/client/recruit/contact/contact';

const RecruitDetailPage: any = ({ recruitDetail }: any) => {
  return (
    <RecruitContact  />
  );
};

RecruitDetailPage.Layout = RecruitLayout;

export const getServerSideProps = async ({ locale, params }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'recruit'])),
    },
  };
};

export default RecruitDetailPage;
