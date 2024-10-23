import {
  FundCertificateReducer,
  fundStoreName,
} from '@components/features/client/fund-certificate/store';
import LoanCalcObjReducer from '@components/shared/client/loan-calculator/reducers';
import StringeeReducers from '@components/shared/stringee/reducers';
import { HYDRATE } from 'next-redux-wrapper';
import { handleActions } from 'redux-actions';
import DialReducer from '../components/features/business/dial/reducers';
import FirebaseReducers from '../components/shared/firebase/reducers';
import DynamicConfigurationReducer from '../dynamic-configuration/reducers';
import LayoutReducer from '../layouts/reducers';
import { HFeatureReducers } from '../schema-form/features';
import SystemReducer from '../system/reducers';
import CommonReducers from './common-reducers';

const reducer = handleActions(
  {
    [HYDRATE](state, { payload }) {
      return { ...state, ...payload };
    },
  },
  {},
);

export default {
  ...reducer,
  common: CommonReducers,
  featureStore: HFeatureReducers,
  stringee: StringeeReducers,
  firebase: FirebaseReducers,
  layouts: LayoutReducer,
  system: SystemReducer,
  dial: DialReducer,
  loanCalcObj: LoanCalcObjReducer,
  [fundStoreName]: FundCertificateReducer,
  ...DynamicConfigurationReducer,
};
