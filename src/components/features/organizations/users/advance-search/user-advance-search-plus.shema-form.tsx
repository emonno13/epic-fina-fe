import { DatePicker } from 'antd';
import { ConverterUtils } from '../../../../../lib/converter';
import { useHTranslation } from '../../../../../lib/i18n';
import { SEARCH_MODES } from '../../../../../schema-form/features/search-form/schema';
import { createSchemaItem } from '../../../../../schema-form/h-types';
import { getUserTypeOptions, USER_TYPES } from '../../../../../types/organization';
import { HSelect } from '../../../../shared/common-form-elements/select';
import { SelectUtils } from '../../../../shared/common-form-elements/select/Utils';

const { RangePicker } = DatePicker;

export const UserAdvanceSearchPlus = () => {
  const { t } = useHTranslation('admin-common');
	
  return ([
    SelectUtils.createOrganizationSuggestionElement({
      label: t('Organization'),
      name: 'orgId',
      componentProps: {
        placeholder: t('Tổ chức', { vn: 'Tổ chức' }),
        endpoint: 'organizations/suggestion',
        optionsConverter: (document) => {
          document.label = `${document?.name || ''}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Customer', { vn: 'Người dùng' }),
      name: 'type',
      componentProps: {
        placeholder: t('Chọn loại người dùng', { vn: 'Chọn loại người dùng' }),
        options: getUserTypeOptions(t),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Created by', { vn: 'Người tạo' }),
      name: 'createdById',
      componentProps: {
        showSearch: true,
        placeholder: t('Chọn người tạo', { vn: 'Chọn người tạo' }),
        endpoint: 'users/suggestion',
        hiddenValues: { searchingRule: SEARCH_MODES.MULTIPLE, type: USER_TYPES.staff },
        optionsConverter: (document) => {
          document.label = `${ConverterUtils.getFullNameUser(document)} ${document?.code ? `- ${document?.code}` : ''}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Khách hàng tiềm năng', { vn: 'Khách hàng tiềm năng' }),
      name: 'isPotentialCustomers',
      componentProps: {
        options: [],
      },
    }),
    createSchemaItem({
      Component: RangePicker,
      label: t('Khoảng thời gian tạo', { vn: 'Khoảng thời gian tạo' }),
      name: 'createdAt',
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'positions',
      label: t('Position', { vn: 'Vị trí' }),
      componentProps: {
        showSearch: true,
        allowClear: true,
        endpoint: 'positions/suggestion',
        placeholder: t('Select position', { vn: 'Chọn vị trí' }),
        optionFilterProp: 'children',
        newItemOption: {
          formProps: {
            nodeName: 'positions',
          },
          label: t('Add position', { vn: 'Thêm vị trí' }),
        },
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'job',
      label: t('Job', { vn: 'Nghề nghiệp' }),
      componentProps: {
        showSearch: true,
        allowClear: true,
        placeholder: 'Chọn nghề nghiệp',
        optionFilterProp: 'children',
        options: [],
      },
    }),
    SelectUtils.createLocationSelectionElement({
      name: 'district',
      label: t('Area in charge', { vn: 'Khu vực phụ trách' }),
      componentProps: {
        showSearch: true,
        allowClear: true,
        placeholder: 'Chọn khu vực phụ trách',
        hiddenValues: {
          type: 'town_district',
        },
        searchWhenHidenValueChange: true,
      },
    }),
  ]);
};
