import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { AccuracyEkyc } from '@icons';
import { useHTranslation } from '@lib/i18n';

interface FundCertificateAccuracySuccessProps {
  callback?: (value?: any) => void;
}

export const FundCertificateAccuracySuccess = ({
  callback,
}: FundCertificateAccuracySuccessProps) => {
  const { t } = useHTranslation('common');

  const handleClick = () => {
    if (callback) callback();
  };

  return (
    <div className="ekyc-fund-modal-accuracy ekyc-fund-modal-accuracy-success">
      <AccuracyEkyc />
      <h2 className="ekyc-fund-modal-accuracy-title">
        Xác thực EKYC thành công
      </h2>
      <p className="ekyc-fund-modal-accuracy-desc">
        Cảm ơn quý khách đã xác thực EKYC
      </p>

      <div className="ekyc-fund-modal-accuracy-actions">
        <HButton onClick={handleClick} type="primary">
          {t('Go to contract signing page', { vn: 'Đến trang ký hợp đồng' })}
        </HButton>
      </div>
    </div>
  );
};
