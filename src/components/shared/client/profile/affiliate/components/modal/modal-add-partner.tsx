import { CloseIconLargeSvg } from '@icons';
import { useHTranslation } from '@lib/i18n';
import { Modal } from 'antd';
import { modals } from '../..';
import ModalAffiliateAdd from './add';
import ModalAffiliateCreate from './create';
import ModalAffiliateHome from './home';
import ModalAffiliateOTP from './otp';
import ModalAffiliateOTPCreate from './otp-create';
import ModalAffiliateReject from './reject';
import ModalAffiliateSucceed from './succeed-add';

const ModalAffiliate = (props) => {
  const { t } = useHTranslation('admin-common');
  const { visible, setVisible, type = modals?.home?.name, setType } = props;

  const action = (value) => {
    setType(value);
  };

  return (
    <>
      <Modal
        {...{
          visible: visible,
          closeIcon: <CloseIconLargeSvg />,
          closable: true,
          onCancel: () => setVisible(false),
          width: modals?.[type]?.width,
          className: 'profile-info-affiliate-modal',
          footer: null,
        }}
      >
        {/* Chưa liên kết tài khoản */}
        {type === modals.home.name && (
          <ModalAffiliateHome {...{ type, action }} />
        )}
        {/* flow đồng bộ khi đã có tài khoản */}
        {type === modals.add.name && (
          <ModalAffiliateAdd {...{ type, action }} />
        )}
        {type === modals.otp.name && (
          <ModalAffiliateOTP {...{ type, action }} />
        )}
        {type === modals.succeedAdd.name && (
          <ModalAffiliateSucceed {...{ type }} />
        )}
        {/* flow tạo mới tài khoản */}
        {type === modals.create.name && (
          <ModalAffiliateCreate {...{ type, action }} />
        )}
        {type === modals.otpCreate.name && (
          <ModalAffiliateOTPCreate {...{ type, action }} />
        )}
        {type === modals.succeedCreate.name && (
          <ModalAffiliateSucceed {...{ type, action }} />
        )}
        {/* flow huỷ liên kết */}
        {type === modals.reject.name && (
          <ModalAffiliateReject {...{ type, action }} />
        )}
        {type === modals.succeedReject.name && (
          <ModalAffiliateSucceed {...{ type, action }} />
        )}
      </Modal>
    </>
  );
};

export default ModalAffiliate;
