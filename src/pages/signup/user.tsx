import React from 'react';
import { useTranslation } from 'react-i18next';
import { SignupUserForm } from '../../components/shared/user/signup';
import { HPanel } from '../../components/shared/layout/panel';

const SignupUserPage = (props: any) => {
  const { t } = useTranslation();

  return (
    <HPanel screenSize="small" className="p-t-100">
      <h3>{t('hi_there')}</h3>
      <div className="m-b-20">{t('sub_welcome_signup')}</div>
      <SignupUserForm {...props}/>
    </HPanel>
  );
};

export default SignupUserPage;