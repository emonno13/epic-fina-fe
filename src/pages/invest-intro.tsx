import { SCREEN } from '@components/features/banners-management/constants';
import { ClientHomeUtils } from '@components/features/client/home/utils';
import InvestIntro from '@components/features/client/invest-intro';
import { LightlyClientLayout } from '@layouts/admin/lightly/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const InvestInfo = ({ banners = [] }) => <InvestIntro banners={banners} />;

InvestInfo.Layout = LightlyClientLayout;

export const getServerSideProps = async ({ locale }) => {
  const banners = await ClientHomeUtils.fetchBanners(SCREEN.FUND_PUBLIC);
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      banners,
    },
  };
};

export default InvestInfo;
