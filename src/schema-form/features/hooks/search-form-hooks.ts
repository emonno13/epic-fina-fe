import { FormInstance } from 'antd/lib/form';
import React from 'react';
import { useFeature } from './feature-hooks';
import { HFeatureContext } from '../contexts/h-feature-context';

export function useSearchForm(): FormInstance<any> | undefined {
  const context = useFeature();
  return context.searchForm;
}

export function useReloadSearchResult(): Function {
  const searchForm = useSearchForm();
  return () => {
    searchForm?.submit();
  };
}

export function useSubmitSearchForm(): Function {
  const searchForm = useSearchForm();
  return () => {
    searchForm && searchForm.submit();
  };
}

export function useCreateButtonRef(): any {
  const context = React.useContext(HFeatureContext);
  return context?.createButtonRef;
}

export function useHandleClickOnCreateDocumentButton(): any {
  const createButtonRef = useCreateButtonRef();
  return createButtonRef && createButtonRef.current.click;
}
