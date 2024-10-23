import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem, HFormItemProps } from '@schema-form/h-types';
import { PRODUCT_TYPES } from '@types/organization';
import { DatePicker } from 'antd';
import { TFunction } from 'react-i18next';

const { RangePicker } = DatePicker;

export const getStatusOptions = (t: TFunction) => [
  { label: t('Active', { vn: 'Hoạt động' }), value: true },
  { label: t('Inactive', { vn: 'Không hoạt động' }), value: false },
];

export const AdvanceSearch = (props): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaItem({
      Component: HSelect,
      label: t('Danh mục', { vn: 'Danh mục', en: 'Category' }),
      name: 'categoryId',
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 12, md: 12 } },
      componentProps: {
        placeholder: t('Chọn danh mục', { vn: 'Chọn danh mục' }),
        showSearch: true,
        allowClear: true,
        searchWhenHidenValueChange: true,
        endpoint: 'categories/suggestion',
        fieldsValues: ['id', 'name', 'slug'],
        hiddenValues: {
          type: PRODUCT_TYPES.news,
        },
        optionFilterProp: 'children',
        optionsConverter: (document) => {
          document.label = `${document?.name || ''}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Status'),
      name: 'isActive',
      rowProps: { gutter: { xs: 8, md: 16 } },
      colProps: { span: 24 },
      componentProps: {
        placeholder: t('Chọn trạng thái', { vn: 'Chọn trạng thái' }),
        optionType: 'button',
        buttonStyle: 'solid',
        options: getStatusOptions(t),
      },
    }),
    createSchemaItem({
      Component: RangePicker,
      label: t('Creation time', { vn: 'Thời gian tạo' }),
      name: 'createdAt',
    }),
  ];
};
