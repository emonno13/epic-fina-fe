import { HInput } from '@components/shared/common-form-elements/h-input';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem } from '@schema-form/h-types';

export const RecoverPasswordFormSchema = () => {
  const { t } = useHTranslation('common');

  return [
    createSchemaItem({
      Component: HInput,
      name: 'telOrEmail',
      label: t('Email', { vn: 'Email' }),
      rules: [
        {
          required: true,
          message: t('Please enter Email', { vn: 'Vui lòng nhập email' }),
        },
      ],
      componentProps: {
        placeholder: t('Email', { vn: 'Email' }),
        autoComplete: false,
        modernLabel: true,
      },
    }),
  ];
};
