import { HFormProps } from '@schema-form/h-types';
import { endpoints } from '../../../../../../../lib/networks/endpoints';
import { HFeatureForm } from '../../../../../../../schema-form/features/forms/h-feature-form';
import { HistoriesDisbursementSchema } from './detail-histories-disbursement-chema-form';

export const HistoriesDisbursementForm = (formProps: HFormProps) => {
  return (
    <HFeatureForm
      {...{
        endpoint: endpoints.endpointWithApiDomain(
          '/transactions/create-transaction-deal',
        ),
        method: 'post',
        hideControlButton: false,
        schema: HistoriesDisbursementSchema,
        className: 'full-width',
        ...formProps,
      }}
    />
  );
};
