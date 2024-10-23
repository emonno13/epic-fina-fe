import { Button } from 'antd';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { HModal } from '@components/shared/common/h-modal';
import { Link } from '@components/shared/link';
import UserHeaderAvatar from '@components/shared/user-header-avatar';
import { LoginForm } from '@components/shared/user/login';
import { useHTranslation } from '@lib/i18n';
import { useIsAuthenticated } from '@lib/providers/auth';

const SurveyLayoutHeader = () => {
  const { t } = useHTranslation('admin-common');
  const [loginVisible, setLoginVisible] = useState(false);
  const isAuthenticated = useIsAuthenticated();

  const { push } = useRouter();

  const onCancelLoginModal = () => {
    setLoginVisible(false);
  };
  const onLoginSuccess = () => {
    onCancelLoginModal();
  };

  const onContactExpert = useCallback(() => {
    push('/lien-he');
  }, [push]);

  return (
    <div className="survey-header">
      <div className="survey-header__content">
        <Link href="/">
          <img
            {...{
              src: '/assets/images/fina_logo.png',
            }}
          />
        </Link>
        <div className="survey-header__content__buttons">
          <Button className="contact-experts" onClick={onContactExpert}>
            Liên hệ chuyên gia
          </Button>
          {!isAuthenticated && (
            <Button
              type="primary"
              className="login"
              onClick={() => setLoginVisible(true)}
            >
              Đăng nhập
            </Button>
          )}
          <UserHeaderAvatar />
        </div>
      </div>
      <HModal
        {...{
          visible: loginVisible,
          onCancel: onCancelLoginModal,
          footer: null,
          className: 'survey-login-modal',
        }}
      >
        <LoginForm {...{ onGotSuccess: onLoginSuccess }} />
      </HModal>
    </div>
  );
};

export default SurveyLayoutHeader;
