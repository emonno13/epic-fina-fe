import { GroupTableSchema } from './search-result-table-schema';
import GroupDetail from './group-detail/group-detail';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HFeature, HTable } from '../../../../schema-form/features';

const GroupManagement = (props) => {

  return (
    <HFeature
      {...{
        featureId: 'group',
      }}>
      <HSearchFormWithCreateButton/>

      <GroupDetail />

      <HTable schema={GroupTableSchema}/>
    </HFeature>
  );
};

export default GroupManagement;
