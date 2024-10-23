import React, { ReactNode } from 'react';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { HFeatureProvider } from './providers/h-feature-provider';

interface HFeatureProps {
  children?: ReactNode,
  searchForm?: FormInstance<any>,
  detailForm?: FormInstance<any>,
  documentIdName?: string,
  documentId?: string,
  documentRelations?: any[],
  submitSearchFormFirstTime?: boolean,
  useQueryParams?: boolean,
  documentDetailNamespaceViaId?: boolean,
  featureId: string,
  nodeName?: string | Function,
  endpoint?: string | Function,
  limitNamespace?: string,
  skipNamespace?: string,
  pageNamespace?: string,
}

const HFeature = (props: HFeatureProps) => {
  const { documentRelations, searchForm, documentId, detailForm, featureId, nodeName, endpoint, children, documentIdName = 'documentId', useQueryParams, submitSearchFormFirstTime, documentDetailNamespaceViaId, limitNamespace = 'limit', skipNamespace = 'skip', pageNamespace = 'page' } = props;

  return (
    <HFeatureProvider {...{ documentId, documentRelations, searchForm, detailForm, featureId, submitSearchFormFirstTime, nodeName, endpoint, documentIdName, useQueryParams, documentDetailNamespaceViaId, skipNamespace, limitNamespace, pageNamespace }}>
      {children}
    </HFeatureProvider>
  );
};


export default HFeature;
