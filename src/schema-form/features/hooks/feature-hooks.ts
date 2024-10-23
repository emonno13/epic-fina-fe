import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'underscore';
import { setLoadingCreateOrUpdate, setLoadingSearch } from '../actions';
import { FeatureContextType, HFeatureContext } from '../contexts/h-feature-context';
const emptyFeature = {};

export function useFeature(): FeatureContextType {
  const context = React.useContext(HFeatureContext);
  if (context === undefined) {
    throw new Error('useFeature must be used within an HDndContext');
  }
  return context;
}

export function useFeatureId(): string {
  const context = useFeature();
  return context.featureId || '';
}
export function useDocumentIdName(): string {
  const context = useFeature();
  return context.documentIdName || '';
}

export function useApiEndpoint(): string | undefined {
  const context = useFeature();
  return context.apiEndpoint;
}

export function useFeatureData(featureIdDefault?: string): any {
  const featureIdByHook = useFeatureId();
  const featureId: string = featureIdDefault || featureIdByHook;
  const featureData = useSelector((state: RootStateOrAny) => {
    return state?.featureStore[featureId] || emptyFeature;
  }, isEqual);
  return featureData;
}

export function useSelectFeatureData(namespace): any {
  const featureData = useFeatureData();
  return featureData[namespace];
}

export function useLimitNameSpace(): string {
  const context = useFeature();
  return context.limitNamespace || '';
}

export function useSkipNamespace(): string {
  const context = useFeature();
  return context.skipNamespace || '';
}

export function usePageNamespace(): string {
  const context = useFeature();
  return context.pageNamespace || '';
}

export function useLoadingSearchStatus(): boolean {
  const featureId = useFeatureId();

  return useSelector((state: RootStateOrAny) => {
    return !!state?.['featureStore']?.[featureId]?.['loadingSearchStatus'];
  });
}

export function useSetLoadingSearchStatus() {
  const dispatch = useDispatch();
  const featureId = useFeatureId();
  
  return (status: boolean) => {
    if (!featureId) return;
    
    dispatch(setLoadingSearch({ featureId, loadingSearchStatus: status }));
  };
}

export function useLoadingCreateOrUpdateStatus(): boolean {
  const featureId = useFeatureId();
  return useSelector((state: RootStateOrAny) => {
    return !!state?.['featureStore']?.[featureId]?.['loadingCreateOrUpdateStatus'];
  });
}

export function useSetLoadingCreateOrUpdateStatus() {
  const featureId = useFeatureId();
  const dispatch = useDispatch();

  return (status: boolean) => {
    if (!featureId) return;

    dispatch(setLoadingCreateOrUpdate({ featureId, loadingCreateOrUpdateStatus: status }));
  };
}
