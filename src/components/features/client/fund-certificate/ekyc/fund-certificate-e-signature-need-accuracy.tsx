import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { NoESignature } from 'icons/rsvgs/no-e-signature';
import { eSignatureStep } from '../detail/constants';

const FundCertificateESignatureNeedAccuracy = ({
  setCurrentStepESignature,
  setVisibleESignature,
}) => {
  return (
    <div className="ekyc-fund-modal-accuracy">
      <NoESignature />
      <h2 className="ekyc-fund-modal-accuracy-title">
        Để ký hợp đồng quý khách vui lòng ký tên
      </h2>
      <p className="ekyc-fund-modal-accuracy-desc">
        {'Nhấn vào nút “Ký hợp đồng ngay" để đi đến trang ký tên'}
      </p>

      <div className="ekyc-fund-modal-accuracy-actions">
        <HButton
          type="default"
          onClick={() => {
            setCurrentStepESignature('');
            setVisibleESignature(false);
          }}
        >
          Huỷ bỏ
        </HButton>

        <HButton
          type="primary"
          onClick={() =>
            setCurrentStepESignature(eSignatureStep.PREVIEW_CONTRACT)
          }
        >
          Ký hợp đồng ngay
        </HButton>
      </div>
    </div>
  );
};

export default FundCertificateESignatureNeedAccuracy;
