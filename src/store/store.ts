import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootStateOrAny } from 'react-redux';
import rootReducer from './reducer';
import rootSaga from '../sagas/saga';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {

    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const makeStore = (_context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store: RootStateOrAny = createStore(combineReducers(rootReducer), bindMiddleware([sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
