import { DocumentResultTableSchema } from './document-result-table-schema';
import { EditForm } from './edit-form';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HFeature, HTable } from '../../../../schema-form/features';

const DocumentManagement = ({
  excludeDocumentIds = [],
  useQueryParams = true,
  documentIdName = 'documentId',
  ...props
}) => {
  return (
    <HFeature
      {...{
        featureId: 'documents',
        nodeName: 'documents',
        documentIdName,
        useQueryParams,
      }}
    >
      <HSearchFormWithCreateButton {...{
        withRelations: ['documentCategory'],
        hiddenValues: {
          filter: { where: { id: { nin: excludeDocumentIds } } },
        },
      }}/>
      <EditForm />
      <HTable {...{
        schema: () => DocumentResultTableSchema(props),
        rowSelection: props?.rowSelection,
      }}/>
    </HFeature>
  );
};

export default DocumentManagement;