import { useTranslation } from 'react-i18next';

import { HInput } from '@components/shared/common-form-elements/h-input';
import { createSchemaItem } from '@schema-form/h-types';

export const ChangePasswordFormSchema = () => {
  const { t } = useTranslation('common');

  return [
    createSchemaItem({
      Component: HInput.Password,
      name: 'password',
      label: t('Mật khẩu', { vn: 'Mật khẩu', en: 'Password' }),
      rules: [
        {
          required: true,
          message: t('validateMsg.requireEnterNewPassword'),
        },
        () => ({
          validator(rule, value) {
            if (!value || value.length >= 8) {
              return Promise.resolve();
            }
            return Promise.reject(t('validateMsg.passwordMinimum8Cha'));
          },
        }),
      ],
      componentProps: {
        placeholder: t('enterNewPassword'),
        autoComplete: false,
        className:
          'fina-form__input-control fina-form__input-control--password',
        modernLabel: true,
      },
    }),
    createSchemaItem({
      Component: HInput.Password,
      name: 'confirmPassword',
      label: t('Nhập lại mật khẩu', {
        vn: 'Nhập lại mật khẩu',
        en: 'Confirm password',
      }),
      rules: [
        { required: true, message: t('validateMsg.requireEnterRePassword') },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            const password: string = getFieldValue('password');
            if (password !== value) {
              return Promise.reject(t('validateMsg.compareRePassword'));
            }
            return Promise.resolve();
          },
        }),
      ],
      componentProps: {
        placeholder: t('enterRePassword'),
        autoComplete: false,
        className:
          'fina-form__input-control fina-form__input-control--password',
        modernLabel: true,
      },
    }),
  ];
};
