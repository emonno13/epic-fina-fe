import { useMeliSocket } from '@schema-form/ws/hooks';
import { Form } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import {
  ClientFeatureContext,
  ClientFeatureContextType,
  ClientFeaturePaginationType,
} from '../contexts/client-feature-context';

interface ClientFeatureProviderPropType
  extends Omit<
    ClientFeatureContextType,
    | 'dataSource'
    | 'pagination'
    | 'setDataSource'
    | 'setPagination'
    | 'setIsLoadMore'
    | 'documentDetail'
    | 'setDocumentDetail'
    | 'documentDetailVisible'
    | 'setDocumentDetailVisible'
    | 'isLoadMore'
  > {
  children: ReactNode;
  nodeName?: string;
  featureId?: string;
  pageSize?: number;
  initialDataSource?: any[];
  initialFetching?: boolean;
  initialTotal?: number;
  initDocumentDetail?: any;
}

const ClientFeatureProvider = (props: ClientFeatureProviderPropType) => {
  const {
    children,
    pageSize = 10,
    searchForm,
    nodeName,
    featureId,
    endpoint,
    initialDataSource = [],
    initialFetching = false,
    initialTotal = 0,
    initDocumentDetail,
    transport = {},
  } = props;
  const [dataSource, setDataSource] = useState<any[]>(initialDataSource);
  const [pagination, setPagination] = useState<ClientFeaturePaginationType>({
    total: initialTotal,
    page: 1,
    size: pageSize,
  });
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [documentDetail, setDocumentDetail] = useState<any>({});
  const [documentDetailVisible, setDocumentDetailVisible] =
    useState<boolean>(false);

  const formInstance = Form.useForm();
  const contextSearchForm = searchForm || formInstance[0];
  const socket = useMeliSocket();

  useEffect(() => {
    if (
      initialFetching &&
      contextSearchForm &&
      Object.keys(contextSearchForm).length > 0
    ) {
      contextSearchForm.submit();
    }
  }, [initialFetching, contextSearchForm]);

  useEffect(() => {
    if (!featureId || !socket) {
      return;
    }

    socket.off(`add-${featureId}`);
    socket.off(`update-${featureId}`);

    socket.on(`add-${featureId}`, (payload: any) => {
      if (pagination.total === 0 || (pagination.page > 1 && !isLoadMore)) {
        return;
      }

      if (
        dataSource.length === pageSize &&
        Number.isInteger(pagination.total / pageSize)
      ) {
        dataSource.pop();
      }
      const newDataSource = [payload, ...dataSource];
      setDataSource(newDataSource);
      setPagination({
        ...pagination,
        total: pagination.total + 1,
      });
    });

    socket.on(`update-${featureId}`, (payload: any) => {
      if (dataSource.length === 0) {
        return;
      }
      const toBeUpdatedItemIndex = dataSource.findIndex(
        (item) => item.id === payload.id,
      );
      if (toBeUpdatedItemIndex === -1) {
        return;
      }

      const newDataSource = [...dataSource];
      newDataSource[toBeUpdatedItemIndex] = payload;
      setDataSource(newDataSource);
    });
  }, [socket, featureId, dataSource, pagination]);

  useEffect(
    () => () => {
      if (featureId && socket) {
        socket.off(`add-${featureId}`);
        socket.off(`update-${featureId}`);
      }
    },
    [],
  );

  return (
    <ClientFeatureContext.Provider
      value={{
        dataSource,
        pagination,
        searchForm: contextSearchForm,
        nodeName,
        endpoint,
        isLoadMore,
        setIsLoadMore,
        setDataSource,
        setPagination,
        documentDetail: initDocumentDetail || documentDetail,
        setDocumentDetail,
        transport,
        documentDetailVisible,
        setDocumentDetailVisible,
      }}
    >
      {children}
    </ClientFeatureContext.Provider>
  );
};

export default ClientFeatureProvider;
