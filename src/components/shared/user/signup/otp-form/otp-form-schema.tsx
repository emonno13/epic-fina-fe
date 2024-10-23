import { HInput } from '@components/shared/common-form-elements/h-input';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem } from '@schema-form/h-types';
import { Button } from 'antd';

export const OtpFormSchema = (props) => {
  const { t } = useHTranslation('common');
  const { handleRequestOTP = (f) => f, showResend = true } = props;

  return [
    createSchemaItem({
      Component: HInput,
      name: 'otp',
      rules: [
        {
          required: true,
          message: t('Please enter OTP code', { vn: 'Vui lòng nhập OTP' }),
        },
      ],
      componentProps: {
        autoComplete: 'false',
        style: {
          paddingTop: 19,
          paddingBottom: 19,
          textAlign: 'center',
          backgroundColor: '#E8EFFF',
          borderColor: '#fff',
          fontWeight: 'bold',
          borderRadius: 8,
        },
      },
    }),
    ...(showResend
      ? [
          createSchemaItem({
            Component: Button,
            componentProps: {
              type: 'link',
              htmlType: 'button',
              children: <span>{t('Gửi lại')}</span>,
              className: 'otp-form__request-new-button',
              onClick: handleRequestOTP,
            },
          }),
        ]
      : []),
  ];
};
