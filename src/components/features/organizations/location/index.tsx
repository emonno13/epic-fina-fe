import { TFunction } from 'next-i18next';
import { LocationTableSchema } from './search-result-table-schema';
import { LocationDetailSchemaForm } from './detail-schema-form';
import { ItemLocationSearchFormSchema } from './search-form';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '../../../../schema-form/features/panels';
import { useHTranslation } from '../../../../lib/i18n';

export const LOCATION_TYPE = {
  COUNTRY: 'country',
  STATE: 'state',
  TOWN_DISTRICT: 'town_district',
  SUB_DISTRICT: 'sub_district',
  OTHER: 'other',
};

export const LOCATION_TYPE_LIST_OPTION = (t: TFunction) => [
  {
    label: t('Country'),
    value: LOCATION_TYPE.COUNTRY,
  },
  {
    label: t('State'),
    value: LOCATION_TYPE.STATE,
  },
  {
    label: t('Town or district'),
    value: LOCATION_TYPE.TOWN_DISTRICT,
  },
  {
    label: t('Sub district'),
    value: LOCATION_TYPE.SUB_DISTRICT,
  },
  {
    label: t('Other'),
    value: LOCATION_TYPE.OTHER,
  },
];

const ConfigOtherManagement = (props) => {
  const { t } = useHTranslation('admin-common');

  return (
    <HFeature
      {...{
        featureId: 'location',
        nodeName: 'locations',
      }}>
      <HSearchFormWithCreateButton {...{
        withRelations: ['parent'],
        advancedSchema: ItemLocationSearchFormSchema,
        initialValues: {
          type: LOCATION_TYPE.COUNTRY,
        },
        resetIfSuccess: false,
      }}/>
      <HDocumentModalPanel>
        <HFeatureForm {...{
          schema: LocationDetailSchemaForm,
          hideSubmitAndContinueButton: true,
        }}/>
      </HDocumentModalPanel>
      <HTable schema={LocationTableSchema}/>
    </HFeature>
  );
};

export default ConfigOtherManagement;
