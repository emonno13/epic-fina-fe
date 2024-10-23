import { setDocumentFragments } from '@schema-form/features/actions';
import { NAMESPACES } from '../common/constrants';

export interface DragDrogStore {
  selectedFileDocumentIds?: any[];
  fileDocumentId?: any | string;
  isDragging?: boolean;
}
export const initialDragDrogData: DragDrogStore = {
  selectedFileDocumentIds: [],
  fileDocumentId: null,
  isDragging: false,
};

export const setDragDropDataToStore = (
  dispatch,
  featureId,
  dragDropData: DragDrogStore,
) => {
  const namespace = NAMESPACES.dragDrop;
  dispatch(
    setDocumentFragments({
      featureId,
      namespace,
      documentFragments: dragDropData,
    }),
  );
};

export const getDragDropDataFromStore = (store, featureId): DragDrogStore => {
  const namespace = NAMESPACES.dragDrop;
  return store.getState().featureStore[featureId]?.[namespace];
};

export const getDragDropDataBySelector = (state, featureId): DragDrogStore => {
  const namespace = NAMESPACES.dragDrop;
  return state.featureStore[featureId][namespace];
};
