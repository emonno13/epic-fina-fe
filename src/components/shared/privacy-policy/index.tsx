import cn from 'classnames';
import { FC } from 'react';

import { useHTranslation } from '@lib/i18n';
import { HModal, HModalProps } from '../common/h-modal';
import { usePrivacyPolicyFina } from './hooks';

const PrivacyPolicyModal: FC<HModalProps> = (props) => {
  const { className, ...restProps } = props;
  const privacyPolicy = usePrivacyPolicyFina();
  const { t } = useHTranslation('common');

  return (
    <HModal
      width={'60%'}
      footer={<></>}
      title={t('Privacy policy', { vn: 'Chính sách bảo mật' })}
      {...restProps}
      className={cn('privacy-policy-modal', className)}
    >
      {privacyPolicy}
    </HModal>
  );
};

export default PrivacyPolicyModal;
