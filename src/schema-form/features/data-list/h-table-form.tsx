import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { EditableRow } from './editable-table/editable-row';
import { EditableCell } from './editable-table/editable-cell';
import { ColumnUtils, TableUtils as EditTableUtils } from './editable-table/utils';
import { executeOnPageChanged } from './data-list-utils';
import { useFeature, useSubmitSearchForm } from '../hooks';
import { PAGE_SIZE_OPTIONS } from '../../../components/shared/common/configuration/constant';
import { RouteUtils } from '../../../components/shared/layout/router-contaner/utils';
import { useIsLoadingData, usePagination, useTableSourceData } from '../hooks';
import { useHTranslation } from '../../../lib/i18n';
import { useLimitNameSpace, usePageNamespace, useSkipNamespace } from '../hooks/feature-hooks';

export const getDataSourcePaths = (paths: any[]) => {
  return paths.join('.');
};

export interface HTableProps extends TableProps<any> {
  schema: Array<object> | Function,
  shortSchema?: Array<object> | Function,
  pagination?: any,
  featureId?: string,
  endpoint?: string,
  nodeName?: string,
  dataSourcePaths?: string,
  isFeatureReloading?: boolean,
  onRowDataChanged?: Function,
  onReload?: Function,
  onDocumentSelected?: Function | Promise<any>,
  useDefaultMessage?: boolean,
}

const TableComponents = {
  body: {
    row: EditableRow,
    cell: EditableCell,
  },
};
const i = 0;

export const View = (props: HTableProps) => {
  const {
    schema,
    summary,
    expandable,
    className,
    nodeName,
    dataSourcePaths,
    onRow,
    onRowDataChanged,
    isFeatureReloading = true,
    onReload,
    useDefaultMessage = false,
  } = props;
  const { t } = useHTranslation('admin-common');
  const { useQueryParams, ...featureContext } = useFeature();
  const featureId = props.featureId || featureContext.featureId;
  const endpoint = props.endpoint || featureContext.apiEndpoint;
  const handleSubmitSearchForm = useSubmitSearchForm();
  const dispatch = useDispatch();
  let dataSource = props.dataSource || useTableSourceData(props.featureId) || [];
  const pagination = usePagination(props.featureId);
  if (!isEmpty(props.dataSource) && pagination) {
    pagination.total = dataSource.length; // pagination for data source as props
  }
	
  const loading = useIsLoadingData(props.featureId);
  const limitNamespace = useLimitNameSpace();
  const skipNamespace = useSkipNamespace();
  const pageNamespace = usePageNamespace();

  dataSource = dataSource.filter(item => !isEmpty(item));

  const handleOnPageChanged = async (pagination, filters, sorter: any = { ...RouteUtils.getSorterFromUrl() }, extra) => executeOnPageChanged({
    pagination,
    sorter,
    useQueryParams,
    dispatch,
    featureId,
    handleSubmitSearchForm,
    limitNamespace,
    skipNamespace,
    pageNamespace,
  });

  return (
    <Table
      {...{
        pagination: {
          current: pagination?.page || 1,
          pageSize: props.pagination?.filter?.limit || pagination?.filter?.limit,
          size: 'small',
          position: props.pagination?.position || ['topRight', 'bottomRight'],
          total: pagination?.total || 0,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => (`${range[0]}-${range[1]} ${t('of', { vn: 'trên' })} ${total} ${t('items', { vn: 'bản ghi' })}`),
          pageSizeOptions: props.pagination?.pageSizeOptions || PAGE_SIZE_OPTIONS,
        },
        rowKey: (record: any) => record.id || record._iid,
        ...props,
        loading,
        dataSource,
        columns: ColumnUtils.reSchemaWithEditableColumns(Array.isArray(schema) ? [...schema] : schema(), {
          onRowDataChanged,
          featureId,
          endpoint,
          nodeName,
          onReload,
          useDefaultMessage,
          onSoftReload: (updatedRecord) => EditTableUtils.handleUpdateDataRowChanged({
            dataSource,
            updatedRecord,
            dataSourcePaths,
            dispatch,
            featureId,
            isFeatureReloading,
          }),
          onRow,
        }),
        rowClassName: () => 'editable-row',
        summary,
        components: props?.components || TableComponents,
        expandable,
        className: `${className} h-table-form`,
        onChange: handleOnPageChanged,
      }}
    />
  );
};

export default View;
