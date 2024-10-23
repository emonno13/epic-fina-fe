import { ValidationMessages } from '@lib/validation-message';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';
import { useHTranslation } from '../../../../../lib/i18n';
import { HSelect } from '../../../../shared/common-form-elements/select';
import { VEHICLE_CATEGORY_TYPES } from './constant';

export const VehicleCategoryDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const type = props.hiddenValues?.type;
  const dynamicSchema: HFormItemProps[] = [];
  if (!type) {
    dynamicSchema.push(
      createSchemaItem({
        Component: HSelect,
        label: t('Type'),
        rowProps: { gutter: { xs: 8, md: 16 } },
        colProps: { span: 16 },
        name: 'type',
        componentProps: {
          placeholder: t('Select a type', { vn: 'Lựa chọn một kiểu' }),
          options: [
            { value: VEHICLE_CATEGORY_TYPES.MODEL, label: t('vehicle.model') },
          ],
        },
      }),
    );
  }
  return [
    ...dynamicSchema,
    createSchemaItem({
      Component: Input,
      name: 'code',
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: t('Code'),
      rules: [
        { required: true, message: ValidationMessages.requiredMessage('Code') },
      ],
      componentProps: {
        placeholder: t('Enter the Code', { vn: 'Nhập mã' }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: !type ? t('vehicle.model') : t('Type'),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage(t('vehicle.model')),
        },
      ],
      componentProps: {
        placeholder: !type
          ? t('Enter the model name', { vn: 'Nhập tên thương hiệu' })
          : t('Enter the type name', { vn: 'Nhập tên phân loại' }),
      },
    }),
  ];
};
