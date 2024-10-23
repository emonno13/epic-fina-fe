import { List } from 'antd';
import { ListProps } from 'antd/lib/list';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { useMemo } from 'react';
import { executeOnPageChanged } from './data-list-utils';
import { useFeature, useSubmitSearchForm } from '../hooks';
import { PAGE_SIZE_OPTIONS } from '../../../components/shared/common/configuration/constant';
import { useIsLoadingData, usePagination, useTableSourceData } from '../hooks';
import { HText } from '../../../components/shared/typography';

export interface HListProps extends ListProps<any> {
  pagination?: any,
  featureId?: string,
  endpoint?: string,
  nodeName?: string,
  title?: string,
  description?: string
}

const getHeader = (props: HListProps) => {
  if (props.header) {
    return props.header;
  }
  if (!props.title && !props.description) {
    return null;
  }
  return (
    <>
      {props.title && (<HText preset={'bold20'}>{props.title}</HText>)}
      {props.description && (<div className={'text-grey1'} >{props.description}</div>)}
    </>
  );
};

export const View = (props: HListProps) => {
  const { className, pagination = {} } = props;
  const { useQueryParams, ...featureContext } = useFeature();
  const handleSubmitSearchForm = useSubmitSearchForm();
  const dispatch = useDispatch();
  let dataSource = props.dataSource || useTableSourceData(props.featureId) || [];
  const storePagination = usePagination();
  const loading = useIsLoadingData();

  dataSource = dataSource.filter(item => !isEmpty(item));

  const handleOnPageChanged = async (page, pageSize) => {
    if (pagination?.onChange) {
      await pagination.onChange(page, pageSize);
    }
    await executeOnPageChanged({
      pagination: {
        current: page,
        pageSize,
      },
      sorter: {},
      useQueryParams: false,
      dispatch,
      featureId: props.featureId || featureContext.featureId,
      handleSubmitSearchForm,
    });
  };

  const listPagination = useMemo(() => {
    if (!pagination) return false;
    return {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => (`${range[0]}-${range[1]} of ${total} items`),
      position: pagination?.position || 'bottom',
      size: 'small',
      ...pagination,
      current: storePagination?.page || 1,
      pageSize: pagination?.filter?.limit || storePagination?.filter?.limit,
      total: storePagination?.total || 0,
      pageSizeOptions: pagination?.pageSizeOptions || PAGE_SIZE_OPTIONS,
      onChange: handleOnPageChanged,
    };
  }, [storePagination, pagination]);
  return (
    <List
      {...{
        ...props,
        header: getHeader(props),
        rowKey: (record: any) => record.id || record._iid,
        loading,
        dataSource,
        className,
        pagination: listPagination,
      }}
    />
  );
};

export default View;
