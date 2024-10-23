import { HInput } from '@components/shared/common-form-elements/h-input';
import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Button } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import { useState } from 'react';
import { modals } from '../..';

const title = 'Xác thực OTP';

const ModalAffiliateOTP = (props) => {
  const { t } = useHTranslation('admin-common');
  const { action } = props;
  const [timeDefault, setTimeDefault] = useState(Date.now() + 1000 * 60 * 5);
  const phone = '0943272201';

  const handleRequestOTP = async () => {
    await FormUtils.submitForm(
      { telOrEmail: phone },
      {
        nodeName: phone,
        method: 'post',
      },
    );
    setTimeDefault(Date.now() + 1000 * 60 * 5);
  };

  return (
    <div className="modal-affiliate-otp">
      <h2 className="info-contract-modal-confirm-title">
        {t(title, { vn: title })}
      </h2>

      <div style={{ width: '80%' }}>
        <div>
          Vui lòng nhập mã OTP được gửi về số điện thoại{' '}
          {phone.replace(phone.slice(3, phone.length - 3), '*******')} <br />
          Mã có hiệu lực trong vòng{' '}
          <span style={{ color: '#064DD6' }}>
            {' '}
            <Countdown value={timeDefault} format="mm:ss" />
          </span>{' '}
          s
        </div>
        <HForm
          {...{
            method: 'post',
            hideControlButton: true,
            schema: () => [
              createSchemaItem({
                Component: HInput,
                colProps: { span: 24 },
                name: 'otp',
                rules: [
                  {
                    required: true,
                    message: t('OTP is required', {
                      vn: 'Xin vui lòng nhập OTP',
                    }),
                  },
                ],
              }),
            ],
          }}
        />
      </div>

      <div className="profile-info-affiliate-modal-button">
        <div className="profile-info-affiliate-modal-button-item">
          <Button
            className="profile-affiliate-action-button profile-affiliate-action-next"
            onClick={() => {
              action(modals?.succeedAdd?.name);
            }}
            style={{ width: '185px', marginLeft: '8px' }}
          >
            Xác nhận{' '}
          </Button>
        </div>
      </div>

      <div className="resend-wrapper">
        <span>{t('Code not received yet?', { vn: 'Chưa nhận được mã?' })}</span>
        <a className="resend" onClick={handleRequestOTP}>
          {t(' Resend!', { vn: ' Gửi lại' })}
        </a>
      </div>
    </div>
  );
};

export default ModalAffiliateOTP;
