import { Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ReactNode } from 'react';
import { useClientDataSource, useSubmitLoadMore, useViewMoreCondition } from '../hooks/client-feature-hook';

interface ClientInfiniteScrollProps {
  children: ReactNode,
  parentId?: string,
}

const ClientInfiniteScrollWrapper = (props: ClientInfiniteScrollProps) => {
  const submitLoadMore = useSubmitLoadMore();
  const viewMoreCondition = useViewMoreCondition();
  const datasource = useClientDataSource();
  const { children, parentId } = props;
  return (
    <InfiniteScroll {...{
      next: submitLoadMore,
      hasMore: viewMoreCondition,
      dataLength: datasource.length,
      loader: (
        <div style={{ alignItems: 'center' }}>
          <Spin spinning />
        </div>
      ),
      className: 'apple-like-scrollbar',
      scrollableTarget: parentId,
    }}>
      {children}
    </InfiniteScroll>
  );
};

export default ClientInfiniteScrollWrapper;
