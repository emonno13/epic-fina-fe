import { HModal } from '../../../../../shared/common/h-modal';
import { DocumentTemplateDetails } from '../index';
import { ProductDocumentTemplateSearchFromSchema } from '../../../../fina/products/loans/product-document-template/product-document-template-search-form-schema';

export const AddingFromTemplateModal = ({
  visible = false,
  onCancel = (f => f),
  width = '80%',
  onOk = (f => f),
  destroyOnClose = false,
  excludeDocumentIds = [],
  addToDocumentId = '',
}) => {
  return (
    <HModal{...{
      visible,
      onCancel,
      width,
      onOk: () => {
        onOk({ fromModalName: 'template' });
      },
      destroyOnClose,
    }}>
      <DocumentTemplateDetails {...{
        showRowSelection: true,
        featureId: addToDocumentId,
        excludeDocumentIds,
        documentSearchForm: ProductDocumentTemplateSearchFromSchema,
      }}/>
    </HModal>
  );
};