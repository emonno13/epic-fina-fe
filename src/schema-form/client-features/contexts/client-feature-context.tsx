import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { createContext } from 'react';

export type ClientFeaturePaginationType = {
  total: number;
  page: number;
  size: number;
};

export type ClientFeatureContextType = {
  searchForm?: FormInstance<any>;
  nodeName?: string;
  endpoint?: string;
  dataSource: any[];
  pagination: ClientFeaturePaginationType;
  isLoadMore?: boolean;
  setDataSource: React.Dispatch<React.SetStateAction<any[]>>,
  setPagination: React.Dispatch<React.SetStateAction<ClientFeaturePaginationType>>,
  setIsLoadMore: React.Dispatch<React.SetStateAction<boolean>>,
  documentDetail?: any;
  setDocumentDetail: React.Dispatch<React.SetStateAction<any>>,
  transport?: {
    [key: string]: any;
  },
  documentDetailVisible: boolean;
  setDocumentDetailVisible: React.Dispatch<React.SetStateAction<boolean>>,
};

export const ClientFeatureContext = createContext<ClientFeatureContextType>({
  searchForm: undefined,
  nodeName: undefined,
  endpoint: undefined,
  dataSource: [],
  pagination: {
    total: 0,
    page: 0,
    size: 0,
  },
  isLoadMore: false,
  setDataSource: () => {},
  setPagination: () => {},
  setIsLoadMore: () => {},
  setDocumentDetail: () => {},
  documentDetail: {},
  documentDetailVisible: false,
  setDocumentDetailVisible: () => {},
});
