import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { httpRequester } from '@lib/networks/http';
import { useAuth } from '@lib/providers/auth';
import { ConvertUtils } from '@lib/utils/convert';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Button, Checkbox, notification } from 'antd';
import { FC, useState } from 'react';
import SignaturePad from 'react-signature-canvas';

import './fund-certificate-e-signature.module.scss';

interface FundCertificateESignatureProps {
  callbackWhenESignatureSuccessfully?: (response?: any) => void;
  urlContract: string;
}

export const FundCertificateESignature: FC<FundCertificateESignatureProps> = ({
  callbackWhenESignatureSuccessfully = (response?: any) => {},
  urlContract,
}) => {
  let sigPad: any = {};
  const [checked, setChecked] = useState(false);
  const { currentUser } = useAuth();
  const { t } = useHTranslation('common');

  const handleSignature = async () => {
    if (!checked) {
      notification.error({
        message: t('Failure', { vn: 'Thất bại' }),
        description: t('Please read the contract and confirm', {
          vn: 'Quý khách vui lòng chấp thuật với hợp đồng',
        }),
      });
      return;
    }

    if (sigPad.isEmpty()) {
      notification.error({
        message: t('Failure', { vn: 'Thất bại' }),
        description: t('Please enter signature', {
          vn: 'Vui lòng điền chữ ký',
        }),
      });
      return;
    }

    const file = await FormUtils.submitForm(
      {
        name: `signature-kyc-mio-${ConvertUtils.slugify(ConverterUtils.getFullNameUser(currentUser))}-${new Date().getTime()}`,
        image: sigPad?.getTrimmedCanvas().toDataURL('image/png'),
      },
      {
        nodeName: 'file/upload-base64',
        method: 'post',
        showSuccessMessage: false,
      },
    );

    if (file?.url) {
      const urlSignature = file.url;
      const response = httpRequester.postToApi({
        url: endpoints.endpointWithApiDomain('/users/sign-contract-with-mio'),
        params: { urlSignature },
      });
      callbackWhenESignatureSuccessfully();
      return;
    }

    notification.error({
      message: t('Failure', { vn: 'Thất bại' }),
      description: t('An error occurred, please re-sign', {
        vn: 'Có lỗi xảy ra, quý khách vui lòng kí lại',
      }),
    });
  };

  return (
    <div className="fund-certificate-e-signature">
      <div className="fund-certificate-e-signature__title">
        <strong>{t('Your signature', { vn: 'Chữ ký của bạn' })}</strong>
      </div>

      <div className="fund-certificate-e-signature__body">
        <div className="fund-certificate-e-signature__body__board">
          <SignaturePad
            canvasProps={{ className: 'signature-pad' }}
            ref={(ref) => (sigPad = ref)}
          />
        </div>

        <div className="fund-certificate-e-signature__body__title">
          {t('Sign your name in the middle of the screen', {
            vn: 'Ký tên ở giữa màn hình',
          })}
        </div>

        <div>
          <Checkbox
            onChange={(e) => setChecked(e?.target?.checked)}
            className="m-r-5"
          />
          <span>
            Vui lòng xem trước thông tin trên
            <a href={urlContract} target="_blank" rel="noreferrer">
              {' Hợp đồng mở tài khoản '}
            </a>
          </span>
          của Quý khách
        </div>
      </div>

      <div className="fund-certificate-e-signature__footer">
        <Button
          onClick={() => {
            sigPad.clear();
          }}
          className="btn-reset"
        >
          {t('Reset', { vn: 'Đặt lại' })}
        </Button>
        <Button onClick={handleSignature} type="primary" className="btn-submit">
          {t('Confirm', { vn: 'Xác nhận' })}
        </Button>
      </div>
    </div>
  );
};

export default FundCertificateESignature;
