import { AnyObject } from '@components/shared/atom/type';
import { useFeatureId } from '@schema-form/features/hooks';
import isUndefined from 'lodash/isUndefined';
import { memo, ReactNode, useCallback } from 'react';
import { useDispatch, useStore } from 'react-redux';
import {
  getDragDropDataFromStore,
  setDragDropDataToStore,
} from '../drag-n-drop-panel/utils';

function DocumentFile({
  fileDocument,
  children,
}: {
  fileDocument: AnyObject;
  children: ReactNode;
}) {
  const dispatch = useDispatch();
  const featureId: string = useFeatureId();
  const store = useStore();
  const fileDocumentId = fileDocument?.id;

  const isToggleSelectedFileDocumentId = useCallback(
    (fileDocumentId) => {
      const selectedFileDocumentIds: string[] | undefined =
        getDragDropDataFromStore(store, featureId).selectedFileDocumentIds;
      return selectedFileDocumentIds?.includes(fileDocumentId);
    },
    [fileDocumentId],
  );

  const toggleSelectedFileDocument = useCallback(
    (fileDocumentId) => {
      if (isUndefined(fileDocumentId)) {
        return;
      }

      const selectedFileDocumentIds: string[] | undefined =
        getDragDropDataFromStore(store, featureId).selectedFileDocumentIds;
      const newSelectedFileDocumentIds: string[] =
        selectedFileDocumentIds?.filter((s) => s !== fileDocumentId) || [];

      setDragDropDataToStore(dispatch, featureId, {
        selectedFileDocumentIds: newSelectedFileDocumentIds,
      });
    },
    [fileDocumentId],
  );

  const multiSelect = useCallback(
    (fileDocumentId) => {
      if (isUndefined(fileDocumentId)) {
        return;
      }

      const selectedIds: string[] | undefined = getDragDropDataFromStore(
        store,
        featureId,
      ).selectedFileDocumentIds;
      const newSelectedIds: string[] = [...(selectedIds || []), fileDocumentId];

      setDragDropDataToStore(dispatch, featureId, {
        selectedFileDocumentIds: newSelectedIds,
      });
    },
    [fileDocumentId],
  );

  const performAction = () => {
    if (isToggleSelectedFileDocumentId(fileDocumentId)) {
      toggleSelectedFileDocument(fileDocumentId);
      return;
    }

    multiSelect(fileDocumentId);
  };

  const handleTriggerPress = (
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    performAction();
  };

  return <div onClick={handleTriggerPress}>{children}</div>;
}

export default memo(DocumentFile);
