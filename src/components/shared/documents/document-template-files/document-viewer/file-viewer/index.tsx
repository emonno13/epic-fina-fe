import { CloseCircleFilled } from '@ant-design/icons';
import { AnyObject } from '@components/shared/atom/type';
import { usePutUnclassifiedFile } from '@components/shared/documents/hooks';
import { ClickableOpacity } from '@components/shared/utils/clickable-opacity';
import { useFeatureId } from '@schema-form/features/hooks';
import cn from 'classnames';
import { isEmpty } from 'lodash';
import { useCallback, useMemo } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { FileDocumentSelectedPanel } from '../../drag-n-drop-panel';
import { getDragDropDataBySelector } from '../../drag-n-drop-panel/utils';
import { Attach } from './attach';
import { IconViewer } from './icon-viewer';

import './img-viewer.module.scss';

export const FileViewer = ({
  fileDocument,
  className,
  handleDocumentFileTemplateChanged,
}: {
  fileDocument: AnyObject;
  className?: string;
  handleDocumentFileTemplateChanged?: () => void;
}) => {
  const featureId = useFeatureId();
  const putUnclassifiedFile = usePutUnclassifiedFile();

  const selectedFileDocumentIds = useSelector((state: RootStateOrAny) => {
    return getDragDropDataBySelector(state, featureId)?.selectedFileDocumentIds;
  });

  const draggingFileDocumentId = useSelector((state: RootStateOrAny) => {
    return getDragDropDataBySelector(state, featureId)?.fileDocumentId;
  });

  const isSelected = useMemo(
    () => selectedFileDocumentIds?.find((id) => id === fileDocument.id),
    [selectedFileDocumentIds],
  );

  const isSelectedNotDragging = useMemo(
    () =>
      selectedFileDocumentIds?.find(
        (id) =>
          !!draggingFileDocumentId &&
          id === fileDocument.id &&
          id !== draggingFileDocumentId,
      ),
    [selectedFileDocumentIds, draggingFileDocumentId],
  );

  const putFileDocumentToUnclassifiedFile = useCallback(() => {
    putUnclassifiedFile({
      fileDocument,
      onGotSuccess: handleDocumentFileTemplateChanged,
    });
  }, [fileDocument.id]);

  const onViewFile = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (!window) {
      return;
    }

    window.open(fileDocument?.file?.url);
  };

  if (isEmpty(fileDocument)) {
    return <></>;
  }

  return (
    <div className={cn('ui-img-preview', className)}>
      {isSelected && fileDocument.documentId !== 'unSelected' && (
        <ClickableOpacity
          onClick={putFileDocumentToUnclassifiedFile}
          className="unclassified-action"
        >
          <CloseCircleFilled />
        </ClickableOpacity>
      )}
      <FileDocumentSelectedPanel {...{ fileDocument }}>
        {fileDocument.file?.isImage && (
          <div className={'ui-img-preview__cover-photo'}>
            <img src={`${fileDocument.file?.url}`} />
          </div>
        )}
        {!fileDocument.file?.isImage && <IconViewer file={fileDocument.file} />}
      </FileDocumentSelectedPanel>
      {isSelected && (
        <Attach onClick={onViewFile} content={fileDocument.document?.name} />
      )}
      <style jsx>{`
        .ui-img-preview {
          border-color: ${isSelected ? 'blue' : '#eee'};
          border-style: ${isSelected ? 'dashed' : 'solid'};
          opacity: ${isSelectedNotDragging ? 0.2 : 1};
        }
      `}</style>
    </div>
  );
};
