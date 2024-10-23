import dynamic from 'next/dynamic';

export * as FeatureActions from './actions';
export { HFeatureReducers } from './reducers';

const  HFeature = dynamic(
  () => import('./feature'),
  { ssr: true },
);

const  HTable = dynamic(
  () => import('./data-list/h-table-form'),
  { ssr: true },
);

const  HList = dynamic(
  () => import('./data-list/h-list'),
  { ssr: true },
);

export { HFeature, HTable, HList };
