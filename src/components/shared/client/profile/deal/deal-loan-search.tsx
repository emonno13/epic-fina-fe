import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { createSchemaItem, HFormItemProps } from '@schema-form/h-types';
import { ORGANIZATION_TYPES, PRODUCT_TYPE } from 'types/organization';

export const AdvanceSearchSchema = (): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const currentUser = useCurrentUser();

  return [
    createSchemaItem({
      Component: HSelect,
      label: t('Product', { vn: 'Sản phẩm' }),
      name: 'orgId',
      colProps: { span: 12 },
      rowProps: { gutter: { xs: 16, md: 16 } },
      componentProps: {
        placeholder: t('Product', { vn: 'Sản phẩm' }),
        showSearch: true,
        allowClear: true,
        modernLabel: true,
        endpoint: 'products/suggestion',
        hiddenValues: {
          type: PRODUCT_TYPE.LOAN,
        },
        fieldsValues: ['id', 'name', 'slug'],
        optionFilterProp: 'children',
        optionsConverter: (document) => {
          document.label = `${document?.name} - ${document.code}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Organization', { vn: 'Tổ chức' }),
      name: 'orgId',
      colProps: { span: 12 },
      componentProps: {
        placeholder: t('Organization', { vn: 'Tổ chức' }),
        showSearch: true,
        allowClear: true,
        modernLabel: true,
        endpoint: 'organizations/suggestion',
        hiddenValues: {
          type: ORGANIZATION_TYPES.BANK,
          parentOrgId: currentUser?.rootOrgId,
        },
        fieldsValues: ['id', 'name'],
        optionFilterProp: 'children',
        optionsConverter: (document) => {
          document.label = `${document?.name} - ${document.code}`;
          return document;
        },
      },
    }),
  ];
};
