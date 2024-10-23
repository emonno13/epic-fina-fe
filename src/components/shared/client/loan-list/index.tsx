import ClientFeatureProvider from '@schema-form/client-features/providers/client-feature-provider';
import ClientLoanListMain from './loan-list-main';

import './loan-list.module.scss';

const ClientLoanList = () => {
  return (
    <ClientFeatureProvider
      initialFetching={true}
      nodeName="product-details/public"
    >
      <div className="client-loan-list">
        <ClientLoanListMain />
      </div>
    </ClientFeatureProvider>
  );
};

export default ClientLoanList;
