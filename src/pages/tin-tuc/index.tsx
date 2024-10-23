import ClientNews from '@components/features/client/news';
import { LightlyClientLayout } from '@layouts/admin/lightly/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const NewsPage = () => {
  return <ClientNews />;
};

NewsPage.Layout = LightlyClientLayout;

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default NewsPage;
