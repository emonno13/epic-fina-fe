import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ForgotPasswordForm } from '../../components/shared/user/forgot-password';

const ForgotPasswordPage = (props: any) => {
  return (
    <ForgotPasswordForm {...props} />
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default ForgotPasswordPage;
