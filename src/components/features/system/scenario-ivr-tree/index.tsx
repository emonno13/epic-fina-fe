import { ScenarioIvrTreeTableSchema } from './search-result-table-schema';
import ScenarioIvrTreeDetail from './scenario-ivr-tree-detail/scenario-ivr-tree-detail';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HFeature, HTable } from '../../../../schema-form/features';

const ScenarioIvrTreeManagement = (props) => {
  return (
    <HFeature
      {...{
        featureId: 'scenario-ivr-tree',
      }}>

      <HSearchFormWithCreateButton/>

      <ScenarioIvrTreeDetail />

      <HTable schema={ScenarioIvrTreeTableSchema}/>
    </HFeature>
  );
};

export default ScenarioIvrTreeManagement;
