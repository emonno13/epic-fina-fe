import { HUploadImages } from '@components/shared/common-form-elements/h-upload';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem } from '@schema-form/h-types';

export const ContractSchemaForm = () => {
  const { t } = useHTranslation('common');
  return [
    createSchemaItem({
      Component: HUploadImages,
      name: ['identification', 'signature'],
      hidden: true,
      rules: [{ required: true, message: t('Bạn phải ký vào hợp đồng') }],
    }),
  ];
};
