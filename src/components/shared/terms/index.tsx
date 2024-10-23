import cn from 'classnames';
import { FC } from 'react';

import { useHTranslation } from '@lib/i18n';
import { HModal, HModalProps } from '../common/h-modal';
import { useTermsOfUserFina } from './hooks';

import './terms.module.scss';

const TermsOfUserModal: FC<HModalProps> = (props) => {
  const { className, ...restProps } = props;
  const terms = useTermsOfUserFina();
  const { t } = useHTranslation('common');

  return (
    <HModal
      width={'60%'}
      footer={<></>}
      title={t('Terms of user', { vn: 'Điều khoản sử dụng' })}
      className={cn('terms-of-user-modal', className)}
      {...restProps}
    >
      {terms}
    </HModal>
  );
};

export default TermsOfUserModal;
