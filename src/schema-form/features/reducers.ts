import { handleActions } from 'redux-actions';
import {
  addItem, removeItem,
  setDataSource,
  setDocumentDetail,
  setDocumentDetailVisibility,
  setDocumentFragments, setDocumentParams, setFeatureData,
  setFeatureSearchingStatus, setItems, setItemVisibility, setLoadingCreateOrUpdate, setLoadingSearch, setNamespaceFeature, setPagination,
  setTransactionsOfDeal,
  setViewTypeOfDeal,
  storeSearchResultOfFeature, updateItemContainerAndIndex,
} from './actions';
import { NEW_ITEM_DOCUMENT_ID } from './forms/h-item-form';

const initialState = {
  ['view-type-of-deal']: 'LIST',
};

const invisibleItems = (visibility, items) => {
  if (visibility) {
    const oldIds = Object.keys(items);
    oldIds.map((id: any) => {
      if (typeof items[id] !== 'object') {
        return;
      }
      items[id].visibility = false;
    });
  }
};

const updateObject = (oldDataSource, newDataSource, paths) => {
  while (paths.length > 1) {
    oldDataSource = oldDataSource[paths.shift()];
  }

  oldDataSource[paths.shift()] = newDataSource;
};

/**
 * transform: dataSource.name1.name2 = newDataSource
 * @param oldDataSource
 * @param newDataSource
 * @param dataSourcePaths
 */
const getDataSource = (oldDataSource = [], newDataSource, dataSourcePaths = 'dataSource', isAppendData = false) => {
  const paths = dataSourcePaths.split('.');
  if (paths.length === 1) {
    return {
      dataSource: isAppendData ? [...oldDataSource, ...newDataSource] : newDataSource,
    };
  }

  updateObject(oldDataSource, newDataSource, paths);

  return {
    dataSource: [...oldDataSource],
  };
};

