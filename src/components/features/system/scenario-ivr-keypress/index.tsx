import { ScenarioIvrKeypressTableSchema } from './search-result-table-schema';
import { ScenarioIvrKeypressDetailSchemaForm } from './detail-schema-form';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HDocumentModalPanel } from '../../../../schema-form/features/panels';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';

const ScenarioIvrKeypressManagement = (props) => {
  const { scenarioIvrNodeId } = props;

  return (
    <HFeature
      {...{
        featureId: 'scenario-ivr-keypress',
        documentIdName: 'scenarioIvrKeypressId',
      }}>
      <HSearchFormWithCreateButton {...{
        hiddenValues: {
          filter: {
            where: {
              scenarioIvrNodeId,
            },
          },
        },
      }}/>

      <HDocumentModalPanel width={'40%'}>
        <HFeatureForm {...{
          onDataReadyToSubmit: (data) => {
            if (data.actionValue) {
              data.action.actionValue = data.actionValue;
              delete data.actionValue;
            }

            return {
              ...data,
              scenarioIvrNodeId,
            };
          },
          schema: ScenarioIvrKeypressDetailSchemaForm,
          hideSubmitAndContinueButton: true,
        }}/>
      </HDocumentModalPanel>

      <HTable schema={ScenarioIvrKeypressTableSchema}/>
    </HFeature>
  );
};

export default ScenarioIvrKeypressManagement;
