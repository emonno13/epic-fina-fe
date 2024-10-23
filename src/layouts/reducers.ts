import { handleActions } from 'redux-actions';
import { setLayoutValue, setCurrentLayout, showLeftMenu } from './actions';

const initialState = {
  _default: {
    collapseLeftMenu: false,
  },
  currentLayout: '_default',
  isShowLeftMenu: false,
};

const LayoutReducer = handleActions(
  {
    [setLayoutValue](state, { payload }) {
      const { layout, key, value } = payload;
      const oldDataLayout = state[layout] || {};
      return {
        ...state,
        [layout]: { ...oldDataLayout, [key]: value },
      };
    },
    [setCurrentLayout](state, { payload }) {
      const { currentLayout } = payload;
      return {
        ...state,
        currentLayout,
      };
    },
    [showLeftMenu](state, { payload }) {
      const { isShowLeftMenu } = payload;
      return {
        ...state,
        isShowLeftMenu,
      };
    },
  },
  initialState);

export default LayoutReducer;
