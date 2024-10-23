import { HSelect } from '@components/shared/common-form-elements/select';
import { ROOT_TASK_OPTIONS } from '@constants/crm/task';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem, HFormItemProps } from '@schema-form/h-types';
import { USER_TYPES } from '@types/organization';
import { DatePicker } from 'antd';
import { PRODUCT_TYPES } from './constans';

const { RangePicker } = DatePicker;

export const AdvanceSearchTaskSchema = (): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: HSelect,
      name: 'rootTask',
      label: t('Source', { vn: 'Nguồn' }),
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      componentProps: {
        placeholder: t('Source'),
        options: ROOT_TASK_OPTIONS,
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Staff'),
      name: 'assigneeId',
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      componentProps: {
        placeholder: t('Staff'),
        hiddenValues: { type: USER_TYPES.staff },
        showSearch: true,
        allowClear: true,
        endpoint: 'users/suggestion',
        mode: 'single',
        optionsConverter: (document) => {
          document.label = `${ConverterUtils.getFullNameUser(document)} - ${document?.emails?.[0]?.email || ''}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Classify', { vn: 'Phân loại' }),
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      name: 'productType',
      componentProps: {
        placeholder: t('Please enter classify', { vn: 'Phân loại' }),
        options: PRODUCT_TYPES(t),
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
