import { ScenarioIvrNodeTableSchema } from './search-result-table-schema';
import ScenarioIvrNodeDetail from './scenario-ivr-node-detail/scenario-ivr-node-detail';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HFeature, HTable } from '../../../../schema-form/features';

const ScenarioIvrTreeNodeManagement = (props) => {
  const { scenarioIvrTreeId } = props;

  return (
    <HFeature
      {...{
        featureId: 'scenario-ivr-node',
        documentIdName: 'scenarioIvrTreeNodeId',
      }}>
      <HSearchFormWithCreateButton {...{
        hiddenValues: {
          filter: {
            where: {
              scenarioIvrTreeId,
            },
          },
        },
      }}/>

      <ScenarioIvrNodeDetail {...{
        scenarioIvrTreeId,
      }}/>

      <HTable schema={ScenarioIvrNodeTableSchema}/>
    </HFeature>
  );
};

export default ScenarioIvrTreeNodeManagement;
