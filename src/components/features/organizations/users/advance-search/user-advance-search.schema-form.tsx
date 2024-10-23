import { createSchemaItem, HFormItemProps, HFormProps } from '../../../../../schema-form/h-types';
import { useHTranslation } from '../../../../../lib/i18n';
import { HSelect } from '../../../../shared/common-form-elements/select';
import { SelectUtils } from '../../../../shared/common-form-elements/select/Utils';
import { getUserTypeOptions, USER_TYPES } from '../../../../../types/organization';
import { SEARCH_MODES } from '../../../../../schema-form/features/search-form/schema';
import { ConverterUtils } from '../../../../../lib/converter';

export const UserAdvanceSearch = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return ([
    SelectUtils.createOrganizationSuggestionElement({
      label: t('Organization', { vn: 'Tổ chức' }),
      name: 'orgId',
      colProps: { span: 6 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      componentProps: {
        placeholder: t('Organization', { vn: 'Tổ chức' }),
        endpoint: 'organizations/suggestion',
        optionsConverter: (document) => {
          document.label = `${document?.name || ''}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('User Type', { vn: 'Loại người dùng' }),
      colProps: { span: 6 },
      name: 'type',
      componentProps: {
        placeholder: t('Select a user type', { vn: 'Nhập vào loại người dùng' }),
        options: getUserTypeOptions(t),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Created By', { vn: 'Tạo bởi' }),
      name: 'createdById',
      colProps: { span: 6 },
      componentProps: {
        showSearch: true,
        placeholder: t('Created By', { vn: 'Tạo bởi' }),
        endpoint: 'users/suggestion',
        hiddenValues: { searchingRule: SEARCH_MODES.MULTIPLE, type: USER_TYPES.staff },
        optionsConverter: (document) => {
          document.label = `${ConverterUtils.getFullNameUser(document)} ${document?.code ? `- ${document?.code}` : ''}`;
          return document;
        },
      },
    }),
  ]);
};
