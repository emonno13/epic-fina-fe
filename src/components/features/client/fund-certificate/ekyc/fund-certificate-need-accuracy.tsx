import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { useHTranslation } from '@lib/i18n';
import { Divider } from 'antd';
import { NoAccuracyEkyc } from 'icons/rsvgs/no-accuracy-ekyc';
import { kycWithMioStep } from '../detail/constants';

export const FundCertificateNeedAccuracy = ({ setCurrentStepKycWithMio }) => {
  const { t } = useHTranslation('common');

  return (
    <div className="ekyc-fund-modal-accuracy">
      <NoAccuracyEkyc />
      <h2 className="ekyc-fund-modal-accuracy-title">
        Vui lòng xác thực tài khoản để tiếp tục giao dịch
      </h2>
      <p className="ekyc-fund-modal-accuracy-desc">
        Để mua được chứng chỉ quỹ, Quý khách cần có tài khoản của đơn vị phát
        hành Vina Capital
      </p>

      <div className="ekyc-fund-modal-accuracy-btns">
        <HButton
          type="primary"
          onClick={() =>
            setCurrentStepKycWithMio(kycWithMioStep.ENTER_INFORMATION_FOR_ASYNC)
          }
        >
          Đồng bộ tài khoản đã có
        </HButton>
        <Divider orientation="center">{t('Or', { vn: 'Hoặc' })}</Divider>
        <HButton
          type="default"
          onClick={() =>
            setCurrentStepKycWithMio(kycWithMioStep.ENTER_INFORMATION_FOR_KYC)
          }
        >
          Đăng ký tài khoản mới
        </HButton>
      </div>
    </div>
  );
};
