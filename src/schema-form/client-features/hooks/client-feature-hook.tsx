import { useContext } from 'react';
import { ClientFeatureContext } from '../contexts/client-feature-context';

export const useClientFeature = () => {
  const context = useContext(ClientFeatureContext);
  if (context === undefined) {
    throw new Error('useClientFeature must be used within an ClientFeatureContextProvider');
  }
  return context;
};

export const useClientDataSource = () => {
  const feature = useClientFeature();
  return feature.dataSource || [];
};

export const useClientPagination = () => {
  const feature = useClientFeature();
  return feature.pagination || {
    total: 0,
    page: 1,
    size: 10,
  };
};

export const useClientSearchForm = () => {
  const feature = useClientFeature();
  return feature.searchForm;
};

export const useSubmitLoadMore = () => {
  const { searchForm, setIsLoadMore } = useClientFeature();

  return () => {
    setIsLoadMore(true);
    searchForm?.submit();
  };
};

export const useSubmitResetPagination = () => {
  const { searchForm, pagination, setPagination } = useClientFeature();

  return () => {
    setPagination({
      ...pagination,
      page: 1,
    });
    searchForm?.submit();
  };
};

export const useViewMoreCondition = () => {
  const { dataSource , pagination } = useClientFeature();
  return dataSource.length < pagination.total;
};

export const useNumberOfRemainingData = () => {
  const { dataSource , pagination } = useClientFeature();
  return pagination.total - dataSource.length;
};

export const useSubmitByPage = () => {
  const { pagination, searchForm, setPagination } = useClientFeature();

  return (page: number, pageSize?: number) => {
    const newPagination = {
      ...pagination,
      page,
    };
    if (pageSize) {
      newPagination.size = pageSize;
    }
    setPagination(newPagination);
    searchForm?.submit();
  };
};

export const useTotalPage = () => {
  const { pagination } = useClientFeature();
  const { size, total } = pagination;

  return Math.ceil(total / size);
};

export const useSubmitNextPage = () => {
  const { pagination } = useClientFeature();
  const { page } = pagination;
  const submitByPage = useSubmitByPage();
  const totalPage = useTotalPage();
  const incrementPage = page + 1;

  return () => {
    if (incrementPage > totalPage) {
      return;
    }
    submitByPage(incrementPage);
  };
};

export const useSubmitPrevPage = () => {
  const { pagination } = useClientFeature();
  const { page } = pagination;
  const submitByPage = useSubmitByPage();
  const decrementPage = page - 1;

  return () => {
    if (decrementPage < 1) {
      return;
    }
    submitByPage(decrementPage);
  };
};

export const useClientDocumentDetail = () => {
  const feature = useClientFeature();
  return feature.documentDetail || {};
};

export const useClientTransport = () => {
  const { transport } = useClientFeature();
  return transport || {};
};

export const useSetClientDataSource = () => {
  const { setDataSource } = useClientFeature();
  return setDataSource;
};

export const useClientDocumentDetailVisible = () => {
  const feature = useClientFeature();
  return feature.documentDetailVisible;
};

export const useCancelClientDocumentDetail = () => {
  const { setDocumentDetailVisible, setDocumentDetail } = useClientFeature();
  return () => {
    setDocumentDetailVisible(false);
    setDocumentDetail({});
  };
};

export const useOpenClientDocumentDetail = () => {
  const { setDocumentDetailVisible, setDocumentDetail } = useClientFeature();
  return (newDocumentDetail: Record<string, any>) => {
    setDocumentDetailVisible(true);
    setDocumentDetail(newDocumentDetail);
  };
};

export const useSetClientDocumentDetailVisible = () => {
  const { setDocumentDetailVisible } = useClientFeature();
  return setDocumentDetailVisible;
};
