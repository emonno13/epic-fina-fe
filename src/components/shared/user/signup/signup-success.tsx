/* eslint-disable @next/next/no-img-element */
import { FC, useMemo } from 'react';
import cn from 'classnames';

import { HModal, HModalProps } from '@components/shared/common/h-modal';
import { useHTranslation } from '@lib/i18n';
import { useIsMobile } from '@lib/hooks/use-media';

import './sign-up-success.module.scss';

export const SignUpSuccessComponent: FC<HModalProps> = (props) => {
  const { className, ...restProps } = props;
  const { t } = useHTranslation('common');
  const isMobile = useIsMobile();

  const widthModal = useMemo(() => (isMobile ? '80%' : 390), [isMobile]);

  return (
    <HModal
      width={widthModal}
      destroyOnClose
      className={cn('sign-up-success', className)}
      footer={<></>}
      title={<></>}
      {...restProps}
    >
      <img src="/assets/images/signup-sucess.png" alt="sign up success" />
      <h2>
        {t('Successful account registration', {
          vn: 'Đăng ký tài khoản thành công',
        })}
      </h2>
      <a href="/users/login">{t('Login now', { vn: 'Đăng nhập ngay!' })}</a>
    </HModal>
  );
};
