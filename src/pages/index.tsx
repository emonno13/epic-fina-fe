import ClientHome from '@components/features/client/home';
import { ClientHomeUtils } from '@components/features/client/home/utils';
import { LightlyClientLayout } from 'layouts/admin/lightly/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Homepage = ({ banners = [] }: any) => {
  const { locale, push, defaultLocale } = useRouter();
  useEffect(() => {
    push(`/${locale || defaultLocale}`, undefined, {
      shallow: true,
      locale: locale || defaultLocale,
    });
  }, []);
  return <ClientHome {...{ banners }} />;
};

Homepage.Layout = LightlyClientLayout;

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

export default Homepage;
