import {
  HInput,
  HTextArea,
} from '@components/shared/common-form-elements/h-input';
import { HRadioGroup } from '@components/shared/common/h-radio-group';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem } from '@schema-form/h-types';
import {
  MESSAGE_WORKFLOW_STATUS,
  MESSAGE_WORKFLOW_STATUS_OPTIONS,
} from '../../constant';

export const GeneralInfoSchema = () => {
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaItem({
      Component: HInput,
      colProps: { span: 16 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: t('Name'),
      rules: [
        {
          required: true,
          message: t('Name is required', { vn: 'Tên là bắt buộc' }),
        },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            const name = getFieldValue('name');
            if (!name.length || name.trim().length) {
              return Promise.resolve();
            }
            return Promise.reject(
              t('Name is not a space', { vn: 'Tên không thể là khoảng trắng' }),
            );
          },
        }),
      ],
      componentProps: {
        placeholder: t('Name'),
      },
      name: 'name',
    }),
    createSchemaItem({
      Component: HRadioGroup,
      colProps: { span: 4, offset: 2 },
      label: t('Status'),
      initialValue: MESSAGE_WORKFLOW_STATUS.ACTIVE,
      componentProps: {
        placeholder: t('Status'),
        optionType: 'button',
        buttonStyle: 'solid',
        options: MESSAGE_WORKFLOW_STATUS_OPTIONS,
      },
      name: 'status',
    }),
    createSchemaItem({
      Component: HTextArea,
      colProps: { span: 24 },
      label: t('Description', { en: 'Description', vn: 'Mô tả' }),
      name: 'description',
      componentProps: {
        rows: 6,
        placeholder: 'Enter description',
      },
    }),
  ];
};
