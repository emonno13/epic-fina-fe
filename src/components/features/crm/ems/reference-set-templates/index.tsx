import { ReferenceSetTemplateDetailViewer } from './detail-viewer/detail-viewer';
import { ReferenceSetTemplateTableSchema } from './reference-set-template-table-schema';
import { HFeature, HTable } from '../../../../../schema-form/features';
import { HSearchFormWithCreateButton } from '../../../../../schema-form/features/search-form';

export default () => {
  return (
    <HFeature
      {...{
        featureId: 'reference-set-template',
        documentIdName: 'referenceSetTemplateId',
      }}>
      <HSearchFormWithCreateButton {...{
        resetIfSuccess: false,
      }}/>

      <ReferenceSetTemplateDetailViewer />

      <HTable schema={ReferenceSetTemplateTableSchema}/>
    </HFeature>
  );
};
