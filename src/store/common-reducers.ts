import { handleActions } from 'redux-actions';
import {
  setHasFeatureDetailStatus,
  setScrollBarValues,
  setModels,
  setPermission,
  setGlobalMessages,
  setMeliSocket,
} from './actions';

const initialState = {
  hasDetailFeaturePopupOrDrawer: false,
  scrollBars: {
    mainScreen: {},
  },
  models:[],
  permissions: [],
  globalMessages: {
    error: false,
    errorMessage: '',
    successMessage: '',
  },
  socket: null,
};

const reducer = handleActions(
  {
    [setHasFeatureDetailStatus](state, { payload }) {
      return {
        ...state,
        hasDetailFeaturePopupOrDrawer: payload.status,
      };
    },
    [setScrollBarValues](state, { payload }) {
      const scrollBars = state.scrollBars || {};
      const { id, values } = payload;
      return {
        ...state,
        scrollBars: {
          ...scrollBars,
          [id]: values,
        },
      };
    },
    [setModels](state, { payload }) {
      const { models } = payload;
      return {
        ...state,
        models: models,
      };
    },
    [setPermission](state, { payload }) {
      const { permissions } = payload;
      return {
        ...state,
        permissions: permissions,
      };
    },
    [setGlobalMessages](state, { payload }) {
      const { error, errorMessage, successMessage } = payload;
      return {
        ...state,
        globalMessages: {
          error,
          errorMessage,
          successMessage,
        },
      };
    },
    [setMeliSocket](state, { socket }) {
      return {
        ...state,
        socket,
      };
    },
  },
  initialState);

export default reducer;
