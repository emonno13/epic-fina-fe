import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { HSelect } from '../../../../shared/common-form-elements/select';
import { HRangePicker } from '../../../../shared/date-picker';
import { getOptionsStatusRequestAccessUser } from './constan';

export const AdvanceSearch = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: HRangePicker,
      name: 'createdAt',
      rowProps: { gutter: { xs: 8, md: 16 } },
      colProps: { span: 6 },
      componentProps: {
        style: { width: '100%' },
        placeholder: t('enter_training_date_range', {
          en: 'Enter Date Range',
          vn: 'Nhập Thời gian đào tạo',
        }),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      colProps: { span: 6 },
      name: 'status',
      componentProps: {
        placeholder: t('Status'),
        options: getOptionsStatusRequestAccessUser(t),
      },
    }),
  ];
};
