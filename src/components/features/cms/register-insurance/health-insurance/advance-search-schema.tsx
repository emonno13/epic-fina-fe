import { SelectUtils } from '@components/shared/common-form-elements/select/Utils';
import { createSchemaItem, HFormItemProps } from '@schema-form/h-types';
import { DatePicker } from 'antd';
import { useHTranslation } from 'lib/i18n';

const { RangePicker } = DatePicker;

export const AdvanceSearchSchema = (): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');

  return [
    SelectUtils.createOrganizationSuggestionElement({
      label: t('Organizations', { vn: 'Tổ chức' }),
      name: 'orgId',
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      componentProps: {
        placeholder: t('Choose organizations', { vn: 'Chọn tổ chức' }),
        mode: 'single',
        endpoint: 'organizations/suggestion',
        optionsConverter: (document) => {
          document.label = `${document?.name || ''}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: RangePicker,
      label: t('Creation time', { vn: 'Thời gian tạo' }),
      name: 'createdAt',
    }),
    createSchemaItem({
      Component: RangePicker,
      label: t('Updation time', { vn: 'Thời gian cập nhật' }),
      name: 'updatedAt',
    }),
  ];
};
