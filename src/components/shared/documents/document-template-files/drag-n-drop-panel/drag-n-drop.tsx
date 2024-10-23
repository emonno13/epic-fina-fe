import { useFeatureId } from '@schema-form/features/hooks';
import { useEffect } from 'react';
import type { DragStart } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useStore } from 'react-redux';
import { getDragDropDataFromStore, setDragDropDataToStore } from './utils';

export interface HDragDropProps {
  children: any;
  onDragEnd(result): void;
}

export const HDragDrop = ({
  children,
  onDragEnd,
  ...props
}: HDragDropProps) => {
  const dispatch = useDispatch();
  const store = useStore();
  const featureId = useFeatureId();

  useEffect(() => {
    addEventListener();
  }, []);

  useEffect(() => {
    return () => {
      removeEventListener();
    };
  });

  const addEventListener = () => {
    window.addEventListener('click', onWindowClick);
    window.addEventListener('keydown', onWindowKeyDown);
    window.addEventListener('touchend', onWindowTouchEnd);
  };

  const removeEventListener = () => {
    window.removeEventListener('click', onWindowClick);
    window.removeEventListener('keydown', onWindowKeyDown);
    window.removeEventListener('touchend', onWindowTouchEnd);
  };

  const onDragStart = (start: DragStart) => {
    const id: string = start.draggableId;
    setDragDropDataToStore(dispatch, featureId, {
      fileDocumentId: id,
    });
    const selectedFileDocumentIds = getDragDropDataFromStore(
      store,
      featureId,
    ).selectedFileDocumentIds;

    const selected: any = selectedFileDocumentIds?.find(
      (selectedId: any) => selectedId === id,
    );
    if (!selected) {
      unselectAll();
    }
  };

  const handleDragEnd = (result) => {
    const droppableId = result.destination?.droppableId;
    const selectedFileDocumentIds = getDragDropDataFromStore(
      store,
      featureId,
    ).selectedFileDocumentIds;
    if (selectedFileDocumentIds?.length) {
      result.draggableIds = getDragDropDataFromStore(
        store,
        featureId,
      ).selectedFileDocumentIds;
    }
    if (!!droppableId && !droppableId.includes('CATEGORY_')) {
      onDragEnd(result);
      unselectAll();
    }
    setDragDropDataToStore(dispatch, featureId, {
      fileDocumentId: null,
    });
  };

  const onWindowKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented) {
      return;
    }

    if (event.key === 'Escape') {
      unselectAll();
    }
  };

  const onWindowClick = (event: KeyboardEvent | any) => {
    if (event.defaultPrevented) {
      return;
    }
    unselectAll();
  };

  const onWindowTouchEnd = (event: TouchEvent) => {
    if (event.defaultPrevented) {
      return;
    }
    unselectAll();
  };

  const unselectAll = () => {
    setDragDropDataToStore(dispatch, featureId, {
      selectedFileDocumentIds: [],
    });
  };

  return (
    <DragDropContext
      {...{
        onDragStart,
        onDragEnd: handleDragEnd,
      }}
    >
      {children}
    </DragDropContext>
  );
};
