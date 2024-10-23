import { HFeature } from '@schema-form/features';
import ClientBondListMain from './bond-list-main';

import './bond-item-grid.module.scss';
import './bond-item-list.module.scss';
import './bond-list.module.scss';

const ClientBondList = () => {
  return (
    <HFeature
      {...{
        featureId: 'products',
        nodeName: 'products/public-bond',
        useQueryParams: false,
      }}
    >
      <div className="client-bond-list">
        <ClientBondListMain />
      </div>
    </HFeature>
  );
};

export default ClientBondList;
