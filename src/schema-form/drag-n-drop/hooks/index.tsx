import { useDispatch } from 'react-redux';
import React from 'react';
import {
  useDocumentDetail,
  useFeature,
  useFeatureId,
  useItemDocument,
  useSetDocumentDetail,
  useSetItem,
} from '../../features/hooks';
import { updateItems } from '../actions';
import { HDragAndDropUtils } from '../utils';
import { ActionDndParams } from '../types';
import { removeItem } from '../../features/actions';
import { DndContextType, HDndContext } from '../contexts/h-dnd-context';
import { FormUtils } from '../../utils/form-utils';
import { usePutToApi } from '../../common/hooks';

export function useItemDetailEndpoint(itemDocumentId): string {
  const useNodeNameEndpoint = useItemNodeNameEndpoint();
  const itemDocument = useItemDocument();
  return `${useNodeNameEndpoint}/${itemDocumentId || itemDocument?.id || ''}`;
}

export function useItemNodeNameEndpoint(): string {
  const { itemEndpoint: endpoint, itemNodeName: nodeName } = useDndFeature();
  return FormUtils.getNodeEndpoint({ endpoint, nodeName }, true);
}

export function useShouldUpdateOrderNumbers(): boolean {
  const { shouldUpdateOrderNumbers } = useDndFeature();
  return shouldUpdateOrderNumbers;
}

export function useDndFeature(): DndContextType {
  const context = React.useContext(HDndContext);
  if (context === undefined) {
    throw new Error('useFeature must be used within an HDndContext');
  }
  return context;
}

export function useUpdateOrderNumbers(props?: any): Function {
  const endpoint = props?.endpoint || useItemNodeNameEndpoint();
  const shouldUpdateOrderNumbers = useShouldUpdateOrderNumbers();
  const putToApi = usePutToApi({ endpoint: `${endpoint}/order-numbers` });
  return async (reorderedItems: any[]) => {
    if (!shouldUpdateOrderNumbers) {
      return;
    }
    const data = reorderedItems.map((data, index) => ({ id: data.id, orderNumber: index }));
    await putToApi(Array.from(data));
  };
}

export function useMoveOrReorderDndItems(): any {
  const setDocumentDetail = useSetDocumentDetail();
  const document = useDocumentDetail() || {};
  const { apiEndpoint, documentId } = useFeature();
  const dispatch = useDispatch();
  const updateOrderNumbers = useUpdateOrderNumbers();
  return (reorderedItems, namespace = 'children') => {
    const items = document[namespace] || [];
    const rollback = () => {
      setDocumentDetail({ ...document, [namespace]: [...items] });
    };
    setDocumentDetail({ ...document, [namespace]: [...reorderedItems] });
    dispatch(updateItems({ apiEndpoint, documentId, reorderedItems, fieldName: namespace, rollback }));
    updateOrderNumbers(reorderedItems);
  };
}

export function useUpdateDndItem(namespace = 'children'): any {
  const setDocumentDetail = useSetDocumentDetail();
  const document = useDocumentDetail() || {};
  const setItem = useSetItem();
  const { apiEndpoint, documentId } = useFeature();
  const dispatch = useDispatch();
  const updateOrderNumbers = useUpdateOrderNumbers();
  return (item: any, actionParams: ActionDndParams) => {
    const items = document[namespace] || [];
    const rollbackItems = [...items];
    const rollback = () => {
      setDocumentDetail({ ...document, [namespace]: rollbackItems });
    };
    const onSuccess = () => {
      setItem(item);
    };
    HDragAndDropUtils.updateItem(items, actionParams.containerId, item, namespace);
    setDocumentDetail({ ...document, [namespace]: [...items] });
    dispatch(updateItems({ apiEndpoint, documentId, reorderedItems: items, fieldName: namespace, rollback, onSuccess }));
    updateOrderNumbers(items);
  };
}

export function useDeleteDndItem(namespace = 'children'): any {
  const setDocumentDetail = useSetDocumentDetail();
  const document = useDocumentDetail() || {};
  const { apiEndpoint, documentId } = useFeature();
  const dispatch = useDispatch();
  const featureId = useFeatureId();
  const items = document[namespace];
  return (itemId, actionParams: ActionDndParams) => {
    const rollback = () => {
      setDocumentDetail({ ...document, [namespace]: [...items] });
    };
    const onSuccess = () => {
      dispatch(removeItem({ itemId, featureId }));
    };
    HDragAndDropUtils.removeItem(items, actionParams.containerId, itemId, namespace);
    setDocumentDetail({ ...document, [namespace]: [...items] });
    dispatch(updateItems({ apiEndpoint, documentId, reorderedItems: items, fieldName: namespace, rollback, onSuccess }));

  };
}

export function useAddNewDndItem(namespace = 'children'): any {
  const setDocumentDetail = useSetDocumentDetail();
  const document = useDocumentDetail() || {};
  const { apiEndpoint, documentId } = useFeature();
  const dispatch = useDispatch();
  const setItem = useSetItem();

  return (newItem, actionParams: ActionDndParams, position = 'after') => {
    const items = document[namespace] || [];
    const rollback = () => {
      setDocumentDetail({ ...document, [namespace]: [...items] });
    };
    const onSuccess = () => {
      setItem(newItem, true);
    };
    HDragAndDropUtils.addItem(items, newItem, actionParams.containerId, actionParams.currentIndex || 0, position, namespace);
    setDocumentDetail({ ...document, [namespace]: [...items] });
    dispatch(updateItems({ apiEndpoint, documentId, reorderedItems: items, fieldName: namespace, rollback, onSuccess }));
  };
}

