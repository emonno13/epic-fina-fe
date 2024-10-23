import { NewsTableSchema } from './search-result-table-schema';
import NewsDetail from './details';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HFeature, HTable } from '../../../../schema-form/features';

const NewsManagement = (props) => {
  return (
    <HFeature
      {...{
        featureId: 'news',
        nodeName: 'news',
      }}>
      <HSearchFormWithCreateButton/>
      <NewsDetail/>
      <HTable schema={NewsTableSchema}/>
    </HFeature>
  );
};

export default NewsManagement;
