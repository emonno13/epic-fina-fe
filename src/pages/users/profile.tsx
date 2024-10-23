import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LoginForm } from '../../components/shared/user/login';
import { HPanel } from '../../components/shared/layout/panel';

const LoginPage = () => {
  return (
    <HPanel screenSize="small" className="height100percent flex-center-container">
      <div>
        <h2>Hi there!</h2>
        <h3 className="m-b-20 desc-title">We’re happy to have you here again!</h3>
        <LoginForm/>
      </div>
    </HPanel>
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default LoginPage;
