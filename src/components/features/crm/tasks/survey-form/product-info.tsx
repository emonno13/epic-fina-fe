import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { PRODUCT_TYPES } from 'types/organization';
import { TASK_STATUSES_ASSIGNED } from '../../../../../constants/crm/task';
import { useDocumentDetail } from '../../../../../schema-form/features/hooks';

export const ProductInfo = (props: HFormProps): HFormItemProps[] => {
  const { transport } = props;
  const { selectedCategoryId, setSelectedCategoryId, setSelectedProductId } =
    transport;
  const taskData = useDocumentDetail();
  const { t } = useHTranslation('admin-common');
  const isCantModify = [
    TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_APPROVAL,
    TASK_STATUSES_ASSIGNED.BANK_APPROVAL,
    TASK_STATUSES_ASSIGNED.BANK_REJECT,
  ].includes(taskData?.statusAssign);

  return [
    createSchemaItem({
      Component: HSelect,
      label: t('Loan Category'),
      colProps: { span: 8 },
      rowProps: { gutter: { xs: 12, md: 12 } },
      name: 'categoryId',
      initialValue: taskData?.categoryId,
      componentProps: {
        endpoint: 'categories/suggestion',
        hiddenValues: { type: PRODUCT_TYPES.loan },
        placeholder: t('Select a loan category', { vn: 'Lựa chọn khoản vay' }),
        optionsConverter: (document) => ({
          ...document,
          label: `${document?.name} - ${document.code}`,
        }),
        onChangeSelected: (document) => {
          setSelectedCategoryId(document?.id);
        },
        disabled: isCantModify,
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Product'),
      name: 'productId',
      colProps: { span: 8 },
      initialValue: taskData?.productId,
      componentProps: {
        placeholder: t('Product'),
        showSearch: true,
        allowClear: false,
        optionFilterProp: 'children',
        searchWhenHidenValueChange: true,
        endpoint: 'products/suggestion',
        hiddenValues: selectedCategoryId
          ? { categoryId: selectedCategoryId }
          : {},
        optionsConverter: (document) => ({
          ...document,
          label: `${document?.name} - ${document.code}`,
        }),
        onChangeSelected: (document) => {
          setSelectedProductId(document?.id);
        },
        disabled: isCantModify,
      },
    }),
  ];
};
