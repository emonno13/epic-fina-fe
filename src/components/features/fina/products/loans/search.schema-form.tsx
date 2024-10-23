import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { useSearchForm } from '../../../../../schema-form/features/hooks';
import { HRadioGroup } from '../../../../shared/common/h-radio-group';
import { LOAN_STATUSES_OPTIONS } from '../utils';

export const ProductLoanAdvanceSearch = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const searchForm = useSearchForm();
  return [
    createSchemaItem({
      Component: HRadioGroup,
      label: t('Status'),
      name: 'status',
      colProps: { span: 24 },
      componentProps: {
        optionType: 'button',
        options: LOAN_STATUSES_OPTIONS.map((item) => ({
          label: t(item.label),
          value: item.value,
        })),
        size: 'large',
        buttonStyle: 'solid',
        onChange: () => {
          searchForm?.submit();
        },
      },
    }),
  ];
};
