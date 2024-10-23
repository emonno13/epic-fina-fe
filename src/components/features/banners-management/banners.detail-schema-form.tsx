import { HDatePicker } from '@components/shared/common-form-elements/date-picker';
import { HUploadImage } from '@components/shared/common-form-elements/h-upload';
import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { ValidationMessages } from '@lib/validation-message';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';
import { SCREEN_OPTIONS } from './constants';

export const BannerPrioritySchemaItem = (props: HFormProps) => {
  const { t } = useHTranslation('admin-common');
  return createSchemaItem({
    Component: Input,
    name: 'priority',
    label: t('Priority', { vn: 'Độ ưu tiên' }),
    rules: [
      {
        pattern: /^[0-9]*$/,
        message: t('Must be number!', { vn: 'Phải là một số!' }),
      },
    ],
    normalize: (value) => {
      if (/^[0-9]*$/.test(value)) return Number(value);
      return value;
    },
    componentProps: {
      placeholder: 'Enter priority',
      style: { width: 150 },
    },
  });
};

export const BannersDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 24 },
      label: t('Name', { vn: 'Tên' }),
      rules: [{ required: true, message: 'Name is required' }],
      componentProps: {
        placeholder: 'Enter the name',
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'screens',
      colProps: { span: 24 },
      label: t('Show in screens', { vn: 'Hiển thị' }),
      componentProps: {
        options: SCREEN_OPTIONS,
        mode: 'multiple',
      },
    }),
    createSchemaItem({
      Component: Input,
      label: t('Link'),
      colProps: { span: 24 },
      name: 'link',
      rules: [
        { required: true, message: ValidationMessages.requiredMessage('Link') },
        { type: 'url', message: ValidationMessages.linkWrongFormat },
      ],
      componentProps: {
        placeholder: 'Enter the link',
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      label: t('Apply from', { vn: 'Áp dụng từ' }),
      name: 'applyFrom',
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Apply from'),
        },
      ],
      componentProps: {
        placeholder: t('Enter apply from', { vn: 'Áp dụng từ' }),
        format: 'DD/MM/YYYY',
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: 'applyTo',
      label: t('Apply to', { vn: 'Áp dụng đến' }),
      componentProps: {
        placeholder: 'Enter apply to',
        format: 'DD/MM/YYYY',
      },
    }),
    BannerPrioritySchemaItem(props),
    createSchemaItem({
      Component: HUploadImage,
      name: 'desktopImage',
      colProps: { span: 4 },
      label: t('Desktop image', { vn: 'Ảnh desktop' }),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Desktop image'),
        },
      ],
      componentProps: {
        useImageCrop: false,
      },
    }),
    createSchemaItem({
      Component: HUploadImage,
      name: 'mobileImage',
      label: t('Mobile image', { vn: 'Ảnh mobile' }),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Mobile image'),
        },
      ],
      colProps: { span: 24 },
      componentProps: {
        useImageCrop: false,
      },
    }),
  ];
};
