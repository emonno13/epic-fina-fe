import { HFeature, HTable } from '@schema-form/features';
import HSearchForm from '@schema-form/features/search-form';
import moment from 'moment';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '../../../../../schema-form/features/panels';
import { TRANSACTION_TYPE } from '../../transaction/constant';
import { ForControlDisbursementAdvanceFormSchema } from '../for-control-disbursement/for-control-disbursement-advance-form-schema';
import { BondsDetailSchema } from './bonds.detail-schema';
import { BondsTableSchema } from './bonds.table-schema';

const BondsDisbursementManagement = () => {
  return (
    <HFeature
      {...{
        featureId: 'deal-bonds',
        nodeName: 'transactions',
      }}
    >
      <HSearchForm
        {...{
          resetIfSuccess: false,
          advancedSchema: ForControlDisbursementAdvanceFormSchema,
          withRelations: ['staff', 'customer', 'product'],
          onDataReadyToSubmit: (valueForm) => {
            const { from, to } = valueForm;

            delete valueForm.from;
            delete valueForm.to;

            if (from && to) {
              return {
                ...valueForm,
                createdAt: {
                  between: [
                    moment(from).startOf('day').toString(),
                    moment(to).endOf('day').toString(),
                  ],
                },
              };
            }

            if (from) {
              return {
                ...valueForm,
                createdAt: {
                  gt: moment(from).startOf('day').toString(),
                },
              };
            }

            return {
              ...valueForm,
              createdAt: {
                lt: to ? moment(to).endOf('day').toString() : undefined,
              },
            };
          },
          hiddenFields: { type: TRANSACTION_TYPE.BONDS },
          hiddenValues: { filter: { order: ['createdAt DESC'] } },
        }}
      />
      <HDocumentModalPanel
        {...{
          width: '25%',
          hideSubmitAndContinueButton: true,
        }}
      >
        <HFeatureForm
          {...{
            schema: BondsDetailSchema,
          }}
        />
      </HDocumentModalPanel>
      <HTable schema={BondsTableSchema} />
    </HFeature>
  );
};

export default BondsDisbursementManagement;
