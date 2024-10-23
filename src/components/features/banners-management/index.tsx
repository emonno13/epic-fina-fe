import { HFeature, HTable } from '../../../schema-form/features';
import { HFeatureForm } from '../../../schema-form/features/forms/h-feature-form';
import { HDocumentDrawerPanel } from '../../../schema-form/features/panels';
import { HSearchFormWithCreateButton } from '../../../schema-form/features/search-form';
import { BannersDetailSchemaForm } from './banners.detail-schema-form';
import { BannersTableSchema } from './banners.table-schema';
import { displayBannerCondition } from './constants';

const BannersManagement = () => {
  return (
    <HFeature
      {...{
        featureId: 'banners',
        nodeName: 'banners',
      }}
    >
      <HSearchFormWithCreateButton
        {...{
          hiddenValues: {
            filter: {
              order: ['priority ASC'],
            },
          },
        }}
      />
      <HDocumentDrawerPanel>
        <HFeatureForm
          {...{
            schema: BannersDetailSchemaForm,
            hideSubmitAndContinueButton: true,
            onDataReadyToSubmit: (values) => {
              return {
                ...values,
                image: values?.image?.url || '',
                applyTo: values?.applyTo || null,
              };
            },
          }}
        />
      </HDocumentDrawerPanel>
      <HTable
        {...{
          schema: BannersTableSchema,
          onRow: (record) => {
            const displayCondition = displayBannerCondition(record);
            return {
              style: {
                background: displayCondition ? 'unset' : 'rgb(252, 236, 237)',
              },
            };
          },
        }}
      />
    </HFeature>
  );
};

export default BannersManagement;
