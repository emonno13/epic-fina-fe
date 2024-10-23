import FinaPortalPage from '@components/features/client/fina-portal';
import { ClientHomeUtils } from '@components/features/client/home/utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const FinaPortal = ({ banners = [] }) => {
  return <FinaPortalPage {...{ banners }} />;
};

export const getServerSideProps = async ({ locale }) => {
  const banners = await ClientHomeUtils.fetchBanners();
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'second-page',
        'admin-common',
      ])),
      banners,
    },
  };
};
export default FinaPortal;
