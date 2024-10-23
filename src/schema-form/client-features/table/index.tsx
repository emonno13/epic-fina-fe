import { Table, TableProps } from 'antd';
import { useCallback } from 'react';
import { useClientFeature, useSubmitByPage } from '../hooks/client-feature-hook';

const ClientFeatureTable = (props: TableProps<any>) => {
  const { pagination: paginationProp, rowKey } = props;
  const { dataSource, pagination } = useClientFeature();
  const { page, size, total } = pagination;

  const submitByPage = useSubmitByPage();

  const onTableChange = useCallback((currentPagination) => {
    const { current, pageSize } = currentPagination;
    submitByPage(current, pageSize);
  }, [submitByPage]);

  return (
    <Table {...{
      ...props,
      dataSource,
      pagination: typeof paginationProp !== 'boolean' ?  {
        showSizeChanger: false,
        ...paginationProp,
        total,
        pageSize: size,
        current: page,
      } : paginationProp,
      onChange: onTableChange,
      rowKey: rowKey || 'id',
    }} />
  );
};

export default ClientFeatureTable;
