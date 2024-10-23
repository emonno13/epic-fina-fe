import HDragger from '@components/shared/h-dragger';
import { useTableMetadata } from '../../../../../schema-form/features/hooks/table-hooks';

import './document-uploader.module.scss';

export const UploadDocumentHeader = (props) => {
  const metadata = useTableMetadata();
  const {
    onUploadDone = (f) => f,
    objectId,
    objectType,
    objectSubType,
    dragDropContent,
  } = props;

  return (
    <div className="ui-upload-document-header">
      <HDragger
        documentTemplateId={metadata.documentTemplateId}
        objectId={objectId}
        objectType={objectType}
        objectSubType={objectSubType}
        uploadContent={dragDropContent}
        onGotSuccess={onUploadDone}
        showUploadList={false}
      />
    </div>
  );
};

export default UploadDocumentHeader;
