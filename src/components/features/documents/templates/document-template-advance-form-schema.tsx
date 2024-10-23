import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { getProductTypeOptions } from '../../../../types/organization';
import {
  createOrganizationSuggestionElement,
  HSelect,
} from '../../../shared/common-form-elements/select';
import { SelectUtils } from '../../../shared/common-form-elements/select/Utils';
import { DOCUMENT_TEMPLATE_STATUSES_OPTIONS } from './constants';

export const DocumentTemplateAdvanceFormSchema = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');

  return [
    createOrganizationSuggestionElement({
      label: t('Partner'),
      name: 'orgId',
      colProps: { span: 6 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      componentProps: {
        placeholder: t('Search by Partner'),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Product type', { vn: 'Loại sản phẩm' }),
      name: 'productType',
      colProps: { span: 6 },
      componentProps: {
        placeholder: t('Search by product type'),
        optionValues: getProductTypeOptions(t),
      },
    }),
    SelectUtils.createCategorySuggestionElement({
      label: t('Product category', { vn: 'Danh mục sản phẩm' }),
      name: 'categoryId',
      colProps: { span: 6 },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Status'),
      name: 'status',
      colProps: { span: 6 },
      componentProps: {
        placeholder: t('Search by status'),
        optionValues: DOCUMENT_TEMPLATE_STATUSES_OPTIONS(t),
      },
    }),
  ];
};
