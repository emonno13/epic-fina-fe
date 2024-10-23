import { GreetingFileTableSchema } from './search-result-table-schema';
import GreetingFileDetail from './greeting-file-detail/greeting-file-detail';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HFeature, HTable } from '../../../../schema-form/features';

const GreetingFileManagement = (props) => {
  return (
    <HFeature
      {...{
        featureId: 'greeting-file',
        documentIdName: 'greetingFileId',
        documentRelations: ['file'],
      }}>
      <HSearchFormWithCreateButton withRelations={['file']}/>

      <GreetingFileDetail />

      <HTable schema={GreetingFileTableSchema}/>
    </HFeature>
  );
};

export default GreetingFileManagement;
