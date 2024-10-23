import { useHTranslation } from '@lib/i18n';
import { modals } from '../..';
import { IconLinkSuccess } from '../icons/icon-link-success';

const ModalAffiliateSucceed = (props) => {
  const { t } = useHTranslation('admin-common');
  const { type } = props;

  let title = 'Liên kết tài khoản thành công';
  let description =
    'Tài khoản chứng chỉ quỹ/ Trái phiếu của bạn đã được liên kết. Bây giờ, bạn đã có thể giao dịch đầu tư trên FINA.';

  if (type === modals.succeedCreate.name) {
    title = 'Tạo tài khoản thành công';
    description =
      'Tài khoản chứng chỉ quỹ/ Trái phiếu của bạn đã được tạo thành công. Bây giờ, bạn đã có thể giao dịch đầu tư trên FINA.';
  }

  if (type === modals.succeedReject.name) {
    title = 'Tài khoản liên kết đã hủy';
    description = '';
  }

  return (
    <div className="modal-affiliate-succeed-add">
      <IconLinkSuccess />
      <h2 className="info-contract-modal-confirm-title">
        {t(title, { vn: title })}
      </h2>
      {description && (
        <p className="info-contract-modal-confirm-desc">
          {t(description, { vn: description })}
        </p>
      )}
    </div>
  );
};

export default ModalAffiliateSucceed;
