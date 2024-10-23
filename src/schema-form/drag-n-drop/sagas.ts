import {
  takeLatest,
} from 'redux-saga/effects';
import {
  updateItems,
} from './actions';
import { httpRequester } from '../../lib/networks/http';
import { FormUtils } from '../utils/form-utils';

const getId = (item, parentId) => {
  if (!parentId) {
    return item.id || item._iid || item.iid;
  }
  return `${parentId}:${item.id || item._iid || item.iid}`;
};

const doFlashDocument = (data: any[], namespace, parentId, result = {}) => {
  if (!data || !Array.isArray(data)) {
    return;
  }
  data.map(item => {
    const id = getId(item, parentId);
    if (item[namespace]) {
      result[id] = item[namespace];
      doFlashDocument(item[namespace], namespace, id, result);
    }
  });
  return result;
};

function* handleUpdateItems({ payload: { apiEndpoint, documentId, reorderedItems, items, fieldName = 'children', rollback, onSuccess = (response) => {} } }) {
  try {
    const url = FormUtils.getNodeEndpoint(Object.assign({ endpoint: apiEndpoint, documentId }));
    const response = yield httpRequester.putToApi({
      url,
      params: { [fieldName]: reorderedItems || items },
    });
    if (typeof response == 'object' && response?.error) {
      rollback();
    } else {
      onSuccess(response);
    }
  } catch (e) {
    console.log(e);
  }
}

//
// function* handleAddItem({payload: {document, featureId, namespace}}) {
// 	const draggableData = doFlashDocument(document[namespace], namespace, undefined, {});
// 	// yield put(moveOrReorder({featureId, draggableData}));
// }

export const DragAndDrop = function* sagas() {
  yield takeLatest(updateItems, handleUpdateItems);
  // yield takeLatest(addItem, handleAddItem);
  // yield takeLatest(deleteItem, handleMoveOrReorder);
  // yield takeLatest(updateItem, handleMoveOrReorder);
};
