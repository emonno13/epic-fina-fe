import { Col, notification, Row } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import useLongPress from '@lib/hooks/use-long-press';
import { AnyObject } from '@components/shared/atom/type';
import { useHTranslation } from '@lib/i18n';
import { getUploadedDocumentsOfTemplate } from './actions';
import { NAMESPACES } from './common/constrants';
import DocumentUploader from './document-uploader';
import { HDragDrop } from './drag-n-drop-panel';
import {
  getDragDropDataFromStore,
  initialDragDrogData,
} from './drag-n-drop-panel/utils';
import { UnclassifiedDocumentViewer } from './category-viewer/unclassified-document-viewer';
import DocumentFile from './document-file';
import TemplateModal from './template-modal';
import { FileViewer } from './document-viewer/file-viewer';
import { useTableMetadata } from '../../../../schema-form/features/hooks/table-hooks';
import { useSetFeatureData } from '../../../../schema-form/features/hooks/document-detail-hooks';
import {
  useFeatureId,
  useSelectFeatureData,
  useTableSourceData,
} from '../../../../schema-form/features/hooks';
import { endpoints } from '../../../../lib/networks/endpoints';
import { callApi } from '../../../../schema-form/common/actions';

export const DocumentTemplateFiles = ({
  documentTemplateId = '',
  objectId = '',
  objectType = '',
  objectSubType = '',
  isDisabled = false,
  dragDropContent,
}) => {
  const categoriesAndDocuments = useTableSourceData() || [];
  const metadata = useTableMetadata();
  const dispatch = useDispatch();
  const store = useStore();
  const featureId = useFeatureId();
  const templateId = useMemo(
    () => documentTemplateId || metadata.documentTemplateId,
    [documentTemplateId, metadata],
  );
  const [visible, setVisible] = useState<boolean>(false);
  const { t } = useHTranslation('common');
  const [selectedDocumentId, setSelectedDocumentId] = useState<string>('');

  const setFeatureData = useSetFeatureData(featureId);
  const storeDocumentUploadedToStore = (data) => {
    setFeatureData(NAMESPACES.uploadedDocuments, data?.data);
    setFeatureData(NAMESPACES.dragDrop, initialDragDrogData);
  };
  useEffect(() => {
    handleDocumentFileTemplateChanged();
  }, [templateId]);

  const handleDocumentFileTemplateChanged = useCallback(() => {
    dispatch(
      getUploadedDocumentsOfTemplate({
        callback: storeDocumentUploadedToStore,
        params: {
          documentTemplateId: templateId,
          objectId,
          objectType,
          objectSubType,
        },
      }),
    );
  }, [templateId, objectId, objectType, objectSubType]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result?.draggableIds) {
      updateMulti(result);
      closeModal();
      return;
    }

    updateSingle(result);
    closeModal();
  };

  const onDropFileToDocument = (result, endpoint) => {
    const ids = result?.draggableIds;
    const droppableId = result.destination.droppableId;
    const draggableId = result.draggableId;
    const isUnclassified = droppableId === 'unclassified';
    const updateData = {
      ids,
      documentId: isUnclassified ? 'unSelected' : droppableId,
      objectId,
      objectType,
      objectSubType,
    };
    if (isUnclassified || (draggableId && droppableId)) {
      dispatch(
        callApi({
          method: 'put',
          params: updateData,
          endpoint,
          callback: handleDocumentFileTemplateChanged,
        }),
      );
    }
  };

  const updateSingle = (result) => {
    const draggableId = result.draggableId;
    const endpoint = endpoints.endpointWithApiDomain(
      `/document-template-files/${draggableId}`,
    );
    onDropFileToDocument(result, endpoint);
  };

  const updateMulti = (result) => {
    const endpoint = endpoints.endpointWithApiDomain(
      '/document-template-files/batch',
    );
    onDropFileToDocument(result, endpoint);
  };

  const closeModal = () => {
    setVisible(false);
    setSelectedDocumentId('');
  };

  const onLongPressTrigger = () => {
    const filesMove =
      getDragDropDataFromStore(store, featureId)?.selectedFileDocumentIds || [];
    if (filesMove?.length) {
      setVisible(true);
    }
  };

  const longPressEvent = useLongPress(onLongPressTrigger, () => {});

  const uploadedDocuments =
    useSelectFeatureData(NAMESPACES.uploadedDocuments) || [];
  const documentFiles: AnyObject[] = [];

  categoriesAndDocuments.forEach((category) => {
    const documentTemplateDetails = category.documentTemplateDetails || [];

    documentTemplateDetails.forEach((documentTemplateDetail) => {
      const documentId = documentTemplateDetail?.documentId;
      const fileDocuments =
        (uploadedDocuments && documentId && uploadedDocuments[documentId]) ||
        [];

      documentFiles.push(...(fileDocuments || []));
    });
  });

  const handleSubmitChange = () => {
    const filesMove: string[] | undefined =
      getDragDropDataFromStore(store, featureId)?.selectedFileDocumentIds || [];

    if (!selectedDocumentId || filesMove?.length === 0) {
      notification.error({
        message: 'Thông báo',
        description: 'Bạn cần chọn thư mục đích hoặc File',
      });
      return;
    }

    const data = {
      destination: {
        droppableId: selectedDocumentId || 'unclassified',
      },
      draggableId: filesMove?.[0],
      draggableIds: filesMove?.length > 1 ? filesMove : undefined,
    };

    onDragEnd(data);
  };

  return (
    <HDragDrop onDragEnd={onDragEnd}>
      <div className="gallery-wrap" {...longPressEvent}>
        {!isDisabled && (
          <>
            <DocumentUploader
              {...{
                onUploadDone: handleDocumentFileTemplateChanged,
                objectId,
                objectType,
                objectSubType,
                dragDropContent,
              }}
            />
            <UnclassifiedDocumentViewer
              handleDocumentFileTemplateChanged={
                handleDocumentFileTemplateChanged
              }
            />
            <br />
            <h3 className="unclassified-document__title">
              {t('Document', { vn: 'Tài liệu được phân loại' })}
            </h3>
            <div className="gallery-file-document-wrapper">
              <Row className="gallery-file-document" gutter={[8, 8]}>
                {documentFiles.map((fileDocument) => {
                  return (
                    <Col {...{ sm: 4 }} key={fileDocument.id}>
                      <DocumentFile fileDocument={fileDocument}>
                        <FileViewer
                          handleDocumentFileTemplateChanged={
                            handleDocumentFileTemplateChanged
                          }
                          fileDocument={fileDocument}
                          className="view"
                        />
                      </DocumentFile>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </>
        )}
      </div>
      <TemplateModal
        handleSubmitChange={handleSubmitChange}
        selectedDocumentId={selectedDocumentId}
        setSelectedDocumentId={setSelectedDocumentId}
        visible={visible}
        onCancel={closeModal}
      />
    </HDragDrop>
  );
};

export default DocumentTemplateFiles;
