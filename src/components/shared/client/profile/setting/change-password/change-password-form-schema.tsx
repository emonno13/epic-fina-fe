import { HInput } from '@components/shared/common-form-elements/h-input';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem } from '@schema-form/h-types';

export const ChangePasswordFormSchema = () => {
  const { t } = useHTranslation('common');

  return [
    createSchemaItem({
      Component: HInput.Password,
      name: 'oldPassword',
      label: t('Mật khẩu', { vn: 'Mật khẩu cũ', en: 'Old Password' }),
      rules: [
        { required: true, message: t('validateMsg.requireEnterOldPassword') },
      ],
      componentProps: {
        placeholder: t('enterOldPassword'),
        autoComplete: false,
        className:
          'fina-form__input-control fina-form__input-control--password',
        modernLabel: true,
      },
    }),
    createSchemaItem({
      Component: HInput.Password,
      name: 'password',
      label: t('Mật khẩu', { vn: 'Mật khẩu mới ', en: 'New Password' }),
      rules: [
        { required: true, message: t('validateMsg.requireEnterNewPassword') },
        {
          pattern:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d@!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
          message: 'Sai định dạng mật khẩu!',
        },
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
