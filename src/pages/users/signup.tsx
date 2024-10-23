import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { SignupUserForm } from '../../components/shared/user/signup';

const SignupUserPage = (props: any) => {
  return (
    <SignupUserForm {...props}/>
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default SignupUserPage;
