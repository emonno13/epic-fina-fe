import InstallationInstruction from '@components/features/client/installation-instruction';
import { LightlyClientLayout } from '@layouts/admin/lightly/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

const InstallationInstructionPage = (props: any) => {
  return (
    <>
      <Head>
        <title>Hướng dẫn cài đặt</title>
      </Head>
      <InstallationInstruction />
    </>
  );
};

InstallationInstructionPage.Layout = LightlyClientLayout;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'second-page'])),
  },
});

export default InstallationInstructionPage;
