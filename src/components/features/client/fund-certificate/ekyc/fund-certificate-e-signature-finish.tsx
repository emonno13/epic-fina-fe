import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { useHTranslation } from '@lib/i18n';
import { ESignature } from 'icons/rsvgs/e-signature';
import { FC } from 'react';

interface FundCertificateESignatureFinishProps {
  callback?: (value?: any) => void;
  urlContract?: string;
}

export const FundCertificateESignatureFinish: FC<
  FundCertificateESignatureFinishProps
> = ({ callback, urlContract }) => {
  const { t } = useHTranslation('common');
  const handleClick = () => {
    if (callback) callback();
  };

  const handleDownloadContact = () => {
    window.open(urlContract, '_blank');
  };

  return (
    <div className="ekyc-fund-modal-accuracy ekyc-fund-modal-accuracy-success">
      <ESignature />
      <h2 className="ekyc-fund-modal-accuracy-title">
        {t('Confirm', { vn: 'Xác nhận' })}
      </h2>
      <p className="ekyc-fund-modal-accuracy-desc">
        {t('Your contract has been confirmed electronically', {
          vn: 'Hợp đồng của quý khách đã được xác nhận ký điện tử',
        })}
      </p>

      <div className="ekyc-fund-modal-accuracy-actions">
        <HButton onClick={handleDownloadContact}>
          {t('Load the contract', { vn: 'Tải hợp đồng đã ký' })}
        </HButton>
        <HButton onClick={handleClick} type="primary">
          {t('Close', { vn: 'Đóng' })}
        </HButton>
      </div>
    </div>
  );
};

export default FundCertificateESignatureFinish;
