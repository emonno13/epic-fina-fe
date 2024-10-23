import { connectAgentCallStatus } from '@components/shared/stringee/actions';
import {
  SET_DATASOURCE_EVENT,
  SET_DOCUMENT_DETAIL_EVENT,
  SET_PAGINATION_EVENT,
  SetDatasourceEventArgType,
  SetDocumentDetailDetailEventArgType,
  SetPaginationEventArgType,
} from '@types/socket';
import { eventChannel } from 'redux-saga';
import {
  call,
  delay,
  put,
  select,
  spawn,
  take,
  takeLatest,
} from 'redux-saga/effects';
import { Socket } from 'socket.io-client';
import {
  connectMeliSocket,
  disconnectMeliSocket,
  SET_MELI_SOCKET,
} from 'store/actions';
import {
  createWebSocketConnection,
  getFeatureActionType,
  getWsDataByEvent,
} from './helpers';

let connectOneMelisSocket = false;
function createSocketChannel(socket: Socket) {
  return eventChannel((emit) => {
    socket.on(SET_DATASOURCE_EVENT, (payload: SetDatasourceEventArgType) => {
      emit(getWsDataByEvent(SET_DATASOURCE_EVENT, payload));
    });

    socket.on(
      SET_DOCUMENT_DETAIL_EVENT,
      (payload: SetDocumentDetailDetailEventArgType) => {
        emit(getWsDataByEvent(SET_DOCUMENT_DETAIL_EVENT, payload));
      },
    );

    socket.on(SET_PAGINATION_EVENT, (payload: SetPaginationEventArgType) => {
      emit(getWsDataByEvent(SET_PAGINATION_EVENT, payload));
    });

    return () => {
      console.log('Socket off');
    };
  });
}

function* handleWsData(data: { type: string; payload: any }) {
  const { type, payload } = data;
  const actionType = yield call(getFeatureActionType, type);
  if (actionType) {
    yield put({
      type: actionType,
      payload,
    });
  }
}

export function* meliSocketEventChannelSagas(socket: Socket) {
  const channel = yield call(createSocketChannel, socket);
  while (true) {
    const wsData = yield take(channel);
    yield call(handleWsData, wsData);
  }
}

export function* socketSaga({ payload: { currentUser } }) {
  try {
    if (!connectOneMelisSocket) {
      yield delay(8000);
    }
    connectOneMelisSocket = true;
    const meliSocket = yield call(createWebSocketConnection);
    yield put({
      type: SET_MELI_SOCKET,
      socket: meliSocket,
    });
    yield put(connectAgentCallStatus({ currentUser }));
    yield spawn(meliSocketEventChannelSagas, meliSocket);
  } catch (e) {
    connectOneMelisSocket = false;
    console.log('socketSaga: ', e);
  }
}

export function* disconnectMeliSocketSage() {
  const state = yield select();
  const socket: Socket = state.common?.socket;
  try {
    if (socket) {
      socket.disconnect();
      yield put({
        type: SET_MELI_SOCKET,
        socket: null,
      });
      connectOneMelisSocket = false;
    }
  } catch (e) {
    console.log('socketSaga: ', e);
  }
}

export const connectSocket = function* sagas() {
  yield takeLatest(connectMeliSocket, socketSaga);
  yield takeLatest(disconnectMeliSocket, disconnectMeliSocketSage);
};
