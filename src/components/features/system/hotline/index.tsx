import { HotlineTableSchema } from './search-result-table-schema';
import HotlineDetail from './hotline-detail/hotline-detail';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HFeature, HTable } from '../../../../schema-form/features';

const HotlineManagement = (props) => {
  return (
    <HFeature
      {...{
        featureId: 'hotline',
      }}>

      <HSearchFormWithCreateButton {...{
        withRelations: ['ivrTree', 'queue'],
      }}/>

      <HotlineDetail />

      <HTable schema={HotlineTableSchema}/>
    </HFeature>
  );
};

export default HotlineManagement;
