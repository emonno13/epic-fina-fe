import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';
import { modals } from '../..';
import { IconLinkActive } from '../icons/icon-link-active';

const title = 'Hủy liên kết tài khoản';
const description =
  'Nếu hủy liên kết tài khoản, bạn sẽ không thể giao dịch đầu tư bằng tài khoản này trên FINA. Bạn có chắc chắn muốn hủy liên kết tài khoản này?';

const ModalAffiliateReject = (props) => {
  const { t } = useHTranslation('admin-common');
  const { action } = props;

  return (
    <div className="modal-affiliate-reject">
      <IconLinkActive />
      <h2 className="info-contract-modal-confirm-title">
        {t(title, { vn: title })}
      </h2>
      <p className="info-contract-modal-confirm-desc">
        {t(description, { vn: description })}
        <br />
        {t('(Hiện tại chưa hỗ trợ)', { vn: '(Hiện tại chưa hỗ trợ)' })}
      </p>

      <div className="profile-info-affiliate-modal-button">
        <Button
          className="profile-affiliate-action-button profile-affiliate-action-reject"
          onClick={() => {
            action(undefined);
          }}
          style={{ width: '135px', marginRight: '16px' }}
        >
          Huỷ bỏ
        </Button>
        <Button
          className="profile-affiliate-action-button profile-affiliate-action-next"
          onClick={() => {
            action(modals?.succeedReject?.name);
          }}
          style={{ width: '185px' }}
          disabled
        >
          Xác nhận hủy liên kết
        </Button>
      </div>
    </div>
  );
};

export default ModalAffiliateReject;
