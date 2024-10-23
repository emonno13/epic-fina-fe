import { HInputNumber } from '@components/shared/common-form-elements/h-input';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem, HFormProps } from '@schema-form/h-types';

export const PreferentialReviewDetailSchema = (props: HFormProps) => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: HInputNumber,
      colProps: { span: 8 },
      rowProps: { gutter: { xs: 8, md: 8 } },
      label: t('month', { en: 'Month', vn: 'Tháng' }),
      name: 'month',
      componentProps: {
        modernLabel: true,
      },
    }),
    createSchemaItem({
      Component: HInputNumber,
      colProps: { span: 8 },
      label: t('year', { en: 'Year', vn: 'Năm' }),
      name: 'year',
      componentProps: {
        modernLabel: true,
      },
    }),
  ];
};
