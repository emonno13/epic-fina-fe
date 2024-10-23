import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem, HFormItemProps } from '@schema-form/h-types';
import { ORGANIZATION_TYPES } from '@types/organization';
import { DatePicker } from 'antd';
import { TFunction } from 'react-i18next';
import { LOAN_STATUS, LOAN_STATUSES_LABEL_MAPPING } from '../utils';

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
      label: t('Ngân hàng', { vn: 'Ngân hàng', en: 'Bank' }),
      name: 'orgId',
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 12, md: 12 } },
      componentProps: {
        placeholder: t('Chọn ngân hàng', { vn: 'Chọn ngân hàng' }),
        showSearch: true,
        allowClear: true,
        searchWhenHidenValueChange: true,
        mode: 'single',
        endpoint: 'organizations/suggestion',
        fieldsValues: ['id', 'name'],
        hiddenValues: {
          type: ORGANIZATION_TYPES.BANK,
          // toppedOrgId: orgPartner
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
      name: 'status',
      rowProps: { gutter: { xs: 8, md: 16 } },
      colProps: { span: 24 },
      componentProps: {
        placeholder: t('Chọn trạng thái', { vn: 'Chọn trạng thái' }),
        optionType: 'button',
        buttonStyle: 'solid',
        options: [
          {
            label: t(LOAN_STATUSES_LABEL_MAPPING[LOAN_STATUS.PENDING]),
            value: LOAN_STATUS.PENDING,
          },
          {
            label: t(LOAN_STATUSES_LABEL_MAPPING[LOAN_STATUS.APPROVED]),
            value: LOAN_STATUS.APPROVED,
          },
          {
            label: t(LOAN_STATUSES_LABEL_MAPPING[LOAN_STATUS.ACTIVE]),
            value: LOAN_STATUS.ACTIVE,
          },
          {
            label: t(LOAN_STATUSES_LABEL_MAPPING[LOAN_STATUS.HIDDEN]),
            value: LOAN_STATUS.HIDDEN,
          },
          {
            label: t(LOAN_STATUSES_LABEL_MAPPING[LOAN_STATUS.REFUSE_APPROVAL]),
            value: LOAN_STATUS.REFUSE_APPROVAL,
          },
        ],
      },
    }),
    createSchemaItem({
      Component: RangePicker,
      label: t('Creation time', { vn: 'Thời gian tạo' }),
      name: 'createdAt',
    }),
  ];
};
