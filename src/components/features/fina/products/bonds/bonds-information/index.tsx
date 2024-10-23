import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import { PRODUCT_TYPE } from '../../utils';
import { BONDS_STATUS } from '../constant';
import { ViewerSchemaForm } from './viewer.schema-form';

const BondsInformationForm = () => {
  return (
    <HFeatureForm
      {...{
        hiddenValues: { type: PRODUCT_TYPE.BONDS },
        schema: ViewerSchemaForm,
        resetIfSuccess: false,
        showResetButton: false,
        hideControlButton: false,
        hideSubmitAndContinueButton: false,
        initialValues: {
          status: BONDS_STATUS.DRAFT,
          info: {
            allowedPreSale: false,
          },
        },
      }}
    />
  );
};

export default BondsInformationForm;
