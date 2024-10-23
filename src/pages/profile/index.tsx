import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { LightlyClientLayoutProfile } from '../../layouts/admin/lightly/client';

const ProfilePage = () => {
  const router = useRouter();
  const { locale } = useRouter();
  router.push(`${locale}/profile/dashboard`);

  return <></>;
};

ProfilePage.Layout = LightlyClientLayoutProfile;

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'second-page', 'admin-common'])),
    },
  };
};

export default ProfilePage;
