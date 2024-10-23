import Router from 'next/router';
import { isUndefined } from 'lodash';
import { DEFAULT_PAGE_SIZE } from '../../../../components/shared/common/configuration/constant';
import { storeSearchResultOfFeature } from '../../actions';

export const TableUtils = {
  getInitPagination: ({ useQueryParams = false, limitNamespace = 'limit', skipNamespace = 'skip', pageNamespace = 'page' }): any => {
    const query = Router.query;
    if (!useQueryParams) {
      return {
        page: 1,
        filter: {
          limit: DEFAULT_PAGE_SIZE,
          skip: 0,
        },
      };
    }
    return {
      page: parseInt(`${query[pageNamespace] ?? '1'}`),
      filter: {
        limit: query[`filter[${limitNamespace}]`] || DEFAULT_PAGE_SIZE,
        skip: query[`filter[${skipNamespace}]`] || 0,
      },
    };
  },
  handleUpdateDataRowChanged: ({ dataSource, updatedRecord, dispatch, featureId, dataSourcePaths, isFeatureReloading = true }) => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => ( !isUndefined(item?.id) && updatedRecord?.id === item?.id ) || ( !isUndefined(item?.temporaryId) && updatedRecord?.temporaryId === item?.temporaryId));    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...updatedRecord,
    });
    isFeatureReloading && dispatch(storeSearchResultOfFeature({ featureId, dataSource: newData, dataSourcePaths }));
    return newData;
  },
};
export const ColumnUtils = {
  reSchemaWithEditableColumns: (columns, {
    onRowDataChanged,
    featureId,
    endpoint,
    nodeName,
    onReload,
    onSoftReload,
    onRow = (f=>{}),
    useDefaultMessage = false,
  }) => {
    const formProps = {
      nodeName,
      onReload,
      featureId,
      endpoint,
    };
    const resultColumns: any = [];
		 columns.map(col => {
		 	if (col.hidden === true) {
		 		return;
      }
      if (!col.itemSchema) {
        resultColumns.push(col);
        return;
      }
			 resultColumns.push({
        ...col,
        onCell: (record: any) => ({
          record,
          itemSchema: typeof col.itemSchema === 'function' ?  col?.itemSchema(record) : col?.itemSchema,
          dataIndex: col.dataIndex,
          onRowDataChanged,
          formProps,
          onSoftReload,
          onReload,
          useDefaultMessage,
        }),
        onRow: (record: any) => {
          const anotherOnRow: any = onRow(record);
          return {
            ...anotherOnRow,
            formProps,
          };
        },
      });
    });
    return resultColumns;
  },

};
