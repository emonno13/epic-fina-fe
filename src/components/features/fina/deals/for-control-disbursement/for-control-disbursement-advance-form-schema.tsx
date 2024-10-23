import { useHTranslation } from '@lib/i18n';
import { createSchemaItem, HFormItemProps } from '@schema-form/h-types';
import { HDatePicker } from '../../../../shared/common-form-elements/date-picker';
import { HSelect } from '../../../../shared/common-form-elements/select';
import { TRANSACTION_DETAIL_STATUS_OPTIONS } from '../../transaction/constant';

export const ForControlDisbursementAdvanceFormSchema = (
  props: any,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaItem({
      Component: HDatePicker,
      name: 'from',
      rowProps: { gutter: { xs: 8, md: 16 } },
      colProps: { span: 6 },
      label: t('Từ ngày'),
      componentProps: {
        style: { width: '100%' },
        showTime: true,
        format: 'DD/MM/YYYY',
        placeholder: t('Từ ngày'),
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: 'to',
      colProps: { span: 6 },
      label: t('Đến ngày'),
      componentProps: {
        style: { width: '100%' },
        showTime: true,
        format: 'DD/MM/YYYY',
        placeholder: t('Đến ngày'),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Status'),
      name: 'status',
      colProps: { span: 6 },
      componentProps: {
        placeholder: t('Search by status'),
        optionValues: TRANSACTION_DETAIL_STATUS_OPTIONS,
      },
    }),
  ];
};
