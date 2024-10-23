import { createSchemaItem, HFormItemProps } from '../../../../../schema-form/h-types';
import { useHTranslation } from '../../../../../lib/i18n';
import { HSelect } from '../../../../shared/common-form-elements/select';
import { BondsTransactionStatus, TransactionGateway } from '../../transaction/constant';

export const BondsDetailSchema = (props: any): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return ([
    createSchemaItem({
      Component: HSelect,
      label: t('transaction.status'),
      colProps: { xs: 24, sm: 24, md: 24 },
      name: 'status',
      rules: [{ required: true, message: t('transaction.statusIsRequired') }],
      componentProps: {
        placeholder: t('product.status'),
        options: BondsTransactionStatus(t),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('transaction.gateway'),
      colProps: { xs: 24, sm: 24, md: 24 },
      name: ['paymentInfo', 'gateway'],
      componentProps: {
        placeholder: t('transaction.gateway'),
        options: TransactionGateway(t),
      },
    }),
  ]);
};
