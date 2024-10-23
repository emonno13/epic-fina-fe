import { EmptyDocumentViewer } from './empty-document-viewer';
import { DroppablePanel } from '../drag-n-drop-panel/droppable-panel';
import { DraggablePanel } from '../drag-n-drop-panel';
import { useSelectFeatureData } from '../../../../../schema-form/features/hooks';
import { NAMESPACES } from '../common/constrants';
import { DocumentNameViewer } from '../document-viewer/document-name';
import { FileViewer } from '../document-viewer/file-viewer';

import './img-group-viewer.module.scss';

export interface DocumentGroupViewerProps {
  category?: any,
  groupIndex: number,
  documentTemplateDetail: any;
  isDisabled?: boolean;
}

export const DocumentGroupViewer = ({ documentTemplateDetail, isDisabled = false }: DocumentGroupViewerProps) => {
  const documentId = documentTemplateDetail?.documentId;

  const uploadDocuments = useSelectFeatureData(NAMESPACES.uploadedDocuments);
  const fileDocuments = uploadDocuments && uploadDocuments[documentId] || [];

  return (
    <DroppablePanel  {...{
      droppableId: documentId,
      className: 'document-group',
    }}>
      {fileDocuments?.map((fileDocumentItem: any, index) => {
        fileDocumentItem.orderNumber = index;
        return (
          <DraggablePanel
            key={fileDocumentItem.id}
            {...{
              draggableId: fileDocumentItem.id,
              index,
              isDragDisabled: isDisabled,
              fileDocument: fileDocumentItem,
            }}>
            <FileViewer fileDocument={fileDocumentItem} className="view" />
          </DraggablePanel>
        );
      })}

      {fileDocuments.length === 0 &&  (
        <EmptyDocumentViewer {...{
          document: documentTemplateDetail?.document,
        }}/>
      )}

      <DocumentNameViewer {...{ documentTemplateDetail }}/>
    </DroppablePanel>
  );
};