const HFeatureReducers = handleActions(
  {
    [storeSearchResultOfFeature](state, { payload }) {
      const { featureId, dataSource, total, dataSourcePaths, metadata } = payload;
      const oldFeatureData = state[featureId] || {};
      const pagination = oldFeatureData.pagination || {};
      const document = oldFeatureData?.documentDetail || {};
      const isAppendData = pagination.isAppendData;
      let newFeatureState = {
        ...oldFeatureData,
        ...getDataSource(oldFeatureData.dataSource, dataSource, dataSourcePaths, isAppendData),
        loading: false,
        metadata,
        pagination: { ...pagination, total },
      };
      if (document.id) {
        const newDocumentDetail = (dataSource as any[])?.find(element => element.id === document.id);
        if (newDocumentDetail) {
          newFeatureState = {
            ...newFeatureState,
            documentDetail: { ...document, ...newDocumentDetail },
          };
        }
      }
      return {
        ...state,
        [featureId]: { ...newFeatureState },
      };
    },
    [setFeatureSearchingStatus](state, { payload }) {
      const { featureId, loading } = payload;
      const oldFeatureData = state[featureId];
      return {
        ...state,
        [featureId]: {
          ...oldFeatureData,
          loading,
        },
      };
    },
    [setLoadingSearch](state, { payload }) {
      const { featureId, loadingSearchStatus } = payload;
      const oldFeatureData = state[featureId];

      return {
        ...state,
        [featureId]: {
          ...oldFeatureData,
          loadingSearchStatus,
        },
      };
    },
    [setLoadingCreateOrUpdate](state, { payload }) {
      const { featureId, loadingCreateOrUpdateStatus } = payload;
      const oldFeatureData = state[featureId];

      return {
        ...state,
        [featureId]: {
          ...oldFeatureData,
          loadingCreateOrUpdateStatus,
        },
      };
    },
    [setFeatureData](state, { payload }) {
      const { featureId, namespace, data } = payload;
      const oldFeatureData = state[featureId];
      return {
        ...state,
        [featureId]: {
          ...oldFeatureData,
          [namespace]: data,
        },
      };
    },
    [setDocumentDetailVisibility](state, { payload }) {
      const { featureId, documentDetailVisibility } = payload;
      const oldFeatureData = state[featureId];
      return {
        ...state,
        [featureId]: {
          ...oldFeatureData,
          documentDetailVisibility,
        },
      };
    },
    [setPagination](state, { payload }) {
      const { featureId, pagination } = payload;
      const oldFeatureData = state[featureId] || {};
      const oldPagination = oldFeatureData.pagination || {};
      return {
        ...state,
        [featureId]: {
          ...oldFeatureData,
          pagination: {
            ...oldPagination,
            ...pagination,
          },
        },
      };
    },
    [setDocumentDetail](state, { payload }) {
      const { featureId, documentDetail, optionParams, namespace = 'documentDetail', documentDetailVisibility } = payload;
      const oldFeatureData = state[featureId];
      return {
        ...state,
        [featureId]: {
          ...oldFeatureData,
          documentDetailVisibility,
          [namespace]: documentDetail,
          [`optionParamsOfDocument:${documentDetail?.id}`]: optionParams,
        },
      };
    },
    [setDocumentParams](state, { payload }) {
      const { featureId, documentId, optionParams } = payload;
      const oldFeatureData = state[featureId];
      return {
        ...state,
        [featureId]: {
          ...oldFeatureData,
          [`optionParamsOfDocument:${documentId}`]: optionParams,
        },
      };
    },
    [setDocumentFragments](state, { payload }) {
      const { featureId, documentFragments, namespace = 'documentDetail' } = payload;
      const oldFeatureData: any = state[featureId] || {};
      const document = oldFeatureData[namespace] || {};
      return {
        ...state,
        [featureId]: {
          ...oldFeatureData,
          [namespace]: {
            ...document,
            ...documentFragments,
          },
        },
      };
    },
    [setNamespaceFeature](state, { payload }) {
      const { featureId, documentFragments, namespace = 'documentDetail' } = payload;
      const oldFeatureData: any = state[featureId] || {};
      const document = oldFeatureData[namespace] || {};
      oldFeatureData[namespace] = {
        ...document,
        ...documentFragments,
      };
      return {
        ...state,
        [featureId]: oldFeatureData,
      };
    },
    [setDataSource](state, { payload }) {
      const { featureId, dataSource, namespace = 'dataSource' } = payload;
      const oldFeatureData: any = state[featureId] || {};

      return {
        ...state,
        [featureId]: {
          ...oldFeatureData,
          [namespace]: dataSource,
        },
      };
    },
    [setItems](state, { payload }) {
      const { featureId, items } = payload;
      const oldFeatureData: any = state[featureId] || {};
      return {
        ...state,
        [featureId]: {
          ...oldFeatureData,
          items: items.map(item => ({ [item.id || item._iid]: { data: item, visibility: false } })),
        },
      };
    },
    [addItem](state, { payload }) {
      const { featureId, item, visibility, options = {} } = payload;
      const isSetVisibility = visibility !== undefined;
      const oldFeatureData: any = state[featureId] || {};
      const oldItems: any = oldFeatureData.items || {};

      isSetVisibility && invisibleItems(visibility, oldItems);
      const id = item.id || item._iid;
      if (id === NEW_ITEM_DOCUMENT_ID) {
        delete item.id;
      }
      const oldItem = oldItems[id] || {};
      return {
        ...state,
        [featureId]: {
          ...oldFeatureData,
          items: {
            ...oldItems,
            currentId: visibility ? (id || NEW_ITEM_DOCUMENT_ID) : oldItems.currentId,
            [id || NEW_ITEM_DOCUMENT_ID]: { data: item, visibility: isSetVisibility ? visibility : oldItem.visibility, options },
          },
        },
      };
    },
    [removeItem](state, { payload }) {
      const { featureId, itemId, options = {} } = payload;
      const oldFeatureData: any = state[featureId] || {};
      const oldItems: any = oldFeatureData.items || {};
      console.log('itemIditemIditemId', itemId, oldItems);
      delete oldItems[itemId];
      console.log('itemIditemIditemId', itemId, oldItems);
      if (itemId === oldItems.currentId) {
        delete oldItems.currentId;
      }
      return {
        ...state,
        [featureId]: {
          ...oldFeatureData,
          items: {
            ...oldItems,
          },
        },
      };
    },
    [updateItemContainerAndIndex](state, { payload }) {
      const { featureId, itemId, options = {} } = payload;
      const oldFeatureData: any = state[featureId] || {};
      const oldItems: any = oldFeatureData.items || {};
      const currentDataItem = oldItems[itemId] || {};
      const oldOptions = currentDataItem?.options || {};
      return {
        ...state,
        [featureId]: {
          ...oldFeatureData,
          items: {
            ...oldItems,
            [itemId]: {
              ...currentDataItem,
              options: {
                ...oldOptions,
                currentIndex: options?.currentIndex,
                containerId: options?.containerId,
              } },
          },
        },
      };
    },
    [setItemVisibility](state, { payload }) {
      const { featureId, id, _iid, visibility } = payload;
      const oldFeatureData: any = state[featureId] || {};
      const oldItems: any = oldFeatureData.items || {};
      const oldItem = oldItems[id] || {};
      invisibleItems(visibility, oldItems);

      return {
        ...state,
        [featureId]: {
          ...oldFeatureData,
          items: {
            ...oldItems,
            currentId: visibility ? (id || _iid) : oldItems.currentId,
            [id || _iid]: { ...oldItem, visibility },
          },
        },
      };
    },
    [setTransactionsOfDeal](state, { payload }) {
      const { featureId } = payload;
      return {
        ...state,
        [featureId]: { ...payload },
      };
    },
    [setViewTypeOfDeal](state, { payload }) {
      const { featureId } = payload;
      return {
        ...state,
        [featureId]: payload?.type,
      };
    },
  },
  initialState);

export { HFeatureReducers };
