import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { FormInstance } from 'antd/lib/form';
import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'underscore';
import { ActionDndParams } from '../../drag-n-drop/types';
import {
  addItem,
  setDocumentDetailVisibility,
  setDocumentFragments,
  setDocumentParams,
  setFeatureData,
  setItems,
  setItemVisibility,
  setTransactionsOfDeal,
  setViewTypeOfDeal,
  updateItemContainerAndIndex,
} from '../actions';
import { HFeatureContext } from '../contexts/h-feature-context';
import { NEW_DOCUMENT_ID } from '../forms/h-feature-form';
import { NEW_ITEM_DOCUMENT_ID } from '../forms/h-item-form';
import { useFeature, useFeatureData, useFeatureId } from './feature-hooks';
import { useSetDocumentDetail } from './table-hooks';

export function useDetailForm(): FormInstance<any> | undefined {
  const context = useFeature();
  return context.detailForm;
}

export function useItemDocumentForm(): FormInstance<any> | undefined {
  const context = useFeature();
  return context.itemDocumentForm;
}

export function useSubmitAndContinueButton(): FormInstance<any> | undefined {
  const context = useFeature();
  return context.submitAndContinueDocumentButtonRef;
}

export function useSubmitButton(): FormInstance<any> | undefined {
  const context = useFeature();
  return context.submitDocumentButtonRef;
}

export function useDocumentId(): boolean {
  const { documentId } = useFeature();
  const documentDetail = useDocumentDetail();
  return documentDetail?.id || documentId;
}

export function useIsNewDocument(): boolean {
  const featureData = useFeature();
  const documentDetail = useDocumentDetail();
  const documentId = documentDetail?.id || featureData?.documentId;
  return !documentId || documentDetail?.id === NEW_DOCUMENT_ID;
}

export function useDetailTitleDefault() {
  const documentDetail = useDocumentDetail();
  const isNewDocument = documentDetail?.id === NEW_DOCUMENT_ID;
  return (documentModelName: string) => {
    return isNewDocument
      ? `Create new ${documentModelName}`
      : `Update ${documentModelName}`;
  };
}

export function useSubmitDocumentButtonRef(): any {
  const context = React.useContext(HFeatureContext);
  return context?.submitDocumentButtonRef;
}

export function useSubmitAndContinueDocumentButtonRef(): any {
  const context = React.useContext(HFeatureContext);
  return context?.submitAndContinueDocumentButtonRef;
}

export function useDocumentDetail(
  documentId?: string,
  documentDetailNamespaceViaId?: boolean,
): any {
  const isUseNamespaceViaId =
    documentDetailNamespaceViaId !== undefined
      ? documentDetailNamespaceViaId
      : useFeature().documentDetailNamespaceViaId;
  const namespace: any = isUseNamespaceViaId ? documentId : 'documentDetail';
  const featureData = useFeatureData();
  return featureData[namespace];
}

export function useSetDocumentParams(): any {
  const aFeatureId: string = useFeatureId();
  const aDocumentId = useDocumentId();
  const dispatch = useDispatch();
  return (params = {}, featureId = aFeatureId, documentId = aDocumentId) => {
    dispatch(setDocumentParams({ featureId, documentId }));
  };
}

export function useDocumentParams(): any {
  const documentId = useDocumentId();
  const featureData = useFeatureData();
  return featureData[`optionParamsOfDocument:${documentId}`];
}

export function useSetFeatureData(featureId?: string): Function {
  const dispatch = useDispatch();
  const feature = useFeature();
  return (namespace: string, data: any) => {
    dispatch(
      setFeatureData({
        featureId: featureId || feature.featureId,
        namespace,
        data,
      }),
    );
  };
}

export function useSetDocumentFragments(): Function {
  const dispatch = useDispatch();
  const { featureId, documentDetailNamespaceViaId } = useFeature();
  return (
    documentFragments,
    documentId?: string,
    adocumentDetailNamespaceViaId = documentDetailNamespaceViaId,
  ) => {
    const namespace = adocumentDetailNamespaceViaId
      ? documentId
      : 'documentDetail';
    dispatch(setDocumentFragments({ featureId, namespace, documentFragments }));
  };
}

export function useOnCloseDocumentDetail(): any {
  const setDocumentDetail = useSetDocumentDetail();
  const { useQueryParams, documentIdName, detailForm } = useFeature();
  const setDocumentDetailVisibility = useSetDocumentDetailVisibility();
  return (params = {}) => {
    setDocumentDetailVisibility(false);
    useQueryParams &&
      RouteUtils.redirectToDocumentDetail(undefined, documentIdName, params);
    setDocumentDetail({}, false);
    detailForm?.resetFields();
  };
}

