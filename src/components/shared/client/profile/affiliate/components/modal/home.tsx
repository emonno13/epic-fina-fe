import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';
import { modals, partners } from '../..';
import { IconLinkActive } from '../icons/icon-link-active';

const title = 'Liên kết tài khoản';
const description =
  'Bạn đã có tài khoản giao dịch. Chứng chỉ quỹ/ Trái phiếu của một trong những đối tác sau?';

const ModalAffiliateHome = (props) => {
  const { t } = useHTranslation('admin-common');
  const { action } = props;

  return (
    <div className="modal-affiliate-home">
      <IconLinkActive />
      <h2 className="info-contract-modal-confirm-title">
        {t(title, { vn: title })}
      </h2>
      <p className="info-contract-modal-confirm-desc">
        {t(description, { vn: description })}
      </p>

      {partners?.map((el, index) => {
        return (
          <div key={index}>
            <img src={el.icon} alt={el?.name} width={36} />
          </div>
        );
      })}

      <div className="profile-info-affiliate-modal-button">
        <Button
          className="profile-affiliate-action-button profile-affiliate-action-next"
          onClick={() => {
            action(modals?.add?.name);
          }}
          style={{ width: '310px' }}
        >
          Đã có, đồng bộ tài khoản
        </Button>
        <Button
          className="profile-affiliate-action-button profile-affiliate-action-reject"
          onClick={() => {
            action(modals?.create?.name);
          }}
          style={{ width: '310px' }}
        >
          Chưa có, tạo tài khoản mới
        </Button>
      </div>
    </div>
  );
};

export default ModalAffiliateHome;
