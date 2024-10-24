import { handleActions } from 'redux-actions';
import { setSystemEnv } from './actions';


const initialState = {
  environments: {
    public: {},
    private: {},
  },
};

const SystemReducer = handleActions(
  {
    [setSystemEnv](state, { payload }) {
      const { environments = {} } = payload;
      return {
        ...state,
        environments: { ...environments },
      };
    },
  },
  initialState);

export default SystemReducer;
