import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { PRODUCT_TYPES } from '../../../../types/organization';
import { HSelect } from '../../../shared/common-form-elements/select';
import { getOptionPropertiesType, getOptionStatus } from './contansr';

export const PropertiesAdvanceSearch = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: HSelect,
      label: t('Type of property', { vn: 'Loại hình bất động sản' }),
      name: 'type',
      colProps: { span: 6 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      componentProps: {
        placeholder: t('Type of property', { vn: 'Loại hình bất động sản' }),
        options: getOptionPropertiesType(t),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Product category'),
      colProps: { span: 6 },
      name: 'categoryId',
      componentProps: {
        endpoint: 'categories/suggestion',
        hiddenValues: { type: PRODUCT_TYPES.real_estate },
        placeholder: t('Enter the product category', {
          vn: 'Nhập vào danh mục sản phẩm',
        }),
        optionsConverter: (document) => {
          document.label = `${document?.name} - ${document.code}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Status'),
      colProps: { span: 6 },
      name: 'status',
      componentProps: {
        placeholder: t('Status'),
        options: getOptionStatus(t),
      },
    }),
  ];
};
