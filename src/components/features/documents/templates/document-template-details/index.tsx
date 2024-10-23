import { AddingDocuments } from './adding-documents/adding-documents';
import { GroupDocumentsByCategories } from './group-documents-by-categories-viewer/group-documents-by-categories-viewer';
import { endpoints } from '../../../../../lib/networks/endpoints';
import { HFeature } from '../../../../../schema-form/features';
import { HSearchFormHiddenAble } from '../../../../../schema-form/features/search-form';

export const DocumentTemplateDetails = ({
  showRowSelection = false,
  excludeDocumentIds = [],
  addToDocumentId = '',
  allowAddingMoreDocuments = false,
  featureId = 'documentsGroupByCategories',
  documentSearchForm = (f=> []),
  showGroupAction = false,
}) => {
  const endpoint = endpoints.endpointWithApiDomain('/document-template-details/templates');

  return (
    <HFeature {...{
      featureId,
      useQueryParams: false,
      endpoint,
      documentIdName: addToDocumentId || 'addMoreToDocumentTemplateId',
    }}>
      <HSearchFormHiddenAble {...{
        schema: documentSearchForm,
        hiddenFields: { documentTemplateId: addToDocumentId },
      }}/>

      {showGroupAction && (
        <AddingDocuments {...{
          addToDocumentId,
          allowAddingMoreDocuments,
        }}/>
      )}

      <GroupDocumentsByCategories {...{
        isEditableTable: allowAddingMoreDocuments,
        showRowSelection,
        excludeDocumentIds,
      }} />
    </HFeature>
  );
};