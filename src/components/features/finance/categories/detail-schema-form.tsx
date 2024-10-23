import { HSlug } from '@components/shared/common-form-elements/h-slug';
import { setFormSlugValue } from '@components/shared/common-form-elements/utils';
import { useHTranslation } from '@lib/i18n';
import { ValidationMessages } from '@lib/validation-message';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input, Switch } from 'antd';
import { useIsNewDocument } from '../../../../schema-form/features/hooks/document-detail-hooks';
import {
  getProductTypeOptions,
  getSubCategoryProductLoan,
  PRODUCT_TYPES,
} from '../../../../types/organization';
import { HUploadImage } from '../../../shared/common-form-elements/h-upload';
import { HSelect } from '../../../shared/common-form-elements/select';

export const CategoryDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const { hiddenValues, form } = props;
  const isNewDocument = useIsNewDocument();
  const type = hiddenValues?.type;
  const schema: any[] = [];
  const onNameChange = (e) => {
    const value = e?.target?.value;
    if (isNewDocument) {
      setFormSlugValue(value, form);
    }
  };
  if (!type) {
    schema.push(
      createSchemaItem({
        Component: HSelect,
        label: t('Type'),
        colProps: { span: 24 },
        name: 'type',
        rules: [
          {
            message: t('Type is required'),
          },
        ],
        componentProps: {
          placeholder: t('Type a group'),
          options: getProductTypeOptions(t),
        },
      }),
    );
  }
  return [
    ...schema,
    createSchemaItem({
      Component: Input,
      name: 'code',
      colProps: { span: 4 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: t('Code'),
      rendering: !isNewDocument,
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage(t('Code')),
        },
      ],
      componentProps: {
        disabled: true,
        placeholder: t('Enter the code'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: isNewDocument ? 24 : 20 },
      label: t('Category name'),
      rules: [
        {
          required: true,
          message: t('Category name is required', {
            vn: 'Vui lòng nhập tên danh mục',
          }),
          whitespace: true,
        },
      ],
      componentProps: {
        placeholder: t('Enter the category name'),
        onChange: onNameChange,
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Product category'),
      rowProps: { gutter: { xs: 8, md: 16 } },
      colProps: { span: 24 },
      name: 'productCategory',
      rendering: type !== PRODUCT_TYPES.news,
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage(t('Product category')),
        },
      ],
      componentProps: {
        placeholder: t('Product category a group'),
        options: getSubCategoryProductLoan(t),
      },
    }),
    createSchemaItem({
      Component: HSlug,
      name: 'slug',
      colProps: { span: 24 },
      label: t('Slug'),
      componentProps: {
        placeholder: t('slug-of-category'),
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: 'isOutstanding',
      colProps: { span: 24 },
      label: t('Outstanding Category', { vn: 'Danh mục nổi bật' }),
      rendering: type !== PRODUCT_TYPES.news,
      valuePropName: 'checked',
      initialValue: false,
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'shortDesc',
      colProps: { span: 24 },
      label: t('Short description'),
      componentProps: {
        rows: 3,
        placeholder: t('Enter the short description'),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'description',
      colProps: { span: 24 },
      label:
        type !== PRODUCT_TYPES.news
          ? t('Description')
          : t('detail Description', {
              vn: 'Mô tả chi tiết',
              en: 'detail Description',
            }),
      componentProps: {
        rows: 6,
        placeholder: t('Enter the description'),
      },
    }),
    createSchemaItem({
      Component: HUploadImage,
      name: 'icon',
      colProps: { span: 24 },
      label: t('Icon'),
    }),
  ];
};
