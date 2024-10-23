import ClientContactExperts from '@components/features/client/contact-experts';
import { LightlyClientLayout } from '@layouts/admin/lightly/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ContactPage = (_props: any) => {
  return <ClientContactExperts />;
};

ContactPage.Layout = LightlyClientLayout;

export const getServerSideProps = async ({ locale, ...props }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'admin-menu',
        'admin-common',
        'admin-crm',
        'common',
      ])),
    },
  };
};

export default ContactPage;
