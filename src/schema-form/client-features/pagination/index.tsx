import { Pagination, PaginationProps } from 'antd';
import { useClientPagination, useSubmitByPage } from '../hooks/client-feature-hook';

export type ClientFeaturePaginationProps = Omit<PaginationProps, 'current' | 'pageSize' | 'total'>;

const ClientFeaturePagination = (props: ClientFeaturePaginationProps) => {
  const { page, size, total } = useClientPagination();
  const submitByPage = useSubmitByPage();

  return (
    <Pagination {...{
      ...props,
      current: page,
      pageSize: size,
      total,
      onChange: submitByPage,
    }} />
  );
};

export default ClientFeaturePagination;
