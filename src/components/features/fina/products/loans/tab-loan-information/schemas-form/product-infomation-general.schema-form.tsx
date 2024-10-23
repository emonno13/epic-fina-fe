import { Input } from 'antd';
import { useHTranslation } from '../../../../../../../lib/i18n';
import { ValidationMessages } from '../../../../../../../lib/validation-message';
import { useIsNewDocument } from '../../../../../../../schema-form/features/hooks/document-detail-hooks';
import { createSchemaItem, HFormItemProps, HFormProps } from '../../../../../../../schema-form/h-types';
import { PRODUCT_TYPES } from '../../../../../../../types/organization';
import { HSlug } from '../../../../../../shared/common-form-elements/h-slug';
import { HSelect } from '../../../../../../shared/common-form-elements/select';
import { setFormSlugValue } from '../../../../../../shared/common-form-elements/utils';
import { createSchemaLabelItem } from '../../../../../../shared/common/h-label/h-label-title';
import { HRadioGroup } from '../../../../../../shared/common/h-radio-group';
import { LOAN_STATUSES_OPTIONS } from '../../../utils';

export const ProductInfoGeneralSchemaForm = (props: HFormProps, handleTypeCate): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const isNewDocument = useIsNewDocument();
  const { form } = props;
  const onNameChange = (e) => {
    const value = e?.target?.value;
    if (isNewDocument) {
      setFormSlugValue(value, form);
    }
  };
  return ([
    createSchemaLabelItem({
      componentProps: {
        label: t('Product information'),
        titleTooltip: t('Product information'),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Product category', {
        en: 'Product category',
        vn: 'Danh mục sản phẩm',
      }),
      colProps: { xs: 24, sm: 24, md: 12 },
      name: 'categoryId',
      rules: [{
        required: true,
        message: t('Product category is required'),
      }],
      componentProps: {
        placeholder: t('Enter the product category'),
        endpoint: 'categories/suggestion',
        hiddenValues: { type: PRODUCT_TYPES.loan },
        optionsConverter: (document) => {
          document.label = `${document?.name} - ${document.code}`;
          return document;
        },
        onChangeSelected: handleTypeCate,
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'code',
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Product code', {
        en: 'Product code',
        vn: 'Mã sản phẩm',
      }),
      rendering: !isNewDocument,
      rules: [
        { required: true, message: ValidationMessages.requiredMessage('Loan product code') },
      ],
      componentProps: {
        disabled: true,
        placeholder: t('Enter the product code'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { xs: 24, sm: 24, md: isNewDocument ? 24 : 12 },
      label: t('Product name', {
        en: 'Product name',
        vn: 'Tên sản phẩm',
      }),
      rules: [
        { required: true, message: ValidationMessages.requiredMessage('Loan name') },
      ],
      componentProps: {
        placeholder: t('Enter the product name'),
        onChange: onNameChange,
      },
    }),
    createSchemaItem({
      Component: HSlug,
      name: 'slug',
      colProps: { span: 24 },
      label: t('Slug'),
      rules: [{ required: true, message: ValidationMessages.requiredMessage('Slug') }],
      componentProps: {
        placeholder: t('Enter slug'),
      },
    }),
    // createOrganizationSuggestionElement(
    // 	{
    // 		name: 'orgId',
    // 		label: t('Organizations', {
    // 			en: 'Organization',
    // 			vn: 'Tổ chức',
    // 		}),
    // 		colProps: {xs: 24, sm: 24, md: 12},
    // 		rowProps: {gutter: {xs: 24, md: 24}},
    // 		rules: [
    // 			{required: true, message: ValidationMessages.requiredMessage(t('Organizations'))},
    // 		],
    // 		componentProps: {
    // 			searchWhenHidenValueChange: true,
    // 		},
    // 	}),

    createSchemaItem({
      Component: Input.TextArea,
      name: 'description',
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Description'),
      componentProps: {
        rows: 4,
        placeholder: t('Description'),
      },
    }),
    createSchemaItem({
      Component: HRadioGroup,
      label: t('Status'),
      name: 'status',
      colProps: { span: 24 },
      componentProps: {
        optionType: 'button',
        options: LOAN_STATUSES_OPTIONS.map((item) => ({
          label: t(item.label),
          value: item.value,
        })),
        size: 'large',
        buttonStyle: 'solid',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'conditions',
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Conditions apply'),
      componentProps: {
        placeholder: t('Conditions apply'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'outstandingAdvantages',
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Outstanding advantage'),
      componentProps: {
        placeholder: t('Outstanding advantage'),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'advantages',
      label: t('Advantages'),
      rowProps: { gutter: { xs: 24, md: 24 } },
      componentProps: {
        rows: 4,
        placeholder: t('Advantages'),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'disadvantages',
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Disadvantages'),
      componentProps: {
        rows: 4,
        placeholder: t('Disadvantages'),
      },
    }),
  ]);
};
