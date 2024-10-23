import { QueueTableSchema } from './search-result-table-schema';
import QueueDetail from './queue-detail/queue-detail';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HFeature, HTable } from '../../../../schema-form/features';

const QueueManagement = (props) => {
  return (
    <HFeature
      {...{
        featureId: 'queue',
      }}>

      <HSearchFormWithCreateButton/>

      <QueueDetail />

      <HTable schema={QueueTableSchema}/>
    </HFeature>
  );
};

export default QueueManagement;
