import { handleActions } from 'redux-actions';

import { setPositionConfig, setRolesConfig } from './actions';

const initialState = {};

const DynamicConfigurationReducer = {
  position: handleActions(
    {
      [setPositionConfig](state, { payload }) {
        return {
          ...state,
          ...payload,
        };
      },
    },
    initialState,
  ),
  roles: handleActions(
    {
      [setRolesConfig](state, { payload }) {
        return {
          ...state,
          ...payload,
        };
      },
    },
    initialState,
  ),
};

export default DynamicConfigurationReducer;
