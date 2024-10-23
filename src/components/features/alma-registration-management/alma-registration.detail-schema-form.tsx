import { AlmaRegisterSchema } from '@layouts/admin/lightly/client-alma/form-schemas';
import { useHTranslation } from '@lib/i18n';
import { HFormItemProps, HFormProps } from '@schema-form/h-types';

export const AlmaRegistrationDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return [...AlmaRegisterSchema(props).slice(0, 3)];
};
