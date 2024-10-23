import { Checkbox } from 'antd';
import { createSchemaItem, HFormItemProps, HFormProps } from '../../../../../schema-form/h-types';
import { useHTranslation } from '../../../../../lib/i18n';
import { ValidationMessages } from '../../../../../lib/validation-message';
import { HUploadImages } from '../../../../shared/common-form-elements/h-upload';

export const UploadCardSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return ([
    createSchemaItem({
      Component: Checkbox,
      name: 'confirmInformation',
      ignore: true,
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Xác nhân thông tin'),
          type: 'boolean',
        }, ({ getFieldValue }) => ({
          validator(rule, value: boolean) {
            if (value) {
              return Promise.resolve();
            }
            return Promise.reject(t('Xác nhân thông tin'));
          },
        }),
      ],
      colProps: { span: 24 },
      valuePropName: 'checked',
      componentProps: {
        children: 'Tôi xác nhận thông tin trên là chính xác',
      },
    }),
  ]);
};

export const ContractSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return ([
    createSchemaItem({
      Component: HUploadImages,
      name: ['identification', 'signature'],
      hidden: true,
      rules: [
        { required: true, message: t('Bạn phải ký vào hợp đồng') },
      ],
    }),
  ]);
};