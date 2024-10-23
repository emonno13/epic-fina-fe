import React from 'react';
import { useRouter } from 'next/router';
import { PageHeader } from 'antd';

import PreLoginFrame from '@components/shared/common/pre-login-frame/pre-login-frame';
import PreLoginFrameLogo from '@components/shared/common/pre-login-frame/pre-login-frame-logo';
import { useIsMobile } from '@lib/hooks/use-media';
import { ChangePasswordForm } from './change-password-form';

import './forgot-password.scss';

export const ForgotPasswordForm = ({ layout }: any) => {
  const { query, push } = useRouter();
  const isMobile = useIsMobile();
  const userId = query?.userId;

  return (
    <PreLoginFrame
      header={<PreFramePageHeader />}
      leftSidePhoto={
        isMobile ? 'new-mbpassword-mb.png' : 'bg-forgot-password.png'
      }
    >
      <div className={'pre-login sign-up'}>
        <PreLoginFrameLogo />
        <ChangePasswordForm
          onSuccess={() => push('/')}
          layout={layout}
          user={{ id: userId }}
        />
      </div>
    </PreLoginFrame>
  );
};

export const PreFramePageHeader = () => {
  const isMobile = useIsMobile();
  console.log('isMobile: ', isMobile);

  return (
    <PageHeader
      title={<></>}
      onBack={() => window.history.back()}
      style={
        isMobile
          ? { paddingTop: 24, paddingLeft: 24 }
          : { paddingTop: 60, paddingLeft: 54 }
      }
    />
  );
};
