import { AnyObject } from '@components/shared/atom/type';
import useLongPress from '@lib/hooks/use-long-press';
import { useFeatureId } from '@schema-form/features/hooks';
import isUndefined from 'lodash/isUndefined';
import React, { useCallback } from 'react';
import type { DraggableProps } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch, useStore } from 'react-redux';
import { NAMESPACES } from '../common/constrants';
import { getDragDropDataFromStore, setDragDropDataToStore } from './utils';

const primaryButton = 0;
export interface DraggablePannelProps extends DraggableProps {
  fileDocument?: any;
  renderContent?: any;
  style?: AnyObject;
  children: any;
}

export const DraggablePanel = ({
  draggableId,
  index,
  style = {},
  fileDocument = {},
  renderContent = (provided, snapshot) => null,
  ...props
}: DraggablePannelProps) => {
  const store = useStore();
  const dispatch = useDispatch();
  const featureId: string = useFeatureId();
  const isFileDocumentUndefined = isUndefined(fileDocument?.id);
  const fileDocumentId = fileDocument?.id;

  const getUploadedDocuments = () => {
    return (
      store.getState().featureStore?.[featureId]?.[
        NAMESPACES.uploadedDocuments
      ] || {}
    );
  };

  const getSelectedByGroup = () => {
    const uploadedDocuments: any = getUploadedDocuments();
    const selectedIds: any[] =
      getDragDropDataFromStore(store, featureId).selectedFileDocumentIds || [];

    const selectedFistId = selectedIds.length ? selectedIds[0] : null;
    const uploadedDocumentKeys = Object.keys(uploadedDocuments);
    if (!selectedFistId || !uploadedDocumentKeys) {
      return false;
    }

    const sameDocumentGroup = uploadedDocumentKeys.find((key) => {
      const group = JSON.stringify(uploadedDocuments[key]);
      const selectFirstIdInGroup = group.includes(selectedFistId);
      const fileDocumentIdInGroup = group.includes(fileDocumentId);
      return selectFirstIdInGroup && fileDocumentIdInGroup;
    });

    if (!sameDocumentGroup) {
      return false;
    }

    const documentsGroup = uploadedDocuments[sameDocumentGroup] as any[];
    const startIndex = documentsGroup?.findIndex(
      (fileDocument) => fileDocument?.id === selectedFistId,
    );
    const endIndex = documentsGroup?.findIndex(
      (fileDocument) => fileDocument?.id === fileDocumentId,
    );

    const indexFrom = startIndex >= endIndex ? endIndex : startIndex;
    const indexTo = (startIndex < endIndex ? endIndex : startIndex) + 1;

    const documentIds = documentsGroup
      .slice(indexFrom, indexTo)
      .map((item) => item?.id);
    return [...new Set([selectedFistId, ...documentIds])];
  };

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

  const toggleSelectionInGroup = () => {
    if (isFileDocumentUndefined) {
      return;
    }
    const selectedIds = getDragDropDataFromStore(store, featureId)
      .selectedFileDocumentIds as any;

    if (!getSelectedByGroup()) {
      return;
    }

    const index: number = selectedIds.indexOf(fileDocumentId);
    if (index === -1) {
      setDragDropDataToStore(dispatch, featureId, {
        selectedFileDocumentIds: [...selectedIds, fileDocumentId],
      });
      return;
    }

    const shallow: any[] = [...selectedIds];
    shallow.splice(index, 1);
    setDragDropDataToStore(dispatch, featureId, {
      selectedFileDocumentIds: shallow,
    });
  };

  const wasToggleInSelectionGroupKeyUsed = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const isUsingWindows = navigator.platform.indexOf('Win') >= 0;
    return isUsingWindows ? event.ctrlKey : event.metaKey;
  };

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

  const performAction = (event: React.MouseEvent<HTMLDivElement>) => {
    if (wasToggleInSelectionGroupKeyUsed(event)) {
      toggleSelectionInGroup();
      return;
    }

    if (isToggleSelectedFileDocumentId(fileDocumentId)) {
      toggleSelectedFileDocument(fileDocumentId);
      return;
    }

    multiSelect(fileDocumentId);
  };

  const onClick = (event: any | React.MouseEvent<HTMLDivElement>) => {
    if (event.defaultPrevented) {
      return;
    }

    if (event.button !== primaryButton) {
      return;
    }

    // marking the event as used
    event.preventDefault();
    performAction(event);
  };

  const longPressEvent = useLongPress(() => {}, onClick);

  return (
    <Draggable
      key={draggableId}
      draggableId={draggableId}
      index={index}
      {...props}
    >
      {(provided, snapshot) => {
        return (
          <div
            style={{
              ...style,
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            {...longPressEvent}
          >
            {renderContent(provided, snapshot) || props.children}
          </div>
        );
      }}
    </Draggable>
  );
};
