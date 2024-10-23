import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const LoginForm = dynamic(
  () => import('../../components/shared/user/login'),
  { ssr: false },
);


const LoginPage = (props: any) => {
  return (
    <LoginForm {...props} />
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default LoginPage;
