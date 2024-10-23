import { Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { createSchemaItem, HFormItemProps, HFormProps } from '../../../../schema-form/h-types';

export const SignupUserSchema = (props: HFormProps): HFormItemProps[] => {
  const { transport } = props;
  const { t } = useTranslation('common');

  return [
    createSchemaItem({
      Component: Input,
      name: 'email',
      label: t('email_address'),
      componentProps: {
        onFocus: transport?.onSearchInputFocused,
        placeholder: 'your-email@example.com',
        autoComplete: 'false',
      },
    }),
    createSchemaItem({
      Component: Input.Password,
      name: 'password',
      label: t('your_password'),
      componentProps: {
        placeholder: 'xxxxxxxxx',
        autoComplete: 'false',
      },
    }),
    createSchemaItem({
      Component: Input.Password,
      name: 'rePassword',
      label:  t('re_your_password'),
      componentProps: {
        placeholder: 'xxxxxxxxx',
        autoComplete: 'false',
      },
    }),
  ];
};