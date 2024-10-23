import { useHTranslation } from '@lib/i18n';
import { HInput } from '@components/shared/common-form-elements/h-input';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../schema-form/h-types';

export const LoginSchema = (props: HFormProps): HFormItemProps[] => {
  const { transport } = props;
  const { t } = useHTranslation('common');

  return [
    createSchemaItem({
      Component: HInput,
      name: 'username',
      rules: [
        {
          required: true,
          message: t('Please enter Email', { vn: 'Vui lòng nhập Email' }),
        },
      ],
      label: t('Email', { vn: 'Email' }),
      componentProps: {
        onFocus: transport?.onSearchInputFocused,
        placeholder: t('Enter Email', { vn: 'Vui lòng nhập Email' }),
        autoComplete: 'off',
        className: 'fina-form__input-control',
        modernLabel: true,
        size: 'large',
      },
    }),
    createSchemaItem({
      Component: HInput.Password,
      name: 'password',
      label: t('Password', { vn: 'Mật khẩu' }),
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
  ];
};