export function useDocumentDetailVisibility(featureIdDefault?: string): any {
  const featureId: string = featureIdDefault || useFeatureId();
  const documentDetailVisibility = useSelector((state: RootStateOrAny) => {
    return state?.featureStore[featureId]?.documentDetailVisibility;
  }, isEqual);
  return documentDetailVisibility;
}

export function useSetDocumentDetailVisibility(featureIdDefault?: string): any {
  const featureId: string = featureIdDefault || useFeatureId();
  const dispatch = useDispatch();
  return (documentDetailVisibility) => {
    dispatch(
      setDocumentDetailVisibility({ featureId, documentDetailVisibility }),
    );
  };
}

export function useHideDocumentDetail(): any {
  const { useQueryParams, documentIdName } = useFeature();
  const setDocumentDetail = useSetDocumentDetail();
  return (params = {}) => {
    setTimeout(() => {
      useQueryParams &&
        RouteUtils.redirectToDocumentDetail(undefined, documentIdName, params);
      setDocumentDetail({}, false);
    }, 0);
  };
}

export function useSetItems(featureIdDefault?: string): any {
  const featureId: string = featureIdDefault || useFeatureId();
  const dispatch = useDispatch();
  return (items) => {
    dispatch(setItems({ featureId, items }));
  };
}

export function useSetItem(featureIdDefault?: string): any {
  const featureId: string = featureIdDefault || useFeatureId();
  const dispatch = useDispatch();
  return (item, visibility, options: any | ActionDndParams) => {
    dispatch(
      addItem({
        featureId,
        item,
        visibility,
        options: {
          currentIndex: options?.currentIndex,
          containerId: options?.containerId,
          currentItemId: options?.currentDataItem?.id,
        },
      }),
    );
  };
}

export function useUpdateDndItemContainerAndIndex(
  featureIdDefault?: string,
): any {
  const featureId: string = featureIdDefault || useFeatureId();
  const dispatch = useDispatch();
  return (itemId, options: any | ActionDndParams) => {
    dispatch(
      updateItemContainerAndIndex({
        featureId,
        itemId,
        options: {
          currentIndex: options?.currentIndex,
          containerId: options?.containerId,
        },
      }),
    );
  };
}

export function useSetItemVisibility(featureIdDefault?: string): any {
  const featureId: string = featureIdDefault || useFeatureId();
  const dispatch = useDispatch();
  return (id, visibility) => {
    dispatch(setItemVisibility({ featureId, id, visibility }));
  };
}

export function useViewTypeOfDeal(featureId) {
  return (
    useSelector((state: RootStateOrAny) => {
      return state?.featureStore[featureId];
    }) || []
  );
}

export function useSetViewTypeOfDeal() {
  const dispatch = useDispatch();

  return (payload) => {
    dispatch(setViewTypeOfDeal(payload));
  };
}

export function useTransactionsOfDeal(featureId) {
  return (
    useSelector((state: RootStateOrAny) => {
      return state?.featureStore[featureId]?.data;
    }) || []
  );
}

export function useSetTransactionsOfDeal() {
  const dispatch = useDispatch();

  return (payload) => {
    dispatch(setTransactionsOfDeal(payload));
  };
}

export function useItemVisibility(): boolean {
  const item: any = useItem();
  return item?.visibility;
}

export function useItemDocument(): any {
  const item: any = useItem();
  return item?.data;
}

export function useIsNewItemDocument(): boolean {
  const itemDocument: any = useItemDocument();
  return !itemDocument?.id || itemDocument?.id === NEW_ITEM_DOCUMENT_ID;
}

export function useItem(): { visibility; itemDocument } | any | undefined {
  const featureId: string = useFeatureId();
  const item = useSelector((state: RootStateOrAny) => {
    const items = state?.featureStore[featureId]?.items;
    const currentId = items?.currentId;
    return currentId ? items[currentId] : undefined;
  }, isEqual);
  return item;
}
export function useCurrentItemId():
  | { visibility; itemDocument }
  | any
  | undefined {
  const featureId: string = useFeatureId();
  const currentId = useSelector((state: RootStateOrAny) => {
    const items = state?.featureStore[featureId]?.items;
    return items?.currentId;
  }, isEqual);
  return currentId;
}
export function useSelectedOptionItemId():
  | { visibility; itemDocument }
  | any
  | undefined {
  const item: any = useItem();
  const options = item?.options;
  return options?.currentItemId;
}

export function useOnCloseItem(): any {
  const setItem = useSetItem();
  const item = useItemDocument();
  return () => {
    item && setItem(item || {}, false);
  };
}

export function useItemOptions(): any {
  const item: any = useItem();
  return item?.options;
}
