import { GROUP_TYPE } from '@components/features/organizations/groups/common';
import { GroupDetailSchemaFormShort } from '@components/features/organizations/groups/detail-schema-form';
import { CALCULATION_QUESTION_GROUP_CODE } from '@components/shared/questions/question/types';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem, HFormItemProps } from '@schema-form/h-types';
import { ConverterUtils } from '../../../../lib/converter';
import { getPositionGroupByOrgType } from '../../../../types/organization';
import { NewsCategoryDetailSchemaForm } from '../../../features/cms/categories/detail-schema-form';
import { PositionDetailSchemaFormShort } from '../../../features/organizations/positions/detail-schema-form';
import { CONFIGURATION_CODES } from '../../common/configuration/constant';
import { ConfigurationSchemaFormUtils } from '../../common/configuration/schema-form-utils';
import { HSelect } from './index';

export const SelectUtils = {
  createOrganizationSuggestionElement: (
    item?: HFormItemProps,
    hiddenValues: any = {},
  ) => {
    const { t } = useHTranslation('admin-common');
    const componentProps = item?.componentProps || {};
    return createSchemaItem({
      Component: HSelect,
      name: item?.name || 'orgId',
      label:
        item?.label !== false
          ? item?.label || t('Organization', { vn: 'Tổ chức' })
          : '',
      relation: item?.relation,
      rules: item?.rules,
      rowProps: item?.rowProps,
      isNewRow: item?.isNewRow,
      colProps: item?.colProps,
      initialValue: item?.initialValue,
      componentProps: {
        showSearch: true,
        allowClear: true,
        endpoint: 'organizations/suggestion',
        hiddenValues,
        placeholder:
          componentProps.placeholder ||
          t('Select an organization', { vn: 'Chọn tổ chức' }),
        optionFilterProp: 'children',
        ...componentProps,
      },
    });
  },
  createProductModelSuggestionElement: (item?: HFormItemProps) => {
    const { t } = useHTranslation('admin-common');
    const componentProps = item?.componentProps || {};
    return createSchemaItem({
      Component: HSelect,
      name: item?.name || 'productModelId',
      label: item?.label || 'Model',
      rules: item?.rules,
      rowProps: item?.rowProps,
      isNewRow: item?.isNewRow,
      colProps: item?.colProps,
      componentProps: {
        showSearch: true,
        allowClear: true,
        endpoint: 'product-models/suggestion',
        placeholder:
          componentProps.placeholder ||
          t('Select a Product Model', { vn: 'Chọn một sản phẩm' }),
        optionFilterProp: 'children',
        ...componentProps,
      },
    });
  },
  createProjectSuggestionElement: (item?: HFormItemProps) => {
    const { t } = useHTranslation('admin-common');
    const componentProps = item?.componentProps || {};
    return createSchemaItem({
      Component: HSelect,
      name: item?.name || 'projectId',
      label: item?.label || t('Project'),
      rules: item?.rules,
      rowProps: item?.rowProps,
      isNewRow: item?.isNewRow,
      colProps: item?.colProps,
      componentProps: {
        showSearch: true,
        allowClear: true,
        endpoint: 'projects/suggestion',
        placeholder:
          componentProps.placeholder ||
          t('Select a project', { vn: 'Lựa chọn dư án' }),
        optionFilterProp: 'children',
        ...componentProps,
      },
    });
  },
  createCategorySuggestionElement: (item?: HFormItemProps) => {
    const { t } = useHTranslation('admin-common');
    const componentProps = item?.componentProps || {};
    return createSchemaItem({
      Component: HSelect,
      name: item?.name || 'categoryId',
      label: item?.label || t('Category', { vn: 'Danh mục' }),
      rules: item?.rules,
      rowProps: item?.rowProps,
      colProps: item?.colProps,
      componentProps: {
        modernLabel: item?.modernLabel || false,
        showSearch: true,
        allowClear: true,
        endpoint: 'categories/suggestion',
        placeholder:
          componentProps.placeholder ||
          t('Select a category', { vn: 'Chọn danh mục' }),
        optionFilterProp: 'children',
        ...componentProps,
      },
    });
  },
  createDocumentTemplateSuggestionElement: (item?: HFormItemProps) => {
    const { t } = useHTranslation('admin-common');
    const componentProps = item?.componentProps || {};
    return createSchemaItem({
      Component: HSelect,
      name: item?.name || 'documentTemplateId',
      label: item?.label || t('Document Template', { vn: 'Mẫu tài liệu' }),
      rules: item?.rules,
      rowProps: item?.rowProps,
      colProps: item?.colProps,
      componentProps: {
        showSearch: true,
        allowClear: true,
        endpoint: 'document-templates/suggestion',
        placeholder:
          componentProps.placeholder ||
          t('Select a Template', { vn: 'Lựa chọn mẫu tài liẹu' }),
        optionFilterProp: 'children',
        ...componentProps,
      },
    });
  },
  createPermissionsSelectionElement: (item?: HFormItemProps) => {
    const { t } = useHTranslation('admin-common');
    const componentProps = item?.componentProps || {};
    return createSchemaItem({
      Component: HSelect,
      name: item?.name || 'permissions',
      label: item?.label || t('Permissions', { vn: 'Quyền' }),
      rules: item?.rules,
      rowProps: item?.rowProps,
      colProps: item?.colProps,
      componentProps: {
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
        // endpoint: 'permissions/suggestion',
        placeholder:
          componentProps.placeholder ||
          t('Select permissions', { vn: 'Chọn quyền' }),
        optionFilterProp: 'children',
        ...componentProps,
      },
    });
  },
  createRoleSelectionElement: (item?: HFormItemProps) => {
    const { t } = useHTranslation('admin-common');
    const componentProps = item?.componentProps || {};
    return createSchemaItem({
      Component: HSelect,
      name: item?.name || 'roleIds',
      label: item?.label || t('Roles'),
      rules: item?.rules,
      rowProps: item?.rowProps,
      colProps: item?.colProps,
      componentProps: {
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
        endpoint: 'roles/suggestion',
        placeholder:
          componentProps.placeholder ||
          t('Select Roles', { vn: 'Chọn một nhóm quyền' }),
        optionFilterProp: 'children',
        ...componentProps,
      },
    });
  },
  createUserSelectionElement: (item?: HFormItemProps) => {
    const { t } = useHTranslation('admin-common');
    const componentProps = item?.componentProps || {};
    return createSchemaItem({
      Component: HSelect,
      name: item?.name || 'userIds',
      label: item?.label !== false ? item?.label || 'Users' : '',
      relation: item?.relation,
      rules: item?.rules,
      rowProps: item?.rowProps,
      colProps: item?.colProps,
      componentProps: {
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
        endpoint: 'users/suggestion',
        placeholder:
          componentProps.placeholder ||
          t('Select user', { vn: 'Chọn người dùng' }),
        optionFilterProp: 'children',
        optionsConverter: (document: any) => {
          document.label = ConverterUtils.getFullNameUser(document);
          return document;
        },
        ...componentProps,
      },
    });
  },
  createPositionSelection: (orgType: string, item?: HFormItemProps) => {
    const { t } = useHTranslation('admin-common');
    const componentProps = item?.componentProps || {};
    const group = getPositionGroupByOrgType(orgType);
    return createSchemaItem({
      Component: HSelect,
      name: item?.name || 'positions',
      label: item?.label || t('Positions', { vn: 'Vị trí' }),
      rules: item?.rules,
      rowProps: item?.rowProps,
      colProps: item?.colProps,
      initialValue: item?.initialValue,
      componentProps: {
        showSearch: true,
        allowClear: true,
        endpoint: 'positions/suggestion',
        placeholder: componentProps.placeholder || 'Select position',
        optionFilterProp: 'children',
        hiddenValues: { ...(componentProps.hiddenValues || {}), group },
        newItemOption: {
          formProps: {
            schema: PositionDetailSchemaFormShort,
            nodeName: 'positions',
            hiddenValues: { group },
          },
          label: 'ABC',
        },
        ...componentProps,
      },
    });
  },
  createConfigurationSelectionElement: (
    item?: HFormItemProps,
    options?: {
      codeSearch?: any | string;
      codeCreate?: string;
      label?: string;
      schemaNewItems?: HFormItemProps[] | any;
    },
  ) => {
    const { t } = useHTranslation('admin-common');
    const codeSearch = options?.codeSearch || CONFIGURATION_CODES.PAYMENT_TERM;
    const codeCreate = options?.codeCreate || CONFIGURATION_CODES.PAYMENT_TERM;
    const label = options?.label || 'Create other configuration';
    const schemaNewItems =
      options?.schemaNewItems ||
      ConfigurationSchemaFormUtils.createConfigurationDetailSchema(
        'Name',
        'Value',
      );

    const componentProps = item?.componentProps || {};
    return createSchemaItem({
      Component: HSelect,
      name: item?.name || 'configurationId',
      label: item?.label || t('Configuration'),
      rules: item?.rules,
      rowProps: item?.rowProps,
      colProps: item?.colProps,
      componentProps: {
        showSearch: true,
        allowClear: true,
        endpoint: 'configurations/suggestion',
        placeholder: componentProps.placeholder || 'Select configuration',
        optionFilterProp: 'children',
        hiddenValues: {
          ...(componentProps.hiddenValues || {}),
          code: codeSearch,
        },
        newItemOption: {
          formProps: {
            schema: schemaNewItems,
            nodeName: 'configurations',
            hiddenValues: { code: codeCreate },
          },
          label,
        },
        ...componentProps,
      },
    });
  },
  createLocationSelectionElement: (item?: HFormItemProps) => {
    const { t } = useHTranslation('admin-common');
    const componentProps = item?.componentProps || {};
    return createSchemaItem({
      Component: HSelect,
      name: item?.name || 'location',
      label: item?.label || t('Location'),
      rules: item?.rules,
      rowProps: item?.rowProps,
      colProps: item?.colProps,
      componentProps: {
        showSearch: true,
        allowClear: true,
        endpoint: 'locations/suggestion',
        placeholder:
          componentProps.placeholder ||
          t('Select a location', { vn: 'Lựa chọn vị trí' }),
        optionFilterProp: 'children',
        ...componentProps,
      },
    });
  },
  createGroupSelection: (
    item?: HFormItemProps,
    type: string = GROUP_TYPE.ORGANIZATION,
  ) => {
    const { t } = useHTranslation('admin-common');
    const componentProps = item?.componentProps || {};
    return createSchemaItem({
      Component: HSelect,
      name: item?.name || 'groupIds',
      label: item?.label || t('Group'),
      rules: item?.rules,
      rowProps: item?.rowProps,
      colProps: item?.colProps,
      componentProps: {
        showSearch: true,
        allowClear: true,
        endpoint: 'groups/suggestion',
        placeholder:
          componentProps.placeholder ||
          t('Select group', { vn: 'Lựa chọn một nhóm' }),
        optionFilterProp: 'children',
        hiddenValues: { ...(componentProps.hiddenValues || {}), type },
        newItemOption: {
          formProps: {
            schema: GroupDetailSchemaFormShort,
            nodeName: 'groups',
            hiddenValues: { type },
          },
          label: t('Create a group', { vn: 'Tạo một nhóm' }),
        },
        ...componentProps,
      },
    });
  },

  createNewsCategorySelection: (item?: HFormItemProps, type?: string) => {
    const { t } = useHTranslation('admin-common');
    const componentProps = item?.componentProps || {};
    return createSchemaItem({
      Component: HSelect,
      name: item?.name || 'type',
      label: item?.label || t('Categories'),
      rules: item?.rules,
      rowProps: item?.rowProps,
      colProps: item?.colProps,
      componentProps: {
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
        endpoint: 'news-categories/suggestion',
        placeholder:
          componentProps.placeholder ||
          t('Select categories', { vn: 'Lựa chọn danh mục' }),
        optionFilterProp: 'children',
        hiddenValues: { ...(componentProps.hiddenValues || {}), type },
        newItemOption: {
          formProps: {
            schema: NewsCategoryDetailSchemaForm,
            nodeName: 'news-categories',
            hiddenValues: { type },
          },
          label: t('Create a category', { vn: 'Tạo mới danh muc' }),
        },
        ...componentProps,
      },
    });
  },
  createTemplateSuggestionElement: (
    item?: HFormItemProps,
    hiddenValues: any = {},
  ) => {
    const { t } = useHTranslation('admin-common');
    const componentProps = item?.componentProps || {};
    return createSchemaItem({
      Component: HSelect,
      name: item?.name || 'templateId',
      label: item?.label || t('Template'),
      rules: item?.rules,
      rowProps: item?.rowProps,
      isNewRow: item?.isNewRow,
      colProps: item?.colProps,
      componentProps: {
        showSearch: true,
        allowClear: true,
        endpoint: 'templates/suggestion',
        hiddenValues,
        placeholder:
          componentProps.placeholder ||
          t('Select an templates', { vn: 'Lựa chọn mẫu' }),
        optionFilterProp: 'children',
        ...componentProps,
      },
    });
  },
  createProductSuggestionElement: (item?: HFormItemProps) => {
    const { t } = useHTranslation('admin-common');
    const componentProps = item?.componentProps || {};
    return createSchemaItem({
      Component: HSelect,
      name: item?.name || 'productId',
      label: item?.label || t('Products'),
      rules: item?.rules,
      rowProps: item?.rowProps,
      colProps: item?.colProps,
      componentProps: {
        showSearch: true,
        allowClear: true,
        endpoint: 'products/suggestion',
        placeholder:
          componentProps.placeholder ||
          t('Select a Product', { vn: 'Chọn một sản phẩm' }),
        optionFilterProp: 'children',
        ...componentProps,
      },
    });
  },
  createCalculationQuestionGroupSuggestionElement: (item?: HFormItemProps) => {
    const { t } = useHTranslation('admin-common');
    const componentProps = item?.componentProps || {};
    return createSchemaItem({
      Component: HSelect,
      name: item?.name || 'pairingQuestionGroupIds',
      label:
        item?.label ||
        t('Calculation question groups', { vn: 'Câu hỏi tính toán' }),
      rules: item?.rules,
      rowProps: item?.rowProps,
      colProps: item?.colProps,
      componentProps: {
        showSearch: true,
        allowClear: true,
        endpoint: 'question-groups/suggestion',
        placeholder:
          componentProps.placeholder ||
          t('Select question groups', { vn: 'Chọn bộ câu hỏi tính toán' }),
        optionFilterProp: 'children',
        mode: 'multiple',
        hiddenValues: {
          code: {
            inq: Object.values(CALCULATION_QUESTION_GROUP_CODE),
          },
        },
        ...componentProps,
      },
    });
  },
};
