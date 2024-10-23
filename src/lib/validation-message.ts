import { useHTranslation } from './i18n';

export const ValidationMessages = {
  linkWrongFormat: 'Link format is not correct',
  emailWrongFormat: 'Email format is not correct',
  requiredMessage: (field) => `${field} is required`,
  useRequiredMessage: () => {
    const { t } = useHTranslation('admin-common');
    return (field: string) => {
      return `${field} ${t('isRequired')}`;
    };
  },
};

export const placeholderMessage = (field, t) => `${t('enter')} ${field.toLowerCase()}`;
