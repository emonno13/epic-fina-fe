import { useCheckBoxTermsAndPrivacyFormItem } from '@components/shared/common-form-elements/check-box-terms-and-privacy';
import { HInput } from '@components/shared/common-form-elements/h-input';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem } from '@schema-form/h-types';
import { ChangePasswordFormSchema } from '../../forgot-password/change-password-form/change-password-form-schema';
import { ReferralSchema } from '../phone-form/phone-form-schema';

export const PersonalInfoFormSchema = () => {
  const { t } = useHTranslation('admin-common');
  const checkboxTermAndPrivacyFormItem = useCheckBoxTermsAndPrivacyFormItem();

  return [
    createSchemaItem({
      Component: HInput,
      colProps: { span: 24 },
      name: 'fullName',
      rowProps: {
        gutter: [
          { xs: 8, md: 16 },
          { xs: 8, md: 16 },
        ],
      },
      rules: [
        {
          required: true,
          message: t('Please enter your name', {
            vn: 'Vui lòng nhập họ và tên',
          }),
        },
      ],
      className: 'capitalize',
      label: t('Họ và tên', { vn: 'Họ và tên', en: 'Full name' }),
      componentProps: {
        placeholder: t('Nguyễn Văn Anh'),
        className: 'fina-form__input-control',
        autoComplete: false,
        modernLabel: true,
      },
    }),
    ...ChangePasswordFormSchema(),
    ...ReferralSchema(),
    checkboxTermAndPrivacyFormItem({
      rules: [
        () => ({
          validator(_, value) {
            if (!value) {
              return Promise.reject(
                t('Please agree with the term of use and privacy policy', {
                  vn: 'Vui lòng đồng ý với các điều khoản cá nhân và chính sách bảo mật',
                }),
              );
            }

            return Promise.resolve();
          },
        }),
      ],
    }),
  ];
};
