import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { httpRequester } from '@lib/networks/http';
import {
  FormUtils,
  getFilterWithRelations,
} from '@schema-form/utils/form-utils';
import Form from 'antd/lib/form';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import React, { ReactNode, useEffect, useRef } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'underscore';
import {
  setDocumentDetail,
  setDocumentDetailVisibility,
  setPagination,
} from '../actions';
import { HFeatureContext } from '../contexts/h-feature-context';
import { TableUtils } from '../data-list/editable-table/utils';
import { NEW_DOCUMENT_ID } from '../forms/h-feature-form';

export interface FeatureProviderProps {
  children?: ReactNode;
  useQueryParams?: boolean;
  searchForm?: FormInstance<any>;
  detailForm?: FormInstance<any>;
  itemDocumentForm?: FormInstance<any>;
  featureId?: string;
  documentIdName?: string;
  documentRelations?: any[];
  documentDetailNamespaceViaId?: boolean;
  submitSearchFormFirstTime?: boolean;
  nodeName?: string | Function;
  documentId?: string;
  endpoint?: string | Function;
  limitNamespace?: string;
  skipNamespace?: string;
  pageNamespace?: string;
}

export const HFeatureProvider = (props: FeatureProviderProps) => {
  const {
    children,
    featureId,
    nodeName,
    endpoint,
    documentId,
    itemDocumentForm = Form.useForm()[0],
    documentDetailNamespaceViaId = false,
    submitSearchFormFirstTime = true,
    documentIdName = 'documentId',
    useQueryParams = true,
    searchForm = Form.useForm()[0],
    detailForm = Form.useForm()[0],
    documentRelations = [],
    limitNamespace = 'limit',
    skipNamespace = 'skip',
    pageNamespace = 'page',
  } = props;

  const [currentSearchForm, setCurrentSearchForm] =
    React.useState<FormInstance>(searchForm);
  const [currentItemDocumentForm, setCurrentItemDocumentForm] =
    React.useState<FormInstance>(itemDocumentForm);
  const createButtonRef = useRef<any>(null);
  const submitDocumentButtonRef = useRef<any>(null);
  const submitAndContinueDocumentButtonRef = useRef<any>(null);
  const dispatch = useDispatch();
  const currentDocumentId = documentId || RouteUtils.getRouteId(documentIdName);
  const [currentDetailForm, setCurrentDetailForm] =
    React.useState<FormInstance>(detailForm);
  const featureData = useSelector((state: RootStateOrAny) => {
    return (state?.featureStore[featureId || ''] || {}).documentDetail;
  }, isEqual);
  const apiEndpoint: string = FormUtils.getNodeEndpoint({
    featureId,
    nodeName,
    endpoint,
    silentWhenException: true,
  });
  useEffect(() => {
    const pagination = TableUtils.getInitPagination({
      useQueryParams,
      limitNamespace,
      skipNamespace,
      pageNamespace,
    });
    dispatch(setPagination({ featureId, pagination }));
    setTimeout(() => {
      submitSearchFormFirstTime && searchForm.submit();
    }, 10);
  }, []);
  useEffect(() => {
    autoLoadDocument();
  }, [currentDocumentId]);
  const autoLoadDocument = async () => {
    if (!currentDocumentId) {
      if (!featureData?.documentDetailVisibility) {
        dispatch(
          setDocumentDetailVisibility({
            featureId,
            documentDetailVisibility: false,
          }),
        );
      }
      return;
    }
    const isNewDocument = currentDocumentId === NEW_DOCUMENT_ID;
    if (isNewDocument) {
      dispatch(
        setDocumentDetailVisibility({
          featureId,
          documentDetailVisibility: true,
        }),
      );
    } else if (!featureData?.documentDetail?.id) {
      const detailEndpoint = `${apiEndpoint}/${currentDocumentId}`;
      const loadedDocument = await httpRequester.getDataFromApi({
        url: detailEndpoint,
        params: {
          filter: {
            include: getFilterWithRelations(documentRelations),
          },
        },
      });
      const namespace = documentDetailNamespaceViaId
        ? loadedDocument.id
        : 'documentDetail';
      dispatch(
        setDocumentDetail({
          featureId,
          documentDetail: loadedDocument,
          namespace,
          documentDetailVisibility: true,
        }),
      );
    }
  };
  return (
    <HFeatureContext.Provider
      value={{
        searchForm: currentSearchForm,
        detailForm: currentDetailForm,
        setSearchForm: setCurrentSearchForm,
        setDetailForm: setCurrentDetailForm,
        itemDocumentForm: currentItemDocumentForm,
        setItemDocumentForm: setCurrentItemDocumentForm,
        apiEndpoint,
        nodeName,
        endpoint,
        documentDetailNamespaceViaId,
        submitSearchFormFirstTime,
        featureId,
        documentId: currentDocumentId,
        documentIdName,
        useQueryParams,
        createButtonRef,
        submitDocumentButtonRef,
        submitAndContinueDocumentButtonRef,
        limitNamespace,
        skipNamespace,
        pageNamespace,
      }}
    >
      {children}
    </HFeatureContext.Provider>
  );
};
