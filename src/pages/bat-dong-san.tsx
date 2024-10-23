import ClientHome from '@components/features/client/home';
import { ClientHomeUtils } from '@components/features/client/home/utils';
import { LightlyClientLayout } from '@layouts/admin/lightly/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const RealEstateHomePage = ({ banners = [] }: any) => {
  return <ClientHome {...{ banners }} />;
};

RealEstateHomePage.Layout = LightlyClientLayout;

export const getServerSideProps = async ({ locale }) => {
  const banners = await ClientHomeUtils.fetchBanners();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'second-page'])),
      banners,
    },
  };
};

export default RealEstateHomePage;
