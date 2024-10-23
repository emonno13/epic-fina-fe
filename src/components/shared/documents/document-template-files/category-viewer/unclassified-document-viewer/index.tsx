import { useSelectFeatureData } from '@schema-form/features/hooks';
import { useHTranslation } from '../../../../../../lib/i18n';
import { NAMESPACES } from '../../common/constrants';
import DocumentFile from '../../document-file';
import { FileViewer } from '../../document-viewer/file-viewer';
import { DroppablePanel } from '../../drag-n-drop-panel/droppable-panel';

import './unclassified-document-viewer.module.scss';

export const UnclassifiedDocumentViewer = ({
  handleDocumentFileTemplateChanged,
}) => {
  const uploadedDocuments =
    useSelectFeatureData(NAMESPACES.uploadedDocuments) || [];
  const unclassifiedFiles =
    (uploadedDocuments && uploadedDocuments['unSelected']) || [];
  const { t } = useHTranslation('admin-common');

  return (
    <>
      <h3 className={'unclassified-document__title'}>
        {t('Unclassified Document', { vn: 'Tài liệu chưa được phân loại' })}
      </h3>
      <DroppablePanel
        {...{
          droppableId: 'unclassified',
          className: 'unclassified',
          style: {
            border: '1px dashed lightgrey',
          },
        }}
      >
        {unclassifiedFiles?.map((fileDocument, index) => {
          fileDocument.orderNumber = index;
          return (
            <DocumentFile key={fileDocument.id} fileDocument={fileDocument}>
              <FileViewer
                handleDocumentFileTemplateChanged={
                  handleDocumentFileTemplateChanged
                }
                className="view"
                {...{ fileDocument }}
              />
            </DocumentFile>
          );
        })}

        {unclassifiedFiles.length === 0 && (
          <div style={{ padding: '50px' }}></div>
        )}
      </DroppablePanel>
    </>
  );
};
